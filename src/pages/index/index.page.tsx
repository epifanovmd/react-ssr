import React from "react";
import { UserList } from "../../components";
import { DocumentProps, PageContext } from "../../renderer/types";
import { beforeRender } from "../../renderer/beforeRender";

export const documentProps: DocumentProps = {
  title: "Главная страница | список пользователей",
};

export const onBeforeRender = beforeRender(async ({ store }: PageContext) => {
  await store.usersDataStore.onRefresh();
});

export const Page = () => <UserList />;
