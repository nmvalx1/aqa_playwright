import { expect, Locator } from "@playwright/test";
import { BasePage } from "./Salesportal.BasePage.page";

export abstract class Modal extends BasePage {
abstract uniqueElement: Locator;
    async waitForCloseModal(){
    await expect(this.uniqueElement).not.toBeVisible();
  }   
};