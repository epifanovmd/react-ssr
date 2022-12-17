import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

interface IProps {}

export const UserList: FC<IProps> = observer(() => {
  const { data } = useStore("usersDataStore");

  return (
    <div>
      {data.map(item => (
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
