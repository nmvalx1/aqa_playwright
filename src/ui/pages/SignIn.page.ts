// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import { BasePage } from "./Salesportal.BasePage.page";

export class SignIn extends BasePage {
  emailAdress = this.page.getByPlaceholder("Enter a valid email address");
  password = this.page.getByPlaceholder("Enter password");
  login = this.page.getByRole("button", { name: "Login" });
  checkBoxRemember = this.page.locator("#remembermecheckbox");

  async fillCreds(email: string, pass: string) {
    await this.emailAdress.fill(email);
    await this.password.fill(pass);
  }

  async clickLoginButton() {
    await this.login.click();
  }
};