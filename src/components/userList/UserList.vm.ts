import { makeAutoObservable } from "mobx";
import { IUsersDataStore, UsersDataStore } from "../../store/users";
import { iocDecorator } from "../../common/ioc";
import { AppStore, IAppStore } from "../../store";

export const IUserListVM = iocDecorator<UserListVM>();

@IUserListVM()
class UserListVM {
  private search: string = "";

  constructor(@IAppStore() private _appStore: AppStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get name() {
    return "123";
  }

  get list() {
    return (this._appStore.usersDataStore.data || []).filter(
      item =>
        item.name.includes(this.search || "") ||
        item.email.includes(this.search || "") ||
        item.website.includes(this.search || "") ||
        item.username.includes(this.search || "") ||
        item.phone.includes(this.search || ""),
    );
  }

  onSearch(search: string) {
    this.search = search;
  }

  onRefresh() {
    return this._appStore.usersDataStore.onRefresh();
  }
}
