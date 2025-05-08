// Разработать тест со следующими шагами:
// https://anatoly-karpovich.github.io/demo-shopping-cart/
//   - добавить продукты 2,4,6,8,10
//   - завалидировать бейдж с количеством
//   - открыть чекаут
//   - завалидировать сумму и продукты
//   - ввести все найденные вами промокоды (вспоминаем первую лекцию)
//   - завалидировать конечную сумму
//   - зачекаутиться
//   - завалидировать сумму

import { expect, Page, test } from "@playwright/test";
import { PROMOS, PROMOS_PERCENT } from "./enum.testik";
import { searchProductByName , searchPriceByProductName , getProdutPriceByProductName} from "./functions.shop-cart-test";






test.describe("shopping cart tests", async () => {
  test("[UI] Add products and check total price", async ({ page }) => {
    const shoppingCartButtonValue = page.locator("#badge-number");
    const buttonShoppingCart = page.getByRole("button", {
      name: " Shopping Cart ",
    });
    
    
    
    await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");

    await searchProductByName("Product 2", page).click();
    await searchProductByName("Product 4", page).click();
    await searchProductByName("Product 6", page).click();
    await searchProductByName("Product 8", page).click();
    await searchProductByName("Product 10", page).click();

    
    await shoppingCartButtonValue.waitFor({ state: "visible", timeout: 5000 });
    await expect.soft(shoppingCartButtonValue).toHaveText("5");

    await buttonShoppingCart.click();

    const [product2, product4, product6, product8, product10] =
      await Promise.all([
        getProdutPriceByProductName("Product 2", page),
        getProdutPriceByProductName("Product 4", page),
        getProdutPriceByProductName("Product 6", page),
        getProdutPriceByProductName("Product 8", page),
        getProdutPriceByProductName("Product 10", page),
      ]);
    const totalProductSum: number =
      product2 + product4 + product6 + product8 + product10;
    const totalPrice = await page.locator("#total-price").innerText();
    const totalPriceWithout$ = totalPrice.replace("$", "");
    const totalPriceWithout00 = +totalPriceWithout$.replace(".00", "");

    await expect.soft(totalPriceWithout00).toBe(totalProductSum);

    async function insertPromosAndRedeem(promoName: string, percent: number) {
      const LocatorPercent = page
        .locator("small.text-muted.fw-bold")
        .filter({ has: page.getByText(`-${percent}%`) });
      const LocatorPromo = page
        .locator("span.my-0")
        .filter({ has: page.getByText(promoName) });

      await page.getByPlaceholder("Promo code").fill(promoName);
      await page.getByRole("button", { name: "Redeem" }).click();

      await LocatorPercent.waitFor({ state: "visible", timeout: 1000 });
      await LocatorPromo.waitFor({ state: "visible", timeout: 1000 });

      const txtFromLocatorPercent = await LocatorPercent.innerText();
      const txtFromLocatorPromo = await LocatorPromo.innerText();

      await expect.soft(txtFromLocatorPercent).toBe(`-${percent}%`);
      await expect.soft(txtFromLocatorPromo).toBe(promoName);
    };

    await insertPromosAndRedeem(PROMOS.percent8, PROMOS_PERCENT.percent8);
    await insertPromosAndRedeem(PROMOS.percent7, PROMOS_PERCENT.percent7);
    await insertPromosAndRedeem(PROMOS.percent10, PROMOS_PERCENT.percent10);

    const total = await page.locator("#total-price").innerText();
    await expect(total).toBe("$4237.50 (-$1412.5)");

    await page.getByRole("button", { name: "Continue to checkout" }).click();
    const totalSumInCheckoutPage = page.locator("div .text-muted");
    const innerTxtTotalSumInCheckoutPage =
      await totalSumInCheckoutPage.innerText();
      const totalReplaced = total.replace(" (-$1412.5)", "")
    await expect.soft(innerTxtTotalSumInCheckoutPage).toBe(totalReplaced);
  });
});
