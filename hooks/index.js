const router = require('./routing/router');

addEventListener('fetch', event => {
	const { request } = event;
	event.respondWith(router.run(request));
});
