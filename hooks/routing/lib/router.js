const { RouterTree } = require('./tree');

const RouterProxy = {
	get: (obj, prop) => {
		if(prop in obj) {
			return obj[prop];
		}

		const method = prop.toLowerCase();
		const allowed_methods = ['any', 'get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
		if(!allowed_methods.includes(method)) {
			throw new TypeError(`Method ${method} unknown`);
		}

		return (path, callback) => {
			obj.register(method, path, callback);
		};
	}
};

class Router {
	constructor() {
		this.tree = new RouterTree();
		return new Proxy(this, RouterProxy);
	}

	respond(route) {
		const result = route();
		if(result instanceof Response) {
			return result;
		}

		if(typeof result === 'string') {
			return new Response(result, {
				status: 200,
				headers: {
					'Content-Type': 'text/plain'
				}
			});
		}

		// Any other object
		if(result instanceof Object) {
			return new Response(JSON.stringify(result), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	run(request) {
		const { callback, params } = this.route(request);
		try {
			return this.respond(() => callback(request, params));
		} catch(e) {
			// Sentry
			console.error(e);
			return new Response(null, { status: 500 });
		}
	}

	default(callback, method='any') {
		this.tree.default_route.update(new Route({
			methods: {
				[method]: callback
			}
		}));
	}

	route(request) {
		const url = new URL(request.url);

		let { pathname } = url;
		// Remove the last slash
		pathname = pathname.replace(/\/$/, '');

		let { method } = request;
		method = method.toLowerCase();

		const { callback, params } = this.tree.find(method, pathname);

		if(!callback) {
			// No match, 404
			return {
				callback: (request) => {
					return new Response(null, { status: 404 });
				},
				params: {}
			};
		}

		return { callback, params };
	}

	register(method, path, callback, strict=false) {
		this.tree.register(method, path, callback, strict);
	}

	use(path, router) {
		// Will merge this router's tree with the given router tree
		// This is quite simple, we just retrieve all routes from the router
		// and then build every "new" path with the path prefix.
		// Then we just register those to our tree
		this.tree.merge({
			prefix: path,
			tree: router.tree
		});
	}
}

module.exports = Router;
