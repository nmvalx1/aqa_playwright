
import { BasePage } from "./Salesportal.BasePage.page";

export class Home extends BasePage {
    customerButton = this.page.locator("button#customers-from-home")
    welcomeTitle = this.page.getByText('Welcome to Sales Management Portal');

    async clickCustomer(){
await this.customerButton.click()
    };
}