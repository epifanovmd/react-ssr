import React, { FC, memo } from "react";
import styled from "styled-components";

export const Header: FC = memo(() => (
  <HeaderWrap>
    <menu>
      <Items>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/about/33?search=some">About id = 33, search = some</a>
        </li>
      </Items>
    </menu>
  </HeaderWrap>
));

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
