import styles from "@force-dev/react-front/lib/esm/index.css?inline";
import React, { StrictMode, useCallback, useMemo } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { Container, Header } from "../components";
import { RootContext } from "../store";
import { TAppStore } from "../store/types";
import { AppTheme, AppThemes, darkTheme, lightTheme } from "../theme";
import type { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

const themes: Record<AppThemes, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

const GlobalStyles = createGlobalStyle`
  ${styles};
`;

export const PageShell = (pContext: PageContext) => {
  const [theme, setTheme] = React.useState<AppThemes>("light");

  const toggleTheme = useCallback(() => {
    setTheme(state => (state === "light" ? "dark" : "light"));
  }, []);

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

  const storeValue = useMemo<TAppStore>(
    () => ({
      ...store,
      theme: {
        theme,
        themes,
        toggleTheme,
      },
    }),
    [store, theme, toggleTheme],
  );

  const provideTheme = useMemo(() => {
    return themes[theme];
  }, [theme]);

  return (
    <StrictMode>
      <RootContext.Provider value={storeValue}>
        <PageContextProvider value={pContext}>
          <ThemeProvider theme={provideTheme}>
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
