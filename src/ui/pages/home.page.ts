
import { BasePage } from "./Salesportal.BasePage.page";

export class Home extends BasePage {
    customerButton = this.page.locator("button#customers-from-home")
    async clickCustomer(){
await this.customerButton.click()
    };
}