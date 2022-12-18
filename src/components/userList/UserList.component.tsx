import React, { FC, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { IUserListVM } from "./UserList.vm";

interface IProps {}

export const UserList: FC<IProps> = observer(() => {
  const { list } = useMemo(() => IUserListVM.getInstance(), []);

  return (
    <div>
      {list.map(item => (
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
