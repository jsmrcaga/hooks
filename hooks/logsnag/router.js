const Router = require('../routing/lib/router');

const router = new Router();

router.any('/log/ping', (request) => {
	return 'pong';
});

module.exports = router;
