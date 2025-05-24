import { expect, Locator } from "@playwright/test";
import { Modal } from "./modal.page";

export class DeleteModal extends Modal {
  uniqueElement: Locator = this.page.locator(
    "div[modal] > div .modal-content"
  );
  private title: Locator = this.uniqueElement.locator(" .modal-title");
  private deleteButton: Locator = this.uniqueElement.getByRole("button", {
    name: "Yes, Delete",
  });
  private cancelButton: Locator = this.uniqueElement.getByRole("button", {
    name: "Cancel",
  });
  async deleteCustomer() {
    await this.deleteButton.click();
  }

  async closeModal() {
    await this.cancelButton.click();
  }
  async waitForOpenModal() {
    await expect(this.title).toContainText(" Delete Customer")
    await expect(this.title).toBeVisible();
  }

}
