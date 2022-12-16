import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { createRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import type { PageContextClient } from "./types";

if (import.meta.env.PROD) {
  Sentry.init({
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const container = document.getElementById("page-view");
const root = createRoot(container!);

export const clientRouting = true;

export const render = async (pageContext: PageContextClient) => {
  const { locale, exports, i18nStore } = pageContext;

  pageContext.i18n = i18n;


  if (pageContext.isHydration) {
    await i18n
      .use(initReactI18next)
      .init({ resources: i18nStore, lng: locale });
  }
  root.render(<PageShell {...pageContext} />);
};
