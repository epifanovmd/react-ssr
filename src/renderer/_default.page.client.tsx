import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { createRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import type { PageContext, PageContextClient } from "./types";
import { createStore } from "../store";

const container = document.getElementById("page-view");
const root = createRoot(container!);

export const clientRouting = true;

export const render = async (pageContext: PageContextClient) => {
  const { locale, hydrateData, i18nStore } = pageContext;

  const store = createStore();

  pageContext.i18n = i18n;

  if (pageContext.isHydration) {
    if (hydrateData) {
      store.hydrate(hydrateData);
    }

    await i18n.use(initReactI18next).init({
      resources: i18nStore,
      lng: locale,
    });
  }
  root.render(<PageShell {...pageContext} store={store} />);
};
