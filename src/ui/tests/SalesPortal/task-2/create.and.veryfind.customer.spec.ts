// Разработать е2е теста со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя ваши учетные данные
//  - Создать покупателя (модуль Customers)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданного покупателя в таблице (сравнить все имеющиеся поля, покупатель должен быть самым верхним)
import { Home } from "ui/pages/home.page";
import { SignIn } from "ui/pages/SignIn.page";
import { expect, test } from "@playwright/test";
import { data , url } from "ui/data/data";
import { Customers } from "ui/pages/customers.page";
import { AddNewCustomer } from "ui/pages/createcustomer.page";
import { CustomerBody } from "../../../types/createcustomer.type";
import { generateCustomerBody } from "../../../utils/generate.customer";
import { RegistredModal } from "../../../pages/successfully.registr.modal.page"

test("[UI] Create and verify customer in table", async ({ page }) => {
  const signin = new SignIn(page);
  const home = new Home(page);
  const customers = new Customers(page);
  const addCustomer = new AddNewCustomer(page);
  const generatedCustomer: CustomerBody = generateCustomerBody();
  const modalWindow = new RegistredModal(page);
 
  await page.goto(url);
  await signin.fillCreds(data.email, data.password);
  await signin.clickLoginButton();
  await signin.waitForSpinner();
  await home.clickCustomer();
  await customers.waitForSpinner();
  await customers.clickAddNewCustomer();
  await addCustomer.fillCredentials(generatedCustomer)
  await addCustomer.clickSave();
  await addCustomer.waitForSpinner();
  await expect.soft(modalWindow.createdNotification).toBeVisible();
  await expect.soft(modalWindow.createdNotification).toContainText("Customer was successfully");
  await modalWindow.closeModal();
  await customers.waitForSpinner();
  await customers.fillAndSearch(generatedCustomer.email)
  
  await customers.waitForSpinner();
  const innerEmail = await customers.innerEmailRegistredCustomer();
  await expect(innerEmail).toBe(generatedCustomer.email)
  
});