import { test as base } from "@playwright/test";
import { Mock } from "api/mocks/mocks";

interface IMockFixture {
  mock: Mock;
}

export const test = base.extend<IMockFixture>({
  mock: async ({ page }, use) => {
    await use(new Mock(page));
  },
});

export { expect } from "@playwright/test";
