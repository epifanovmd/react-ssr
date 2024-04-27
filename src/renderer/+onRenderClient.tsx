import React from "react";
import { createRoot } from "react-dom/client";

import { createStore } from "../store";
import { PageShell } from "./PageShell";
import { PageContext } from "./types";

const container = document.getElementById("root");
const root = createRoot(container!);

export const clientRouting = true;

export const onRenderClient = (pageContext: PageContext) => {
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
