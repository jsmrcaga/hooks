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

app.listen();
