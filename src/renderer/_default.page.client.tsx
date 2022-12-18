import React from "react";
import type { PageContextClient } from "./types";
import { PageShell } from "./PageShell";
import { createRoot } from "react-dom/client";
import { createStore } from "../store";

const container = document.getElementById("page-view");
const root = createRoot(container!);

export const clientRouting = true;

export const render = (pageContext: PageContextClient) => {
  const store = createStore();

  if (pageContext.isHydration) {
    if (pageContext.hydrateData) {
      store.hydrate(pageContext.hydrateData);
    }
  } else {
    pageContext.exports.onBeforeRender?.({
      ...pageContext,
      store,
    });
  }
  root.render(<PageShell {...pageContext} store={store} />);
};
