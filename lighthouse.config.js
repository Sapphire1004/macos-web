/** @type {import('lighthouse').Config} */
export default {
  extends: "lighthouse:default",
  settings: {
    disableFullPageScreenshot: true,
    disableStorageReset: true,
    formFactor: "desktop",
    maxWaitForFcp: 120 * 1000,
    maxWaitForLoad: 180 * 1000,
    onlyAudits: [
      "first-contentful-paint",
      "speed-index",
      "largest-contentful-paint",
      "total-blocking-time",
      "cumulative-layout-shift",
      "interaction-to-next-paint",
    ],
    screenEmulation: { disabled: true },
    throttlingMethod: "devtools",
    throttling: {
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  },
};