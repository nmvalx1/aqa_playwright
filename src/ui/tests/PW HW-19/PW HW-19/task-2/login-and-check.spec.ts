// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные test@gmail.com / 12345678 при этом:
//  - дождаться исчезновения спиннеров
//  - проверить действительно ли пользователь с логином Anatoly вошел в систему
//  - Проверить скриншотом боковое навигационное меню с выбранной страницей Home


import test, { expect } from "@playwright/test";
const credential: { email: string; pass: string } = {
  email: "test@gmail.com",
  pass: "12345678",
};

test.describe("[UI] Task 2 test", () => {
  test("LogIn and check username", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    await page
      .getByPlaceholder("Enter a valid email address")
      .fill(credential.email);
    await page.getByPlaceholder("Enter password").fill(credential.pass);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("load", { timeout: 10000 });
    const loginAnatoly = page.locator('//*[@id="dropdownUser1"]/strong');
    await expect(loginAnatoly).toHaveText("Anatoly");
    const menuBar = page.locator('//*[@id="sidebar"]');
    await expect(menuBar).toHaveScreenshot();
  });
});
