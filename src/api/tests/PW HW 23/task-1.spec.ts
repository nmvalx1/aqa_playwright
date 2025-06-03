// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

import { test, expect, request } from "@playwright/test";
import { jsonSchemesValidator } from "../../../utils/jsonSchemesValidator";
import { LOG, PASS } from "../../../config/environment";
import { jsonLoginSchema } from "data/schemesValidation/login/login.schemas";
import { apiConfig } from "../../../config/apiConfig"

test.describe("[API] [Authorization]", () => {
//   let BASE_URL = "https://aqa-course-project.app/";
//   let LOGIN_ENDPOINT = "/api/login";


  test("POST/login, login with valid credentials", async ({ request }) => {
    const postLoginResponse = await request.post(apiConfig.SALEPORTAL_BASE_URL + apiConfig.SALEPORTAL_ENDPOINTS.LOGIN, {
      data: {
        username: LOG,
        password: PASS,
      },
      headers: {
        "content-type": "application/json",
      },
    });
    const loginHeaders = postLoginResponse.headers();
    const token = loginHeaders["authorization"];
    const body = await postLoginResponse.json();
    const status = postLoginResponse.status();

    jsonSchemesValidator(jsonLoginSchema, body);
    expect.soft(token).toBeTruthy();
    expect.soft(status).toBe(200);
    expect.soft(body.User.username).toBe(LOG);
  });
});
