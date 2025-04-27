// Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
//     Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//     Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

import test, { expect } from "@playwright/test";
const validCredsMin: { username: string; password: string } = {
  username: "nmg",
  password: "Alex123@",
};
const validCredsMax: { username: string; password: string } = {
  username: "abcdefgh2jklmnopqrstuvwxyza1cd0fghijklmn",
  password: "Defghijk6mnopqrstuvw",
};

test.describe("[UI] HW-18 Register", () => {
  test.beforeEach("Precondition before tests", async ({ page }) => {
    //Arrange
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    const buttonRegisterOnLogin = page.locator("#registerOnLogin");
    await buttonRegisterOnLogin.click();
    const titleRegistration = page.locator("#registerForm");
    await expect(titleRegistration).toBeVisible();
    // const inputUsernameOnRegister = page.locator("#userNameOnRegister");
    // const inputPasswordOnRegister = page.locator("#passwordOnRegister");

    // await inputUsernameOnRegister.fill(validCredsMin.username);
    // await inputPasswordOnRegister.fill(validCredsMin.password);
    // const buttonRegisterOnRegistration = page.locator('#register');
    // await buttonRegisterOnRegistration.click();
  });
  
  test("Register with valid MIN.length username and password", async ({ page }) => {
    //Assert
    const inputUsernameOnRegister = page.locator("#userNameOnRegister");
    const inputPasswordOnRegister = page.locator("#passwordOnRegister");
    await inputUsernameOnRegister.fill(validCredsMin.username);
    await inputPasswordOnRegister.fill(validCredsMin.password);
    const buttonRegisterOnRegistration = page.locator("#register");
    await buttonRegisterOnRegistration.click();
    const succMessage = page.locator("#errorMessageOnRegister");
    await expect(succMessage).toHaveText(
      "Successfully registered! Please, click Back to return on login page"
    );
    const buttonBackOnRegister = page.locator("#backOnRegister");
    await expect(buttonBackOnRegister).toBeVisible();
  });
  
  test("Register and Submit with MIN.length username and passwork", async ({ page }) => {
    //Act
    const inputUsernameOnRegister = page.locator("#userNameOnRegister");
    const inputPasswordOnRegister = page.locator("#passwordOnRegister");
    await inputUsernameOnRegister.fill(validCredsMin.username);
    await inputPasswordOnRegister.fill(validCredsMin.password);
    const buttonRegisterOnRegistration = page.locator("#register");
    await buttonRegisterOnRegistration.click();
    const succMessage = page.locator("#errorMessageOnRegister");
    await expect(succMessage).toHaveText(
      "Successfully registered! Please, click Back to return on login page"
    );
    const buttonBackOnRegister = page.locator("#backOnRegister");
    await expect(buttonBackOnRegister).toBeVisible();

    await buttonBackOnRegister.click();
    const titleLogin = page.locator("#loginForm");
    await expect(titleLogin).toBeVisible();

    const inputUsernameOnLogin = page.locator("#userName");
    const inputPasswordOnLogin = page.locator("#password");
    await inputUsernameOnLogin.fill(validCredsMin.username);
    await inputPasswordOnLogin.fill(validCredsMin.password);
    const buttonSubmit = page.locator("#submit");
    await buttonSubmit.click();
    //Assert
    const succMessageAfterSubmit = page.locator("#successMessage");
    expect(succMessageAfterSubmit).toHaveText(
      `Hello, ${validCredsMin.username}!`
    );
    expect(page.locator("#backButton")).toBeVisible();
  });
  
  test("Register with valid MAX.length username and password", async ({ page }) => {
    const inputUsernameOnRegister = page.locator("#userNameOnRegister");
    const inputPasswordOnRegister = page.locator("#passwordOnRegister");
    await inputUsernameOnRegister.fill(validCredsMax.username);
    await inputPasswordOnRegister.fill(validCredsMax.password);
    const buttonRegisterOnRegistration = page.locator("#register");
    await buttonRegisterOnRegistration.click();
    const succMessage = page.locator("#errorMessageOnRegister");
    await expect(succMessage).toHaveText(
      "Successfully registered! Please, click Back to return on login page"
    );
    const buttonBackOnRegister = page.locator("#backOnRegister");
    await expect(buttonBackOnRegister).toBeVisible();
  });
 
  test("Register and Submit with MAX.length username and passwork", async ({ page }) => {
    //Act
    const inputUsernameOnRegister = page.locator("#userNameOnRegister");
    const inputPasswordOnRegister = page.locator("#passwordOnRegister");
    await inputUsernameOnRegister.fill(validCredsMax.username);
    await inputPasswordOnRegister.fill(validCredsMax.password);
    const buttonRegisterOnRegistration = page.locator("#register");
    await buttonRegisterOnRegistration.click();
    const succMessage = page.locator("#errorMessageOnRegister");
    await expect(succMessage).toHaveText(
      "Successfully registered! Please, click Back to return on login page"
    );
    const buttonBackOnRegister = page.locator("#backOnRegister");
    await expect(buttonBackOnRegister).toBeVisible();

    await buttonBackOnRegister.click();
    const titleLogin = page.locator("#loginForm");
    await expect(titleLogin).toBeVisible();

    const inputUsernameOnLogin = page.locator("#userName");
    const inputPasswordOnLogin = page.locator("#password");
    await inputUsernameOnLogin.fill(validCredsMax.username);
    await inputPasswordOnLogin.fill(validCredsMax.password);
    const buttonSubmit = page.locator("#submit");
    await buttonSubmit.click();
    //Assert
    const succMessageAfterSubmit = page.locator("#successMessage");
    expect(succMessageAfterSubmit).toHaveText(
      `Hello, ${validCredsMax.username}!`
    );
    expect(page.locator("#backButton")).toBeVisible();
});
})