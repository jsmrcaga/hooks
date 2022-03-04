const { Router } = require('@control/cloudflare-workers-router');

// Routing
const logsnag_router = require('../logsnag/router');

const router = new Router();

router.any('/ping', (request) => {
	return 'pong';
});

router.use('/', logsnag_router);

module.exports = router;
