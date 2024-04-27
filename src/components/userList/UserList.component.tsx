import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";

import { useUserListVM } from "./UserList.vm";

interface IProps {}

export const UserList: FC<IProps> = observer(() => {
  const vm = useUserListVM();

  useEffect(() => {
    vm.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
