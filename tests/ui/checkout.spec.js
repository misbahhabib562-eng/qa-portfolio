const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const users = require('../../test-data/users');

const ITEMS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

test.describe('Checkout', () => {
  /** @type {InventoryPage} */ let inventory;
  /** @type {CheckoutPage} */ let checkout;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard.username, users.standard.password);
    inventory = new InventoryPage(page);
    checkout = new CheckoutPage(page);
  });

  test('end-to-end purchase with correct item total @smoke', async ({ page }) => {
    let expectedTotal = 0;
    for (const name of ITEMS) {
      expectedTotal += await inventory.priceOf(name);
      await inventory.addToCart(name);
    }

    await inventory.cartLink.click();
    const cart = new CartPage(page);
    await expect(cart.itemNames).toHaveText(ITEMS);
    await cart.checkoutButton.click();

    await checkout.fillDetails(users.customer);
    expect(await checkout.itemTotalValue()).toBeCloseTo(expectedTotal, 2);

    await checkout.finishButton.click();
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
    await expect(inventory.cartBadge).toBeHidden();
  });

  const validation = [
    { case: 'missing first name', data: { lastName: 'Customer', postalCode: '54000' }, message: 'First Name is required' },
    { case: 'missing last name', data: { firstName: 'Test', postalCode: '54000' }, message: 'Last Name is required' },
    { case: 'missing postal code', data: { firstName: 'Test', lastName: 'Customer' }, message: 'Postal Code is required' },
  ];
  for (const v of validation) {
    test(`checkout form blocks ${v.case}`, async ({ page }) => {
      await inventory.addToCart(ITEMS[0]);
      await inventory.cartLink.click();
      await new CartPage(page).checkoutButton.click();

      await checkout.fillDetails(v.data);
      await expect(checkout.error).toContainText(v.message);
      await expect(page).toHaveURL(/checkout-step-one/);
    });
  }
});
