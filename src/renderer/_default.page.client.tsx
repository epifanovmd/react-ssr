import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { createRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import type { PageContextClient } from "./types";
import { createStore } from "../store";

const container = document.getElementById("page-view");
const root = createRoot(container!);

export const clientRouting = true;

export const render = async (pageContext: PageContextClient) => {
  const store = createStore();

  pageContext.i18n = i18n;

  if (pageContext.isHydration) {
    if (pageContext.hydrateData) {
      store.hydrate(pageContext.hydrateData);
    }

    await i18n.use(initReactI18next).init({
      resources: pageContext.i18nStore,
      lng: pageContext.locale,
    });
  } else {
    pageContext.exports.onBeforeRender?.({
      ...pageContext,
      store,
    });
  }
  root.render(<PageShell {...pageContext} store={store} />);
};
