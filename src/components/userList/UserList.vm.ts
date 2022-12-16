import { makeAutoObservable } from "mobx";
import { IUsersDataStore, UsersDataStore } from "../../store";
import { iocDecorator } from "../../common/ioc";
import { IUser } from "../../service";

export const IUserListVM = iocDecorator<UserListVM>();

@IUserListVM()
class UserListVM {
  private search: string = "";

  constructor(@IUsersDataStore() private _usersDataStore: UsersDataStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get error() {
    return this._usersDataStore.error;
  }

  get name() {
    return "123";
  }

  get list() {
    return (this._usersDataStore.holder.d || []).filter(
      item =>
        item.name.includes(this.search || "") ||
        item.email.includes(this.search || "") ||
        item.website.includes(this.search || "") ||
        item.username.includes(this.search || "") ||
        item.phone.includes(this.search || ""),
    );
  }

  get loading() {
    return this._usersDataStore.loading;
  }

  get loaded() {
    return this._usersDataStore.loaded;
  }

  onSearch(search: string) {
    this.search = search;
  }

  onRefresh() {
    return this._usersDataStore.onRefresh();
  }

  setInitial(users: IUser[]) {
    return this._usersDataStore.setInitial(users);
  }
}
