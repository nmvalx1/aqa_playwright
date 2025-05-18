import { BasePage } from "./Salesportal.BasePage.page";
import { Page } from "@playwright/test";
import { CustomerBody } from "../types/createcustomer.type";

export class AddNewCustomer extends BasePage {
  email = this.page.locator("#inputEmail");
  name = this.page.locator("#inputName");
  country = this.page.locator("#inputCountry");
  city = this.page.locator("#inputCity");
  street = this.page.locator("#inputStreet");
  house = this.page.locator("#inputHouse");
  flat = this.page.locator("#inputFlat");
  phone = this.page.locator("#inputPhone");
  notes = this.page.locator("#textareaNotes");
  saveButton = this.page.locator("#save-new-customer");
  customersButton = this.page.locator(".bi bi-arrow-left me-2");


  async fillCredentials(CustomerData: CustomerBody) {
    this.email && (await this.email.fill(CustomerData.email));
    this.name && (await this.name.fill(CustomerData.name));
    this.country && (await this.country.selectOption(CustomerData.country));
    this.city && (await this.city.fill(CustomerData.city));
    this.street && (await this.street.fill(CustomerData.street));
    this.house && (await this.house.fill(CustomerData.house.toString()));
    this.flat && (await this.flat.fill(CustomerData.flat.toString()));
    this.phone && (await this.phone.fill(CustomerData.phone));
    this.notes && (await this.notes.fill(CustomerData.notes));
  }
  async clickSave() {
    await this.saveButton.click();
  }

  async clickCustomers() {
    await this.customersButton.click();
  }
}
