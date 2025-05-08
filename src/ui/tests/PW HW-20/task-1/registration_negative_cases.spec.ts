// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте

import { test, expect } from "@playwright/test";
import { dataForRegistration } from "./constants.registration_negative_cases";

test.describe("[UI][DDT] Registration negative cases on demo-login-form", () => {
  dataForRegistration.forEach(
    ({ testCaseName, Username, Password, Message }) => {
      test(testCaseName, async ({ page }) => {
        const registerFormLocator = page.locator(".registerForm");
        const buttonRegisterOnRegistration = page.locator("#register");
        const messageLocator = page.locator("#errorMessageOnRegister");

        await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
        await page.locator("#registerOnLogin").click();
        await page.evaluate(() => {
          document
            .querySelector("#userNameOnRegister")
            ?.removeAttribute("maxlength");
        });
        await page.evaluate(() => {
          document
            .querySelector("#passwordOnRegister")
            ?.removeAttribute("maxlength");
        });
        await registerFormLocator.locator("#userNameOnRegister").fill(Username);
        await registerFormLocator.locator("#passwordOnRegister").fill(Password);
        await buttonRegisterOnRegistration.click();
        await expect(messageLocator).toBeVisible();
        await expect(messageLocator).toHaveText(Message);
      });
    }
  );
});
