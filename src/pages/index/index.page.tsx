import React from "react";
import { IUserListVM, UserListComponent } from "../../components";

export const onBeforeRender = async () => {
  const {
    list: users,
    onRefresh
  } = IUserListVM.getInstance();

  await onRefresh();

  return {
    pageContext: {
      pageProps: { users },
    },
  };
};

export const Page = ({ users }: any) => {
  return (
    <UserListComponent users={users} />
  );
};
