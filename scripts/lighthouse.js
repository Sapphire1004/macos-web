import { execSync, spawn } from "child_process";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import config from "../lighthouse.config.js";

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

// 테스트할 페이지 목록 - 여기에 추가하면 됨
const PAGES = [
  { name: "Home", path: "/" },
];

// 1. Build
console.log("Building...\n");
execSync("npx vite build", { stdio: "inherit" });

// 2. Start preview server
const server = spawn("npx", ["vite", "preview", "--port", String(PORT)], {
  shell: true,
  stdio: "pipe",
});

await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error("Server timeout")), 30000);
  const onData = (data) => {
    if (data.toString().includes(String(PORT))) { clearTimeout(timeout); resolve(); }
  };
  server.stdout.on("data", onData);
  server.stderr.on("data", onData);
  server.on("error", reject);
});

console.log(`\nServer ready | CPU: 4x slowdown | Network: none\n`);

// 3. Run Lighthouse per page
const chrome = await launch({
  chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu", "--window-size=1920,1080"],
});

const fs = await import("fs");
const results = [];

for (const page of PAGES) {
  const url = `${BASE}${page.path}`;
  console.log(`Testing: ${page.name} (${url})`);

  const result = await lighthouse(url, { port: chrome.port, output: ["html", "json"], logLevel: "error" }, config);
  if (!result) { console.error(`  FAILED\n`); continue; }

  const { lhr } = result;
  const get = (key) => lhr.audits[key]?.displayValue || "-";

  results.push({
    name: page.name,
    score: lhr.categories.performance.score !== null ? Math.round(lhr.categories.performance.score * 100) : "N/A",
    fcp: get("first-contentful-paint"),
    si: get("speed-index"),
    lcp: get("largest-contentful-paint"),
    tbt: get("total-blocking-time"),
    cls: get("cumulative-layout-shift"),
  });

  // Save individual reports
  const slug = page.name.toLowerCase().replace(/\s+/g, "-");
  fs.writeFileSync(`lighthouse-${slug}.html`, result.report[0]);
  fs.writeFileSync(`lighthouse-${slug}.json`, result.report[1]);
}

try { await chrome.kill(); } catch {}
server.kill();

// 4. Print table
console.log(`\n${"=".repeat(75)}`);
console.log(`  ${"Page".padEnd(12)} ${"Score".padStart(5)}  ${"FCP".padStart(8)}  ${"SI".padStart(8)}  ${"LCP".padStart(8)}  ${"TBT".padStart(8)}  ${"CLS".padStart(8)}`);
console.log(`${"-".repeat(75)}`);
for (const r of results) {
  console.log(`  ${r.name.padEnd(12)} ${String(r.score).padStart(5)}  ${r.fcp.padStart(8)}  ${r.si.padStart(8)}  ${r.lcp.padStart(8)}  ${r.tbt.padStart(8)}  ${r.cls.padStart(8)}`);
}
console.log(`${"=".repeat(75)}\n`);