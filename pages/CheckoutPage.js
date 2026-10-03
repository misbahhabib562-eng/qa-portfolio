class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.error = page.locator('[data-test="error"]');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillDetails({ firstName = '', lastName = '', postalCode = '' }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async itemTotalValue() {
    const text = await this.itemTotal.textContent(); // "Item total: $39.98"
    return Number(String(text).split('$')[1]);
  }
}

module.exports = { CheckoutPage };
