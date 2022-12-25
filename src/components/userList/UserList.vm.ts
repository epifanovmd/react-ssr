import { iocDecorator, iocHook } from "@force-dev/utils";
import { makeAutoObservable } from "mobx";

import { AppStore, IAppStore } from "../../store";

export const IUserListVM = iocDecorator<UserListVM>();
export const useUserListVM = iocHook(IUserListVM);

@IUserListVM()
class UserListVM {
  private search: string = "";

  constructor(@IAppStore() private _appStore: AppStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get name() {
    return "Страница пользователя";
  }

  get list() {
    return this._appStore.usersDataStore.data;
  }
}
