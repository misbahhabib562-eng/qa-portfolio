const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const users = require('../../test-data/users');

test.describe('Products and cart', () => {
  /** @type {InventoryPage} */ let inventory;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard.username, users.standard.password);
    inventory = new InventoryPage(page);
  });

  test('shows the full product list @smoke', async () => {
    await expect(inventory.items).toHaveCount(6);
  });

  test('sorts by price, low to high', async () => {
    await inventory.sortBy('lohi');
    const prices = await inventory.prices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts by price, high to low', async () => {
    await inventory.sortBy('hilo');
    const prices = await inventory.prices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sorts by name, Z to A', async () => {
    await inventory.sortBy('za');
    const names = await inventory.itemNames.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('adding and removing items updates the cart badge @smoke', async () => {
    await inventory.addToCart('Sauce Labs Backpack');
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.addToCart('Sauce Labs Bike Light');
    await expect(inventory.cartBadge).toHaveText('2');

    await inventory.removeFromCart('Sauce Labs Backpack');
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.removeFromCart('Sauce Labs Bike Light');
    await expect(inventory.cartBadge).toBeHidden();
  });

  test('cart contents survive a page reload', async ({ page }) => {
    await inventory.addToCart('Sauce Labs Backpack');
    await page.reload();
    await expect(inventory.cartBadge).toHaveText('1');
  });
});
