import Backend from "i18next-fs-backend";
import compression from "compression";
import express from "express";
import i18n from "i18next";
import path from "node:path";
import { PageContextServer } from "../src/renderer/types";
import { createServer } from "vite";
import { handle, LanguageDetector } from "i18next-http-middleware";
import { parse } from "query-string";
import { readdirSync } from "node:fs";
import { renderPage } from "vite-plugin-ssr";

const isProduction = process.env.NODE_ENV === "production";

async function startServer() {
  const app = express();

  await i18n
    .use(Backend)
    .use(new LanguageDetector())
    .init({
      saveMissing: false,
      interpolation: {
        escapeValue: false,
        formatSeparator: ",",
      },
      detection: {
        order: ["customDetector"],
      },
      load: "languageOnly",
      backend: {
        loadPath: path.resolve("locales/{{lng}}/translation.json"),
      },
      ns: readdirSync(path.resolve("locales/en")).map(name =>
        name.replace(".json", ""),
      ),
    });

  app.use(handle(i18n));

  app.use(compression());

  if (isProduction) {
    app.use(express.static(path.resolve("dist/client")));
  } else {
    const viteDevServer = await createServer({
      server: { middlewareMode: true },
      mode: "development",
    });

    app.use(viteDevServer.middlewares);
  }

  if (isProduction) {
    // some code ...
  }

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    const query = req.originalUrl.split("?")[1];

    const i18nStore = {
      [req.i18n.language]: req.i18n.store.data[req.i18n.language],
    };

    const pageContextInit: Partial<PageContextServer> = {
      locale: req.i18n.language,
      query: parse(query),
      urlOriginal: url,
      i18nStore,
      i18n: req.i18n,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) {
      return next();
    }
    const { body, statusCode, contentType, earlyHints } = httpResponse;

    if (res.writeEarlyHints) {
      res.writeEarlyHints({ link: earlyHints.map(e => e.earlyHintLink) });
    }
    res.status(statusCode).type(contentType).send(body);
  });

  if (isProduction) {
    // some code ...
  }

  const port = process.env.PORT || 3000;

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

startServer().then();
