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
});
