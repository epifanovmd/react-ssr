import { makeAutoObservable } from "mobx";

import { ITokenService } from "./Token.types";

@ITokenService({ inSingleton: true })
export class TokenService implements ITokenService {
  public token: string = "";
  public refreshToken: string = "";

  constructor() {
    this.restoreRefreshToken().then();

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.token = accessToken;

    if (refreshToken) {
      if (!import.meta.env.SSR) {
        localStorage.setItem("refresh_token", refreshToken);
      }
    } else {
      this.clear();
    }
    this.refreshToken = refreshToken;
  }

  async restoreRefreshToken() {
    const token = await new Promise<string | null>(resolve =>
      resolve(import.meta.env.SSR ? "" : localStorage.getItem("refresh_token")),
    ).then(res => res ?? "");

    this.setTokens(this.token, token);

    return token;
  }

  clear() {
    this.token = "";

    if (!import.meta.env.SSR) {
      localStorage.removeItem("refresh_token");
    }

    this.refreshToken = "";
  }
}
