import { camelize } from "@force-dev/utils";
import React from "react";
import styled from "styled-components";

export const Page = () => (
  <div>
    <Text>123</Text>
    <input placeholder={camelize("placeholder")} />
  </div>
);

const Text = styled.div`
  color: ${({ theme }) => theme.color.text};
`;
