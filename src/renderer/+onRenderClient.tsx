import React from "react";
import { createRoot } from "react-dom/client";

import { createStore } from "../store";
import { getTitle } from "./getTitle";
import { PageShell } from "./PageShell";
import { PageContext } from "./types";

const container = document.getElementById("root");
const root = createRoot(container!);

export const onRenderClient = async (pageContext: PageContext) => {
  const store = createStore();
  const title = getTitle(pageContext);

  if (title !== null) {
    document.title = title;
  }

  if (pageContext.isHydration) {
    if (pageContext.hydrateData) {
      store.hydrate(pageContext.hydrateData);
    }
  }

  root.render(<PageShell {...pageContext} store={store} />);
};
