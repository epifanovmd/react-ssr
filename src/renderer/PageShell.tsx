import React, { StrictMode } from "react";
import { createGlobalStyle } from "styled-components";

import { Container, Header } from "~@components";
import { RootContext } from "~@store";
import { ThemeProvider } from "~@theme";

import { initLocalization } from "../localization";
import type { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

initLocalization({}).finally();

const GlobalStyles = createGlobalStyle`
`;

export const PageShell = (pContext: PageContext) => {
  const { Page, pageProps, store } = pContext;

  return (
    <StrictMode>
      <RootContext.Provider value={store}>
        <PageContextProvider value={pContext}>
          <ThemeProvider>
            <GlobalStyles />
            <Container>
              <Header />
              <Page {...pageProps} />
            </Container>
          </ThemeProvider>
        </PageContextProvider>
      </RootContext.Provider>
    </StrictMode>
  );
};
