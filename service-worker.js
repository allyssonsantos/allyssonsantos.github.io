this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                './abertura-do-starwars-em-css.html',
                './arrow-functions.html',
                './index.html',
                './javascript-basics-const.html',
                './javascript-basics-escopos.html',
                './javascript-basics-hoisting.html',
                './javascript-basics-let.html',
                './seletores-avancados-do-css.html',
                './starwars.mp3',
                './transform-css3.html',
                './css/main.css',
                './img/allysson.jpg',
                './img/arrows.jpg',
                './img/const.png',
                './img/exemplo2.png',
                './img/exemplo-logo.png',
                './img/exemplo.png',
                './img/icon.png',
                './img/javascript2.jpg',
                './img/javascript.png',
                './img/let.png',
                './img/seletores-css.jpg',
                './img/starwars.svg',
                './img/transforms-css3.jpg',
                './javascripts/spa.js',
                './posts/index.html',
                './svgs/arrows.svg',
                './svgs/email.svg',
                './svgs/facebook.svg',
                './svgs/github.svg',
                './svgs/icones.svg',
                './svgs/linkedin.svg',
                './svgs/menu.svg'
            ]);
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).then(function(resp) {
                return caches.open('v1').then(function(cache) {
                    cache.put(event.request, resp.clone());
                });
                return response;
            });
        }).catch(function() {
            return 'No internet!';
        })
    );
});
