import * as compression from "compression";
import * as express from "express";
import * as next from "next";
import { join } from "path";
import { format, parse } from "url";

import env from "./env";
import { nextI18NextMiddleware } from "./i18n";

const rootStaticFiles = [
  "/browserconfig.xml",
  "/favicon.ico",
  "/manifest.json",
  "/robots.txt",
];
const app = next({
  dir: __dirname,
  conf: env.NODE_ENV === "production" ? { distDir: "../.next" } : undefined,
  dev: env.NODE_ENV !== "production",
});
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  nextI18NextMiddleware(app, server);

  // server.get("*", (req, res) => handle(req, res));

  server.get("*", (req, res) => {
    const { pathname = "", query } = parse(req.url, true);

    if (rootStaticFiles.indexOf(pathname) > -1) {
      const path = join(__dirname, "static", pathname);
      return app.serveStatic(req, res, path);
    }

    if (
      pathname.length > 1 &&
      pathname.slice(-1) === "/" &&
      pathname.indexOf("/_next/") !== 0
    ) {
      return res.redirect(
        format({
          pathname: pathname.slice(0, -1),
          query,
        }),
      );
    }
    (req as any).gaTrackingId = env.GA_TRACKING_ID;
    (req as any).graphqlUri = env.GRAPHQL_URI;
    (req as any).nodeEnv = env.NODE_ENV;
    return handle(req, res);
  });

  server.use(compression());
  await server.listen(env.PORT);
  console.log(`> Ready on port ${env.PORT}`);
})();
