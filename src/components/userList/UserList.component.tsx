import React, { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Table, TableHeader, TableRow, TableRowCell } from "../table";
import { Button, Checkbox } from "../ui";
import { observer } from "mobx-react-lite";
import { IUserListVM } from "./UserList.vm";
import { useBooleanState } from "../../common";
import { IUser } from "../../service";

interface IProps {
  users: IUser[]
}

export const UserListComponent: FC<IProps> = observer(({ users }) => {
  const { list, onRefresh, setInitial } = useMemo(() => IUserListVM.getInstance(), []);
  const { t } = useTranslation();

  useEffect(() => {
    setInitial(users || []);
  }, []);

  const [open, onOpen, onClose] = useBooleanState();

  const _list = useMemo(
    () =>
      users.map(item => (
        <TableRow key={item.id}>
          <TableRowCell label={"username"}>{item.username}</TableRowCell>
          <TableRowCell label={"email"}>{item.email}</TableRowCell>
        </TableRow>
      )),
    [users],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableRowCell>{t("username")}</TableRowCell>
          <TableRowCell>{t("email")}</TableRowCell>
        </TableRow>
      </TableHeader>
      {_list}

      <Button onClick={onOpen}>Открыть модальное окно</Button>

      <Checkbox />
    </Table>
  );
});
