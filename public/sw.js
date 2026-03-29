const CACHE_NAME = "kurwacoach-v2";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (request.url.includes("/api/") || request.url.includes("supabase")) return;
  event.respondWith(
    fetch(request).then((response) => {
      if (response.ok) { const clone = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(request, clone)); }
      return response;
    }).catch(() => caches.match(request).then((cached) => cached || new Response("Offline", { status: 503 })))
  );
});
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title || "KurwaCoach", {
    body: data.body || "Time to practice!", icon: data.icon || "/icons/icon-192.png",
    badge: "/icons/icon-192.png", data: { url: data.url || "/learn" }, vibrate: [200, 100, 200],
  }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/learn";
  event.waitUntil(self.clients.matchAll({ type: "window" }).then((clients) => {
    for (const client of clients) { if ("focus" in client) return client.focus(); }
    return self.clients.openWindow(url);
  }));
});
