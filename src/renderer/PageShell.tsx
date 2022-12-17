import React, { StrictMode } from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import { Header } from "../components";
import { RootContext } from "../store";

export const PageShell = (pageContext: PageContext) => {
  const { Page, pageProps, store } = pageContext;

  return (
    <StrictMode>
      <RootContext.Provider value={store!}>
        <PageContextProvider value={{ ...pageContext }}>
          <Header />
          <Page {...pageProps} />
        </PageContextProvider>
      </RootContext.Provider>
    </StrictMode>
  );
};
