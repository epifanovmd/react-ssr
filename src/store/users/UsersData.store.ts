import { iocDecorator } from "@force-dev/utils";
import { makeAutoObservable } from "mobx";

import { CollectionHolder } from "../../common";
import { IUser, IUsersService, UsersService } from "../../service";
import { PrefetchStore } from "../types";

export const IUsersDataStore = iocDecorator<UsersDataStore>();

@IUsersDataStore()
export class UsersDataStore implements PrefetchStore<IUser[]> {
  public holder: CollectionHolder<IUser> = new CollectionHolder([]);

  constructor(@IUsersService() private _usersService: UsersService) {
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
