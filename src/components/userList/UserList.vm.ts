import { makeAutoObservable } from "mobx";
import { UsersDataStore } from "../../store/users";

class UserListVM {
  _usersDataStore = new UsersDataStore();
  private search: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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

  onSearch(search: string) {
    this.search = search;
  }

  onRefresh() {
    return this._usersDataStore.onRefresh();
  }
}
