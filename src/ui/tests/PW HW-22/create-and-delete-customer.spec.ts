// Создайте e2e тест со следующими шагами:
// 1. Зайти на сайт Sales Portal
// 2. Залогиниться с вашими кредами
// 3. Перейти на страницу Customers List
// 4. Перейти на станицу Add New Customer
// 5. Создать покупателя
// 6. Проверить наличие покупателя в таблице
// 7. Кликнуть на кнопку "Delete" в таблице для созданного покупателя
// 8. В модалке удаления кликнуть кнопку Yes, Delete
// 9. Дождаться исчезновения модалки и загрузки страницы
// 10. Проверить, что покупатель отсутствует в таблице

// Вам понадобится:

// - PageObject модалки удаления покупателя
// - Подключить модалку в PageObject страницы Customers
// - Использовать фикстуры

import { SignIn } from "../../pages/SignIn.page";
import { Home } from "../../pages/home.page";
import { AddNewCustomer } from "../../pages/createcustomer.page";
import { test, expect } from "../../fixtures/saleportal.pages.fixtures";
import { url } from "../../data/data";
import { LOG, PASS } from "../../../config/environment";
import { Customers } from "../../pages/customers.page";
import { generateCustomerBody } from "../../utils/generate.customer";
import { CustomerBody } from "ui/types/createcustomer.type";
import { DeleteModal } from "ui/pages/deletecustomer.modal.page";

test("[UI] Create , verify, delete customer and verify that customer was deleted", async ({
  page, signIn , customer , home , addCustomer , deleteModal
}) => {
  const customerBody: CustomerBody = generateCustomerBody();

  await page.goto(url);
  await signIn.fillCreds(LOG, PASS);
  await signIn.clickLoginButton();
  await home.waitForSpinner();
  await home.clickCustomer();
  await customer.waitForSpinner();
  await customer.clickAddNewCustomer();
  await addCustomer.waitForSpinner();
  await addCustomer.fillCredentials(customerBody);
  await addCustomer.clickSave();
  await customer.waitForSpinner();
  await customer.fillAndSearch(customerBody.email);
  await customer.waitForSpinner();
  const receivdCustomerEmail: string = await customer
    .getEmailFromRow(customerBody.email)
    .innerText();
  const receivdName: string = await customer
    .getNameFromRow(customerBody.email)
    .innerText();
  expect.soft(customerBody.email).toBe(receivdCustomerEmail);
  expect.soft(customerBody.name).toBe(receivdName);
  await customer.getDeleteButtonFromRow(customerBody.email).click();
  await deleteModal.waitForOpenModal();
  await deleteModal.deleteCustomer();
  await deleteModal.waitForCloseModal();
  await customer.waitForSpinner();
  await customer.fillAndSearch(customerBody.email);
  await customer.waitForSpinner();
  await expect(customer.emptyRow).toBeVisible();
});
