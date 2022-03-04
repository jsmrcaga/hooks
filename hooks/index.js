const LogSnag = require('./logsnag/api');
const { App } = require('@control/cloudflare-workers-router');

const router = require('./routing/router');

const app = new App(router);

app.post_process((agg, response, request, params, event) => {
	// default cors headers
	const cors = App.CORS();
	for(const [k, v] of Object.entries(cors)) {
		response.headers.set(k, v);
	}

	return response;
});

app.error(error => {
	// Send error to logsnag and respond with 500
	return LogSnag.log({
		project: LOGSNAG_PROJECT_NAME,
		channel: LOGSNAG_CHANNEL_NAME,
		event: error.message,
		description: error.stack,
		notify: true
	}).finally(() => {
		return new Response(null, {
			status: 500
		});
	});
});

app.listen();
