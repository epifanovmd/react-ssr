import { Switch } from "@force-dev/react-front";
import React, { FC, memo } from "react";
import styled from "styled-components";

import { useTheme } from "../../theme";

export const Header: FC = memo(() => {
  const { toggleTheme, theme } = useTheme();

  return (
    <HeaderWrap>
      <Switch checked={theme === "light"} onChange={toggleTheme} />
      <menu>
        <Items>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/posts">Posts</a>
          </li>
          <li>
            <a href="/about/33?search=some">About id = 33, search = some</a>
          </li>
        </Items>
      </menu>
    </HeaderWrap>
  );
});

const HeaderWrap = styled.div`
  li {
    list-style-type: none;

    &:not(:first-of-type):not(:last-of-type) {
      margin: 0 5px 0 5px;
    }
  }
`;

const Items = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;
