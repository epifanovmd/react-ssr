import { makeAutoObservable } from "mobx";
import { IUser, UsersService } from "../../service";
import { CollectionHolder } from "../../common";
import { PrefetchStore } from "../types";

export class UsersDataStore implements PrefetchStore<IUser[]> {
  public holder: CollectionHolder<IUser> = new CollectionHolder([]);
  private _usersService = new UsersService();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get data() {
    return this.holder.d || [];
  }

  async onRefresh() {
    this.holder.setPullToRefreshing();
    const res = await this._usersService.getUsers();

    if (res.error) {
      this.holder.setError({ msg: res.error.toString() });
    } else if (res.data) {
      this.holder.setData(res.data);

      return res.data;
    }

    return [];
  }

  hydrate = (users: IUser[]) => {
    this.holder.setData(users);
  };
  dehydrate = () => this.data;
}
