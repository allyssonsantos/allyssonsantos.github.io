self.addEventListener("push", function() {
  console.log("push received");

  var httpHeaders = new Headers();
  httpHeaders.append('pragma', 'no-cache');
  httpHeaders.append('cache-control', 'no-cache');

  var fetchInit = {
    method: 'GET',
    headers: httpHeaders,
  };

  fetch("http://localhost:4000/push/latest.json", fetchInit).then(function(res) {
    res.json().then(function(data) {

      //Show notification
      if ('Notification' in window) {
  			console.log ("aeee");
  		}

  		if (Notification.permission=="granted") {
  			self.registration.showNotification(notificationData.data.title, {
  				body: notificationData.data.body,
  				icon: '/imgs/icon.png'
  			});
  		} else {
  			Notification.requestPermission(function(permission) {
  				if (permission=='granted') {
  						self.registration.showNotification(notificationData.data.title, {
  							body: notificationData.data.body,
  							icon: '/imgs/icon.png'
  						});
  				}
  			});
  		}
  		self.addEventListener('notificationclick', function(e) {
  			if (clients.openWindow) {
  				clients.openWindow(notificationData.data.url);
  			}
  		});
    });
  });
});

// var files = [
//   "index.html",
//   "imgs/icon.png",
//   "imgs/svgs/arrows.svg",
//   "imgs/svgs/menu.svg",
//   "imgs/svgs/github.svg",
//   "imgs/svgs/linkedin.svg",
//   "imgs/svgs/facebook.svg",
//   "imgs/svgs/email.svg",
//   "imgs/teste.png",
//   "javascripts/jquery-git.min.js",
//   "javascripts/spa.js",
//   "javascripts/busca.js",
//   "css/main.css"
// ];
// // dev only
// if (typeof files == 'undefined') {
//   var files = [];
// } else {
//   files.push('./');
// }
//
// var CACHE_NAME = 'allyssonblog-v1';
//
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
//
// self.addEventListener('install', function(event){
//   console.log('[SW] Install');
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return Promise.all(
//       	files.map(function(file){
//       		return cache.add(file);
//       	})
//       );
//     })
//   );
// });
//
// self.addEventListener('fetch', function(event) {
//   console.log('[SW] fetch ' + event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(function(response){
//       return response || fetch(event.request.clone());
//     })
//   );
// });
//
// self.addEventListener('notificationclick', function(event) {
//   console.log('On notification click: ', event);
//   clients.openWindow('/');
// });
