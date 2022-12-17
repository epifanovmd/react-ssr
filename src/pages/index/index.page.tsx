import React from "react";
import { UserList } from "../../components";
import { PageContext } from "../../renderer/types";

export const onBeforeRender = async ({ store }: PageContext) => {
  await store?.usersDataStore.onRefresh();

  return store;
};

export const Page = () => <UserList />;
