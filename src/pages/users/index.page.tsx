import React from "react";

import { UserList } from "../../components";
import { beforeRender } from "../../renderer/beforeRender";
import { DocumentProps } from "../../renderer/types";

export const documentProps: DocumentProps = {
  title: "Список пользователей",
};

export const onBeforeRender = beforeRender(async ({ store }) => {
  await store.usersDataStore.onRefresh();
});

export const Page = () => <UserList />;
