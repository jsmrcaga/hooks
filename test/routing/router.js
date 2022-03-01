const { expect } = require('chai');
const { Request, Response } = require('../utils/http');
const router = require('../../hooks/routing/router');

describe('App routes', () => {
	it('Should get the ping route', () => {
		const request = new Request({
			url: 'https://test.com/ping'
		});

		const { callback, params } = router.route(request);
		const result = callback(request, params);

		expect(result).to.be.eql('pong');
		expect(params).to.be.deep.eql({});
	});

	it('Should get the logsnag route', () => {
		const request = new Request({
			url: 'https://test.com/log/ping'
		});

		const { callback, params } = router.route(request);
		const result = callback(request, params);

		expect(result).to.be.eql('pong');
		expect(params).to.be.deep.eql({});
	});

	it('Should respond 404 for unknown route', () => {
		const request = new Request({
			url: 'https://test.com/test'
		});

		const { callback, params } = router.route(request);
		expect(callback).to.not.be.null;
		expect(callback).to.not.be.undefined;

		const result = callback(request, params);
		expect(result).to.be.instanceof(Response);
		expect(result.status).to.be.eql(404);
	});
});
