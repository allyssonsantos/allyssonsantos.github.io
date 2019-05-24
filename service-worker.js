const version = 'v18::allysson';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        './index.html',
        './abertura-do-starwars-em-css.html',
        './arrow-functions.html',
        './seletores-avancados-do-css.html',
        './transform-css3.html',
        './blog/index.html',
        './assets/css/styles.css',
        './assets/images/allysson.jpg',
        './assets/images/arrows.jpg',
        './assets/images/arvore-cssom.png',
        './assets/images/arvore-de-renderizacao.png',
        './assets/images/construcao-cssom.png',
        './assets/images/crp.png',
        './assets/images/cssom-timeline.png',
        './assets/images/exemplo2.png',
        './assets/images/exemplo-logo.png',
        './assets/images/exemplo.png',
        './assets/images/icon.png',
        './assets/images/layout-viewport.png',
        './assets/images/paint-timeline.png',
        './assets/images/processo-crp.png',
        './assets/images/seletores-css.jpg',
        './assets/images/starwars.svg',
        './assets/images/transforms-css3.jpg',
        './assets/images/timeline.png',
        './assets/js/backButton.js',
        './assets/sounds/starwars.mp3',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return cacheName !== version;
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .open(version)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
