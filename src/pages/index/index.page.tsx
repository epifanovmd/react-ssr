import React from "react";
import { UserList } from "../../components";
import { DocumentProps } from "../../renderer/types";
import { beforeRender } from "../../renderer/beforeRender";

export const documentProps: DocumentProps = {
  title: "Главная страница | список пользователей",
};

export const onBeforeRender = beforeRender(async ({ store }) => {
  await store.usersDataStore.onRefresh();
});

export const Page = () => <UserList />;
