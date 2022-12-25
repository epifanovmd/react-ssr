import { Input } from "@force-dev/react-front";
import { camelize } from "@force-dev/utils";
import React from "react";
import styled from "styled-components";

import { beforeRender } from "../../renderer/beforeRender";
import { DocumentProps } from "../../renderer/types";

export const documentProps: DocumentProps = {
  title: "Главная страница",
};

export const onBeforeRender = beforeRender(async ({ store }) => {
  await store.usersDataStore.onRefresh();
});

export const Page = () => (
  <div>
    <Text>123</Text>
    <Input placeholder={camelize("placeholder")} />
  </div>
);

const Text = styled.div`
  color: ${({ theme }) => theme.colors.white};
`;
