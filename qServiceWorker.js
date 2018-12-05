var cacheName = 'js13kPWA-v1';
var appShellFiles = [
  'default1.Smart.htm',
  'favicon/qwebmanifest.json'
];

self.addEventListener('install', function (e) {
	console.log('[Service Worker] Install');
	
	e.waitUntil(
    caches.open(cacheName)
		      .then(function (cache) {
    							console.log('[Service Worker] Caching all');
    							return cache.addAll(appShellFiles);
								})
  )
});

self.addEventListener('fetch', function (e) {
	e.respondWith(
    caches.match(e.request).then(function (r) {
    	console.log('[Service Worker] Fetching resource: ' + e.request.url);
    	return r || fetch(e.request);
    })
  )
});

self.addEventListener('activate', function (e) {
	e.waitUntil(
    caches.keys().then(function (keyList) {
    	return Promise.all(keyList.map(function (key) {
    		if (cacheName.indexOf(key) === -1) {
    			return caches.delete(key);
    		}
    	}));
    })
  )
});
