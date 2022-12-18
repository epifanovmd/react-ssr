import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { useUserListVM } from "./UserList.vm";

interface IProps {}

export const UserList: FC<IProps> = observer(() => {
  const vm = useUserListVM();

  return (
    <div>
      {vm.list.map(item => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          key={item.id}
        >
          <div>{item.username}</div>
          <div>{item.email}</div>
        </div>
      ))}
    </div>
  );
});
