import React, { StrictMode } from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import { Header } from "../components";

export const PageShell = (pageContext: PageContext) => {
  const { Page, pageProps } = pageContext;

  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Header />
        <Page {...pageProps} />
      </PageContextProvider>
    </StrictMode>
  );
};
