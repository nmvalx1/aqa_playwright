import test, { expect } from "@playwright/test";

test.describe("[UI] Authentication", () => {
  test("Aith with valid credentioals", async ({ page }) => {
    const valiCreadentials: { username: string; pass: string } = {
      username: "tomsmith",
      pass: "SuperSecretPassword!",
    };

    await page.goto("https://the-internet.herokuapp.com/");
    const formAuthentificationButton = page.locator('[href="/login"]');
    await formAuthentificationButton.click();
    await page.locator('input[type="text"]').fill(valiCreadentials.username);
    await page.locator('input[type="password"]').fill(valiCreadentials.pass);
    await page.locator('[type = "submit"]').click();
    const loggedBanner = page.locator("div[data-alert]");
    await expect(loggedBanner).toContainText("You logged into a secure area");
  });
});
