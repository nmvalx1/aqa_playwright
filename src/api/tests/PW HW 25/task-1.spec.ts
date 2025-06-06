// Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
// 1. Orders This Year
// 2. New Customers
// 3. Canceled Orders

// Для реализации подмокивайте респонс эндпоинта metrics

//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.customers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders

// Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных

import { mergeTests, expect } from "@playwright/test";
import { IMetricsResponse } from "types/metrics.type";
import { test as mock } from "../../../fixtures/mock.fixture";
import { test as signIn } from "../../../fixtures/saleportal.pages.fixtures";
import { test as home } from "../../../fixtures/saleportal.pages.fixtures";
const test = mergeTests(mock, signIn, home);
import { PORTAL_URL, LOGIN, PASSWORD } from "config/environment";

test.describe("[UI] [Integration] [Home Page]", async () => {
  test('Mock "Metrics.orders.totalOrders" and check value in Orders This Yea\'', async ({
    page,
    mock,
    signIn,
    homePage,
  }) => {
    const mockedResponseBody: IMetricsResponse = {
      IsSuccess: true,
      Metrics: {
        orders: {
          totalRevenue: 0,
          totalOrders: 9999,
          averageOrderValue: 0,
          totalCanceledOrders: 0,
          recentOrders: [
            {
              _id: "string",
              status: "Draft",
              customer: {
                _id: "string",
                email: "string",
                name: "string",
                country: "USA",
                city: "string",
                street: "string",
                house: 0,
                flat: 0,
                phone: "string",
                createdOn: "2025-06-06T12:56:11.238Z",
                notes: "string",
              },
              products: [
                {
                  _id: "string",
                  name: "string",
                  amount: 0,
                  price: 0,
                  manufacturer: "Apple",
                  received: true,
                },
              ],
              total_price: 0,
              createdOn: "2025-06-06T12:56:11.238Z",
              delivery: {
                finalDate: "2023-04-30",
                condition: "Pickup",
                address: {
                  country: "USA",
                  city: "New York",
                  street: "5th Avenue",
                  house: 1,
                  flat: 101,
                },
              },
              comments: [
                {
                  _id: "645189c01b1eccc04f9aba5d",
                  text: "Great service!",
                  createdOn: "2023-09-29T12:05:00Z",
                },
              ],
              history: [
                {
                  status: "string",
                  customer: "string",
                  products: [
                    {
                      _id: "string",
                      name: "string",
                      amount: 0,
                      price: 0,
                      manufacturer: "Apple",
                      received: true,
                    },
                  ],
                  total_price: 0,
                  action: "Order created",
                  changedOn: "2025-06-06T12:56:11.238Z",
                },
              ],
            },
          ],
          ordersCountPerDay: [
            {
              date: {
                year: 0,
                month: 0,
                day: 0,
              },
              count: 0,
            },
          ],
        },
        customers: {
          totalNewCustomers: 0,
          topCustomers: [
            {
              customerName: "string",
              customerEmail: "string",
              totalSpent: 0,
              ordersCount: 0,
            },
          ],
          customerGrowth: [
            {
              date: {
                year: 0,
                month: 0,
                day: 0,
              },
              count: 0,
            },
          ],
        },
        products: {
          topProducts: [
            {
              name: "string",
              sales: 0,
            },
          ],
        },
      },
      ErrorMessage: null,
    };
    await mock.MetricsOrdersTotalOrder(mockedResponseBody);
    await page.goto(PORTAL_URL);
    await signIn.fillCreds(LOGIN, PASSWORD);
    await signIn.clickLoginButton();
    await homePage.waitForSpinner();
    const title = homePage.welcomeTitle;
    expect.soft(title).toBeVisible();
    const totalOrders = await page
      .locator("#total-orders-container .card-text")
      .innerText();
    const numberTotalOrders = +totalOrders;
    expect(mockedResponseBody.Metrics.orders.totalOrders).toEqual(
      numberTotalOrders
    );
  });

  test('Mock "Metrics.customers.customers" and check value in New Customers', async ({
    page,
    mock,
    signIn,
    homePage,
  }) => {
    const mockedResponseBody: IMetricsResponse = {
      IsSuccess: true,
      Metrics: {
        orders: {
          totalRevenue: 0,
          totalOrders: 9999,
          averageOrderValue: 0,
          totalCanceledOrders: 0,
          recentOrders: [
            {
              _id: "string",
              status: "Draft",
              customer: {
                _id: "string",
                email: "string",
                name: "string",
                country: "USA",
                city: "string",
                street: "string",
                house: 0,
                flat: 0,
                phone: "string",
                createdOn: "2025-06-06T12:56:11.238Z",
                notes: "string",
              },
              products: [
                {
                  _id: "string",
                  name: "string",
                  amount: 0,
                  price: 0,
                  manufacturer: "Apple",
                  received: true,
                },
              ],
              total_price: 0,
              createdOn: "2025-06-06T12:56:11.238Z",
              delivery: {
                finalDate: "2023-04-30",
                condition: "Pickup",
                address: {
                  country: "USA",
                  city: "New York",
                  street: "5th Avenue",
                  house: 1,
                  flat: 101,
                },
              },
              comments: [
                {
                  _id: "645189c01b1eccc04f9aba5d",
                  text: "Great service!",
                  createdOn: "2023-09-29T12:05:00Z",
                },
              ],
              history: [
                {
                  status: "string",
                  customer: "string",
                  products: [
                    {
                      _id: "string",
                      name: "string",
                      amount: 0,
                      price: 0,
                      manufacturer: "Apple",
                      received: true,
                    },
                  ],
                  total_price: 0,
                  action: "Order created",
                  changedOn: "2025-06-06T12:56:11.238Z",
                },
              ],
            },
          ],
          ordersCountPerDay: [
            {
              date: {
                year: 0,
                month: 0,
                day: 0,
              },
              count: 0,
            },
          ],
        },
        customers: {
          totalNewCustomers: 1117,
          topCustomers: [
            {
              customerName: "string",
              customerEmail: "string",
              totalSpent: 0,
              ordersCount: 0,
            },
          ],
          customerGrowth: [
            {
              date: {
                year: 0,
                month: 0,
                day: 0,
              },
              count: 0,
            },
          ],
        },
        products: {
          topProducts: [
            {
              name: "string",
              sales: 0,
            },
          ],
        },
      },
      ErrorMessage: null,
    };
    await mock.MetricsOrdersTotalOrder(mockedResponseBody);
    await page.goto(PORTAL_URL);
    await signIn.fillCreds(LOGIN, PASSWORD);
    await signIn.clickLoginButton();
    await homePage.waitForSpinner();
    const title = homePage.welcomeTitle;
    expect.soft(title).toBeVisible();
    const customers = await page
      .locator("#total-customers-container .card-text")
      .innerText();
    const numbeCustomers = +customers;
    expect(mockedResponseBody.Metrics.customers.totalNewCustomers).toEqual(
      numbeCustomers
    );
  });

  test('Mock "Metrics.orders.totalCanceledOrders" and check value in Canceled Orders', async ({
    page,
    mock,
    signIn,
    homePage,
  }) => {
    const mockedResponseBody: IMetricsResponse = {
      IsSuccess: true,
      Metrics: {
        orders: {
          totalRevenue: 0,
          totalOrders: 0,
          averageOrderValue: 0,
          totalCanceledOrders: 555501,
          recentOrders: [
            {
              _id: "string",
              status: "Draft",
              customer: {
                _id: "string",
                email: "string",
                name: "string",
                country: "USA",
                city: "string",
                street: "string",
                house: 0,
                flat: 0,
                phone: "string",
                createdOn: "2025-06-06T12:56:11.238Z",
                notes: "string",
              },
              products: [
                {
                  _id: "string",
                  name: "string",
                  amount: 0,
                  price: 0,
                  manufacturer: "Apple",
                  received: true,
                },
              ],
              total_price: 0,
              createdOn: "2025-06-06T12:56:11.238Z",
              delivery: {
                finalDate: "2023-04-30",
                condition: "Pickup",
                address: {
                  country: "USA",
                  city: "New York",
                  street: "5th Avenue",
                  house: 1,
                  flat: 101,
                },
              },
              comments: [
                {
                  _id: "645189c01b1eccc04f9aba5d",
                  text: "Great service!",
                  createdOn: "2023-09-29T12:05:00Z",
                },
              ],
              history: [
                {
                  status: "string",
                  customer: "string",
                  products: [
                    {
                      _id: "string",
                      name: "string",
                      amount: 0,
                      price: 0,
                      manufacturer: "Apple",
                      received: true,
                    },
                  ],
                  total_price: 0,
                  action: "Order created",
                  changedOn: "2025-06-06T12:56:11.238Z",
                },
              ],
            },
          ],
          ordersCountPerDay: [
            {
              date: {
                year: 0,
                month: 0,
                day: 0,
              },
              count: 0,
            },
          ],
        },
        customers: {
          totalNewCustomers: 0,
          topCustomers: [
            {
              customerName: "string",
              customerEmail: "string",
              totalSpent: 0,
              ordersCount: 0,
            },
          ],
          customerGrowth: [
            {
              date: {
                year: 0,
                month: 0,
                day: 0,
              },
              count: 0,
            },
          ],
        },
        products: {
          topProducts: [
            {
              name: "string",
              sales: 0,
            },
          ],
        },
      },
      ErrorMessage: null,
    };
    await mock.MetricsOrdersTotalOrder(mockedResponseBody);
    await page.goto(PORTAL_URL);
    await signIn.fillCreds(LOGIN, PASSWORD);
    await signIn.clickLoginButton();
    await homePage.waitForSpinner();
    const title = homePage.welcomeTitle;
    expect.soft(title).toBeVisible();
    const cancledOrders = await page
      .locator("#canceled-orders-container .card-text")
      .innerText();
    const numbeCancledOrders = +cancledOrders;
    expect(mockedResponseBody.Metrics.orders.totalCanceledOrders).toEqual(
      numbeCancledOrders
    );
  });
});
