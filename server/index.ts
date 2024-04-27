import path from "node:path";

import compression from "compression";
import express from "express";
import { renderPage } from "vike/server";
import { createServer } from "vite";

const isProduction = process.env.NODE_ENV === "production";

async function startServer() {
  const app = express();

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

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    const pageContext = await renderPage({
      urlOriginal: url,
    });

    const { httpResponse } = pageContext;

    if (!httpResponse) {
      return next();
    }
    const { body, statusCode, headers, earlyHints } = httpResponse;

    if (res.writeEarlyHints) {
      res.writeEarlyHints({ link: earlyHints.map(e => e.earlyHintLink) });
    }
    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode);
    res.send(body);
  });

  const port = process.env.PORT || 3000;

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

startServer().then();
