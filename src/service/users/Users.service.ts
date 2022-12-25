import { iocDecorator } from "@force-dev/utils";

import { apiService } from "../../api";
import { IUserResponse } from "./Users.types";

export const IUsersService = iocDecorator<UsersService>();

@IUsersService()
export class UsersService {
  getUsers() {
    return apiService.get<IUserResponse>("users");
  }
}
