class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.sortSelect = page.locator('.product_sort_container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  item(name) {
    return this.items.filter({ hasText: name });
  }

  async addToCart(name) {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(name) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  /** @param {'az'|'za'|'lohi'|'hilo'} option */
  async sortBy(option) {
    await this.sortSelect.selectOption(option);
  }

  async prices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => Number(t.replace('$', '')));
  }

  async priceOf(name) {
    const text = await this.item(name).locator('.inventory_item_price').textContent();
    return Number(String(text).replace('$', ''));
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
