import styles from "@force-dev/react-front/lib/esm/index.css?inline";
import React, { StrictMode } from "react";
import { createGlobalStyle } from "styled-components";

import { Container, Header } from "../components";
import { initLocalization } from "../localization";
import { RootContext } from "../store";
import { ThemeProvider } from "../theme";
import type { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

initLocalization({}).finally();

const GlobalStyles = createGlobalStyle`
  ${styles}
`;

export const PageShell = (pContext: PageContext) => {
  const {
    Page,
    pageProps,
    hydrateData,
    exports,
    exportsAll,
    pageExports,
    store,
    ...rest
  } = pContext;

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
