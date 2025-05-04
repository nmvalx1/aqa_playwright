// TASK 1 :
// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!
import { test, expect } from "@playwright/test";
import { DYNAMIC_CONTROL_TEXTS } from "./dynamic_controls.enums";

test("dynamic_controls waits", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/");
  await page.getByRole("link", { name: "Dynamic Controls" }).click();
  const buttonRemove = page.getByRole("button", { name: "Remove" });
  await buttonRemove.waitFor({ state: "visible", timeout: 10000 });
  await page.getByRole("heading", { name: "Dynamic Controls" }).isVisible();
  await page.getByText(DYNAMIC_CONTROL_TEXTS.DEMONSTRATE).isVisible();
  const checkBox = page.locator('//input[@type="checkbox"]');
  await checkBox.click();
  await buttonRemove.click();
  await buttonRemove.waitFor({ state: "detached", timeout: 10000 });
  const buttonAdd = page.getByRole("button", { name: "Add" });
  await expect(buttonAdd).toBeEnabled();
  await page.getByText(DYNAMIC_CONTROL_TEXTS.GONE).isVisible();
  await buttonAdd.click();
  await checkBox.waitFor({ state: "visible", timeout: 10000 });
  await page.getByText(DYNAMIC_CONTROL_TEXTS.BACK).isVisible;
});
