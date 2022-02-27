// Mocks for request & Response
class Request {
	constructor({ method='get', body, url }) {
		this.url = url;
		this.body = body;
		this.method = method;
	}

	json() {
		return Promise.resolve(this.body);
	}
}

class Response {
	constructor(body, { headers, method }) {
		this.body = body;
		this.headers = headers;
		this.method = method;
	}
}

module.exports = {
	Response,
	Request
};
