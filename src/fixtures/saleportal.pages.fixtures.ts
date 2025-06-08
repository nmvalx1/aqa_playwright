import { expect, test as base } from "@playwright/test";
import { AddNewCustomer } from "ui/pages/createcustomer.page";
import { Customers } from "ui/pages/customers.page";
import { DeleteModal } from "ui/pages/deletecustomer.modal.page";
import { Home } from "ui/pages/home.page";
import { SignIn } from "ui/pages/SignIn.page";

export interface ISalePortalPages {
  addCustomer: AddNewCustomer;
  customer: Customers;
  homePage: Home;
  signIn: SignIn;
  deleteModal: DeleteModal;
}

export const test = base.extend<ISalePortalPages>({
  addCustomer: async ({ page }, use) => {
    await use(new AddNewCustomer(page));
  },

  customer: async ({ page }, use) => {
    await use(new Customers(page));
  },

  homePage: async ({ page }, use) => {
    await use(new Home(page));
  },

  signIn: async ({ page }, use) => {
    await use(new SignIn(page));
  },

  deleteModal: async ({ page }, use) => {
    await use(new DeleteModal(page));
  },
});

export { expect } from "@playwright/test"