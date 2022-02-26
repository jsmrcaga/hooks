const Router = require('./lib/router');

const router = new Router();

router.any('/ping', (request) => {
	return 'pong';
});

module.exports = router;
