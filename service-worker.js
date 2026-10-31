// TAXPERTIZE cache refresh: 2026-v20261031b-31

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
