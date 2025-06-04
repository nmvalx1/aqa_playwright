// Реализовать SignInController по аналогии с CustomersController и использовать его во всех уже написанных АПИ тестах

import { apiConfig } from "config/apiConfig";
import {
  ILoginResponse,
  ILogoutResponse,
  IRequestOption,
  LoginBody,
} from "types/SignIn.type";
import { RequestApi } from "../apiSignin/request";

export class SignInController {
  constructor(private request = new RequestApi()) {}

  async login( body: LoginBody ) {
    const options: IRequestOption = {
      url: apiConfig.SALEPORTAL_BASE_URL + apiConfig.SALEPORTAL_ENDPOINTS.LOGIN,
      method: "post",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    };

    return await this.request.send<ILoginResponse>(options);
  }

  async logout(token: string) {
    const options: IRequestOption = {
        url: apiConfig.SALEPORTAL_BASE_URL + apiConfig.SALEPORTAL_ENDPOINTS.LOGOUT,
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
      };
      return await this.request.send<ILogoutResponse>(options);
  }
}
