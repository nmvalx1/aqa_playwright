import { expect, Page } from "@playwright/test";

function searchProductByName(NameOfProduct: string, page: Page) {
  const searchName = page.getByText(NameOfProduct, { exact: true });
  return page
    .locator("div.card-body")
    .filter({ has: searchName })
    .getByRole("button");
}

function searchPriceByProductName(NameOfProduct: string, page: Page) {
  return page
    .locator("#products-in-shopping-cart li")
    .filter({ hasText: NameOfProduct })
    .locator("span.text-muted");
};

async function getProdutPriceByProductName(
    NameOfProduct: string,
    page: Page
  ): Promise<number> {
    const priceSpan = await searchPriceByProductName(NameOfProduct, page);
    const priceSpanTxt = await priceSpan.innerText();
    const priceSpanTxtWithout$ = priceSpanTxt.replace("$", "");
    return Number(priceSpanTxtWithout$);
  };


export { searchProductByName , searchPriceByProductName , getProdutPriceByProductName };
