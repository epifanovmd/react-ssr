import { apiService } from "../../api";
import { IUserResponse } from "./Users.types";
// import { iocDecorator } from "../../common/ioc";

// export const IUsersService = iocDecorator<UsersService>();

// @IUsersService()
export class UsersService {
  getUsers() {
    return apiService.get<IUserResponse>("users");
  }
}
