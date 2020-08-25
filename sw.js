/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-7ad2c0145cd49a53060a.js"
  },
  {
    "url": "framework-85aff51d15c28c7fbe5f.js"
  },
  {
    "url": "f0e45107-ff2c7ac7fae000cceb4b.js"
  },
  {
    "url": "app-076c0a62f91a23fd0340.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-02e8e9a638a311206d60.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "9159f76a6675ba4806a06bfc244357db"
  },
  {
    "url": "google-fonts/s/merriweather/v21/u-440qyriQwlOrhSvowK_l5-fCZM.woff2",
    "revision": "8276fdb72ae8f4714d4e6eba704cc39f"
  },
  {
    "url": "google-fonts/s/merriweather/v21/u-4l0qyriQwlOrhSvowK_l5-eR71Wvf4jvw.woff2",
    "revision": "1ef5edaaa20ae53ea50399884c5e48c6"
  },
  {
    "url": "google-fonts/s/merriweather/v21/u-4l0qyriQwlOrhSvowK_l5-eR7NWPf4jvw.woff2",
    "revision": "e1b4d2aaa78e12ad84aaf8a56321e4c2"
  },
  {
    "url": "google-fonts/s/merriweather/v21/u-4l0qyriQwlOrhSvowK_l5-eR7lXff4jvw.woff2",
    "revision": "8fe52a48089d6ebe46db0b8e7cc66263"
  },
  {
    "url": "google-fonts/s/merriweather/v21/u-4m0qyriQwlOrhSvowK_l5-eRZOf-I.woff2",
    "revision": "3a9be9ea9f7aa4af6de7307df21d9fc0"
  },
  {
    "url": "google-fonts/s/merriweather/v21/u-4n0qyriQwlOrhSvowK_l521wRZWMf6.woff2",
    "revision": "b1158cfcd4aacb9d8fb61625e37af46a"
  },
  {
    "url": "google-fonts/s/merriweather/v21/u-4n0qyriQwlOrhSvowK_l52_wFZWMf6.woff2",
    "revision": "7528fb70e8a4a82c7305e72ff43ac25f"
  },
  {
    "url": "google-fonts/s/merriweather/v21/u-4n0qyriQwlOrhSvowK_l52xwNZWMf6.woff2",
    "revision": "fa534be7ffa380e39a7f6e03bf9a5e03"
  },
  {
    "url": "google-fonts/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2",
    "revision": "020c97dc8e0463259c2f9df929bb0c69"
  },
  {
    "url": "google-fonts/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2",
    "revision": "2735a3a69b509faf3577afd25bdf552e"
  },
  {
    "url": "google-fonts/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfBBc4.woff2",
    "revision": "9b3766ef4a402ad3fdeef7501a456512"
  },
  {
    "url": "google-fonts/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2",
    "revision": "479970ffb74f2117317f9d24d9e317fe"
  },
  {
    "url": "polyfill-4f03382584f782e0baab.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "3883c0a2119b9408f71e775ce4bc9bb5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, workbox.strategies.networkFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, workbox.strategies.staleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */

importScripts(`idb-keyval-iife.min.js`)

const { NavigationRoute } = workbox.routing

const navigationRoute = new NavigationRoute(async ({ event }) => {
  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-076c0a62f91a23fd0340.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  return await caches.match(offlineShell)
})

workbox.routing.registerRoute(navigationRoute)

const messageApi = {
  setPathResources(event, { path, resources }) {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources(event) {
    event.waitUntil(idbKeyval.clear())
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi } = event.data
  if (gatsbyApi) messageApi[gatsbyApi](event, event.data)
})
