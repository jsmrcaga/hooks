const { Router } = require('@control/cloudflare-workers-router');

const router = new Router();

router.any('/log/ping', (request) => {
	return 'pong';
});

router.post('/log/:project', (request, params) => {
	return {
		project: params.project
	};
});

module.exports = router;
