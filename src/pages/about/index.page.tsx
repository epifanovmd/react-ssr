// import styles from "@force-dev/react-front/lib/esm/index.css";
import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
`;

export const Page = () => (
  <div>
    <GlobalStyle />
    About page
  </div>
);
