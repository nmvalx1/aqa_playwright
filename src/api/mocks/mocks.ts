import { Page } from "@playwright/test";
import { IMetricsResponse } from "types/metrics.type";

export class Mock {
  constructor(private page: Page) {}

  async MetricsOrdersTotalOrder(body: IMetricsResponse) {
    await this.page.route("**/api/metrics**", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(body),
      });
    });
  }
};
