// import styles from "@force-dev/react-front/lib/esm/index.css";
import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
`;

export const Page = () => {
  useEffect(() => {
    console.log("useEffect Page");
  }, []);

  return (
    <div>
      <GlobalStyle />
      About page
    </div>
  );
};
