var cacheName = 'js13kPWA-v6';
var appShellFiles = [
  'favicon/qwebmanifest.json'
];

self.addEventListener('install', function (e) {
	e.waitUntil(caches.open(cacheName).then(function (cache) { return cache.addAll(appShellFiles); }));
});

self.addEventListener('fetch', function (e) {
	e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); }));
});

self.addEventListener('activate', function (e) {
	e.waitUntil(
    caches.keys().then(function (keyList) {
    	return Promise.all(keyList.map(function (key) { if (cacheName.indexOf(key) === -1) return caches.delete(key); }));
    })
  );
});

// Retrieve the textual payload from event.data (a PushMessageData object). Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
//self.addEventListener('push', function (event) {
//	const payload = event.data ? event.data.text() : 'no payload';
//	event.waitUntil(																									// Keep the service worker alive until the notification is created.
//    self.registration.showNotification('Q', {												// Show a notification with title 'Q' and use the payload as the body.
//    	body: payload,
//    })
//  );
//});

self.addEventListener('push', function(event) {
	const title = 'Q Parent Portal';
	const options = {
		body: event.data.text(),
		icon: '/images/QMobile.jpg'
	};

	const notificationPromise = self.registration.showNotification(title, options);
	event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function (event) {
	console.log('[Service Worker] Notification click Received.');

	event.notification.close();
	event.waitUntil(clients.openWindow('https://developers.google.com/web/'));
});
