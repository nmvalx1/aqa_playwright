import { BasePage } from "./Salesportal.BasePage.page";


export class Customers extends BasePage {
  addNewCustomer = this.page.locator('//*[@id="title"]/div[1]/button');
  searchInput = this.page.getByPlaceholder("Type a value...");
  searchButton = this.page.locator("#search-customer");
  customerInCustomerList = this.page.locator("#table-customers > tbody > tr > td:nth-child(1)");
  
  

  async clickAddNewCustomer() {
    await this.addNewCustomer.click();
  }

  async fillAndSearch(searchingValue: string ) {
    await this.searchInput.fill(searchingValue);
    await this.searchButton.click();
  }

  async innerEmailRegistredCustomer() {
  return await this.customerInCustomerList.innerText()
  };

}
