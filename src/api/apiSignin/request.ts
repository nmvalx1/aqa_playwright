import { APIResponse, request } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { IRequestOption, IResponse } from "types/SignIn.type";
import _ from "lodash";

export class RequestApi {
  private response?: APIResponse;

  async send<T extends object>(options: IRequestOption): Promise <IResponse<T>> {
    try {
      const requestContext = await request.newContext({
        baseURL: options.baseURL ?? apiConfig.SALEPORTAL_BASE_URL,
      });

      this.response = await requestContext.fetch(options.url, _.omit(options, ["baseURL", "url"]));
      if(this.response.status() >= 500 ) throw new Error();
    const result = await this.transformResponse();
      return result
    } catch (err) {
      throw err;
    }
  }
  async transformResponse (){
    let body;
    const contentType = this.response!.headers()["content-type"] || "";
    if(contentType.includes("application/json")){
        body = await this.response!.json();
    } else {
        body = await this.response!.text();
    }
    return {
        status: this.response!.status(),
        body,
        headers: this.response!.headers(),
    }
  }
}
