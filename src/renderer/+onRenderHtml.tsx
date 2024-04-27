import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { dangerouslySkipEscape, escapeInject } from "vike/server";

import { createStore } from "../store";
import { PageShell } from "./PageShell";
import type { PageContextServer } from "./types";

export const onRenderHtml = async (pageContext: PageContextServer) => {
  const store = createStore();
  const sheet = new ServerStyleSheet();

  await pageContext.exports.onBeforeRender?.({
    ...pageContext,
    store,
  });

  const pageHtml = ReactDOMServer.renderToString(
    sheet.collectStyles(<PageShell {...pageContext} store={store} />),
  );

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc =
    (documentProps && documentProps.description) || "App using Vite + vike";
  const styles = sheet.getStyleTags();

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        ${dangerouslySkipEscape(styles)}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      hydrateData: store.dehydrate() || {},
    },
  };
};
