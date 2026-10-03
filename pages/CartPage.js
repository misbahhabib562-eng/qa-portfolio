class CartPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.itemNames = page.locator('.cart_item .inventory_item_name');
    this.checkoutButton = page.locator('#checkout');
  }
}

module.exports = { CartPage };
