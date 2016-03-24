// var files = [
//   "index.html",
//   "javascripts/jquery-git.min.js",
//   "worker.js",
//   "javascripts/spa.js",
//   "javascripts/busca.js",
//   "imgs/icon.png",
//   "css/main.css",
//   "imgs/teste.png",
//   "imgs/allysson.jpg",
//   "html5/2016/02/02/teste-post-77777.html",
//   "imgs/svgs/menu.svg",
//   "imgs/svgs/arrows.svg",
//   "imgs/svgs/github.svg",
//   "imgs/svgs/linkedin.svg",
//   "imgs/svgs/facebook.svg",
//   "imgs/svgs/email.svg",
//   "html5/2016/02/02/teste-post-55555.html",
//   "css/2016/02/01/post-de-teste.html"
// ];
// // dev only
// if (typeof files == 'undefined') {
//   var files = [];
// } else {
//   files.push('./');
// }

// var CACHE_NAME = 'allysson';

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message', event);

  var title = 'Testando Push';

  event.waitUntil(
    self.registration.showNotification(title, {
      'body': 'Descrição da bagaça',
      'icon': 'imgs/icon.png'
    }));
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag', event.notification.tag);
  event.notification.close();
  var url = 'https://youtu.be/gYMkEMCHtJ4';
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      console.log('WindowClients', windowClients);
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('WindowClient', client);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// self.addEventListener('activate', function(event) {
//   console.log('[SW] Activate');
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (CACHE_NAME.indexOf(cacheName) == -1) {
//             console.log('[SW] Delete cache:', cacheName);
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

// self.addEventListener('fetch', function(event) {
//   console.log('[SW] fetch ' + event.request.url)
//   event.respondWith(
//     caches.match(event.request).then(function(response){
//       return response || fetch(event.request.clone());
//     })
//   );
// });
