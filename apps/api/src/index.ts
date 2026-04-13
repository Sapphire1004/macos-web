import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

// ヘルスチェック
app.get("/", (c) => c.json({ status: "ok", service: "macos-web-api" }));

app.get("/health", (c) =>
  c.json({
    status: "ok",
    timestamp: Temporal.Now.instant().toString(),
  })
);

const port = Number(process.env.PORT) || 8080;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`🚀 API server running at http://localhost:${info.port}`);
});
