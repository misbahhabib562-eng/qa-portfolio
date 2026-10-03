const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const users = require('../../test-data/users');

test.describe('Login', () => {
  /** @type {LoginPage} */ let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('valid user lands on the products page @smoke', async ({ page }) => {
    await login.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(new InventoryPage(page).title).toHaveText('Products');
  });

  test('locked-out user sees a clear error', async () => {
    await login.login(users.lockedOut.username, users.lockedOut.password);
    await expect(login.error).toContainText('Sorry, this user has been locked out.');
  });

  test('wrong password shows a generic error', async () => {
    await login.login(users.standard.username, 'wrong_password');
    await expect(login.error).toContainText('Username and password do not match');
  });

  const missing = [
    { case: 'empty username', user: '', pass: 'secret_sauce', message: 'Username is required' },
    { case: 'empty password', user: 'standard_user', pass: '', message: 'Password is required' },
  ];
  for (const m of missing) {
    test(`${m.case} is rejected`, async () => {
      await login.login(m.user, m.pass);
      await expect(login.error).toContainText(m.message);
    });
  }

  test('after logout, protected pages are blocked', async ({ page }) => {
    await login.login(users.standard.username, users.standard.password);
    await new InventoryPage(page).logout();
    await expect(login.loginButton).toBeVisible();

    await page.goto('/inventory.html');
    await expect(login.error).toContainText('when you are logged in');
  });
});
