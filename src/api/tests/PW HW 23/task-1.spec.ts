// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

import {expect, request } from "@playwright/test";
import { jsonSchemesValidator } from "../../../utils/jsonSchemesValidator";
import { LOGIN, PASSWORD } from "../../../config/environment";
import { jsonLoginSchema } from "data/schemesValidation/login/login.schemas";
import { test  } from "../../../fixtures/saleportal.controllers.fixtures"
import { LoginBody } from "types/SignIn.type";
import { STATUSES } from "data/Saleportal.status.enum";
import { SignInController } from "api/controllers/SignIn.controllers";

test.describe("[API] [Authorization]", () => {
  //   let BASE_URL = "https://aqa-course-project.app/";
  //   let LOGIN_ENDPOINT = "/api/login";

  test("POST/login, login with valid credentials", async ({  request }) => {
    const loginController = new SignInController()
    const LoginBody: LoginBody = {
      username: LOGIN,
      password: PASSWORD,
    };
    const loginResponse = await loginController.login(LoginBody);
    // console.log(loginResponse.body.)
    jsonSchemesValidator(jsonLoginSchema, loginResponse.body);
    expect.soft(loginResponse.headers).toBeTruthy();
    expect.soft(loginResponse.status).toBe(STATUSES.OK);
    expect.soft(loginResponse.body.User.username).toBe(LoginBody.username);
  });
});
