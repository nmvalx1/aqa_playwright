import { test as base } from "@playwright/test";
import { SignInController } from "api/controllers/SignIn.controllers";

export interface ISalePortalController {
  loginController: SignInController;
}

const test = base.extend<ISalePortalController>({
  loginController: async ({ request }, use) => {
    await use(new SignInController());
  }
})

export { expect , test  } from "@playwright/test";