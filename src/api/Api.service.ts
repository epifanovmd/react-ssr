import {
  ApiService,
  IApiService as IIIApiService,
  iocDecorator,
} from "@force-dev/utils";

import { ITokenService } from "~@service/token";

const env = import.meta.env;
const isDev = env.MODE === "development";

export const BASE_URL = isDev && !env.SSR ? "api/" : env.VITE_BASE_URL;
export const SOCKET_BASE_URL = import.meta.env.VITE_SOCKET_BASE_URL;

export interface IApiService extends IIIApiService {}
export const IApiService = iocDecorator<ApiService1>();

@IApiService({ inSingleton: true })
class ApiService1 extends ApiService {
  constructor(@ITokenService() private _tokenService: ITokenService) {
    super(
      {
        timeout: 2 * 60 * 1000,
        withCredentials: true,
        baseURL: BASE_URL,
      },
      error => error,
    );

    this.instance.interceptors.request.use(async request => {
      const headers = request.headers;
      const token = this._tokenService.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return request;
    });
  }
}
