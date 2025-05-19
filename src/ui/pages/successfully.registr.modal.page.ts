import { BasePage } from "./Salesportal.BasePage.page";

export class RegistredModal extends BasePage {
  createdNotification = this.page.getByText("Customer was successfully");
  closeModalButton = this.page.getByRole("button", { name: "Close" });

  async closeModal() {
    await this.closeModalButton.click();
  }
}
