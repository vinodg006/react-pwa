console.warn("SW from public");

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-app").then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "static/js/vendors~main.chunk.js",
        "./index.html",
        "/",
        "/users",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
      event.waitUntil(
        self.registration.showNotification("New Notification", {
          body: "Internet is not working!",
        })
      );
    }
    event.respondWith(
      caches.match(event.request).then(function (res) {
        if (res) {
          return res;
        }
        let reqUrl = event.request.clone();
        return fetch(reqUrl);
      })
    );
  }
});
