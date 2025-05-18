import { Page, Locator, expect } from "@playwright/test";

export abstract class BasePage {
  protected spinner: Locator;
  constructor(protected page: Page) {
    this.spinner = page.locator(".spinner-border");
  }
  async waitForSpinner(){
await expect(this.spinner).toHaveCount(0,{timeout:10000})
  }
}
