import { join } from "https://deno.land/std/path/mod.ts";
import { Application, send } from "https://deno.land/x/oak@v10.5.1/mod.ts";

import router from "./router.ts";

const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
  // Execute downstram middleware
  await next();
  const time = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhiteList = [
    "/index.html",
    "/javascripts/script.js",
    "/stylesheets/styles.css",
    "/images/favicon.png",
  ];

  if (fileWhiteList.includes(filePath)) {
    await send(ctx, filePath, { root: join(Deno.cwd(), "public") });
  }
});

if (import.meta.main) {
  await app.listen({ port: PORT });
}
