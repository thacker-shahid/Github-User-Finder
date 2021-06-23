self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open("airhorner")
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(["/"]);
      })
  );
});

self.addEventListener('fetch', function(event) {

  console.log(event.request.url)

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});