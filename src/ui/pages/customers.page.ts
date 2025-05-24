import { BasePage } from "./Salesportal.BasePage.page";

export class Customers extends BasePage {
  readonly addNewCustomer = this.page.locator('//*[@id="title"]/div[1]/button');
  readonly searchInput = this.page.getByPlaceholder("Type a value...");
  readonly searchButton = this.page.locator("#search-customer");
  readonly customerInCustomerList = this.page.locator(
    "#table-customers > tbody > tr > td:nth-child(1)"
  );
  readonly customerName = this.page.locator(
    "#table-customers > tbody > tr > td:nth-child(2)"
  );
  readonly tableRows = this.page.locator("#table-customers tbody tr");
  readonly emptyRow = this.tableRows.locator(" td").getByText("No records created yet");
  readonly getRowByEmail = (email: string ) => this.tableRows.filter({ has: this.page.getByText(email,{ exact: true }) });
  readonly getEmailFromRow = ( email: string ) => this.getRowByEmail(email).locator("td:nth-child(1)");
  readonly getNameFromRow = ( email: string ) => this.getRowByEmail(email).locator("td:nth-child(2)");
  readonly getCountryFromRow = ( email: string ) => this.getRowByEmail(email).locator("td:nth-child(3)");
  readonly getCreatedOnFromRow = ( email: string ) => this.getRowByEmail(email).locator("td:nth-child(4)");
  readonly getDetailsButtonFromRow = ( email: string ) => this.getRowByEmail(email).locator("td:nth-child(5)").getByTitle("Details");
  readonly getEditButtonFromRow = ( email: string ) => this.getRowByEmail(email).locator("td:nth-child(5)").getByTitle("Edit");
  readonly getDeleteButtonFromRow = ( email: string ) => this.getRowByEmail(email).locator("td:nth-child(5)").getByTitle("Delete");

  async clickAddNewCustomer() {
    await this.addNewCustomer.click();
  }

  async fillAndSearch(searchingValue: string) {
    await this.searchInput.fill(searchingValue);
    await this.searchButton.click();
  }

  async innerEmailRegistredCustomer() {
    return await this.customerInCustomerList.innerText();
  }

  async innerNameRegistredCustomer() {
    return await this.customerName.innerText();
  }

}
