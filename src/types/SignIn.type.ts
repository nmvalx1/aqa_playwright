import { CustomerBody } from "./createcustomer.type";

export interface LoginBody {
  username: string;
  password: string;
}

export interface IRequestOption {
  baseURL?: string;
  url: string;
  method: "post" | "get" | "put" | "delete" | "patch";
  data?: object;
  headers?: Record<string, string>;
}

export interface IResponse<T extends object> {
  status: number;
  headers: object;
  body: T;
}

export interface ICustomerFromResponse extends CustomerBody {
  _id: string;
  createdOn: string;
  username: string;
}

export interface ILoginResponse {
  User: ICustomerFromResponse;
  IsSuccess: boolean;
  ErrorMessage: string | null;
}

export interface ILogoutResponse {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}
