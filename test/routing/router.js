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

	for(const name of ['my_app', 5, 'a6526855-7cc3-46a8-b937-f60cc1821725']) {
		it(`Should return the app name for a logsnag route (${name})`, () => {
			const request = new Request({
				method: 'POST',
				url: `https://test.com/log/${name}`
			});

			const { callback, params } = router.route(request);
			const result = callback(request, params);

			// This route responds with the same name
			expect(result).to.be.deep.eql({
				project: name.toString()
			});

			expect(params).to.be.deep.eql({
				project: name.toString()
			});
		});
	}

	for(const method of ['get', 'GET', 'head', 'patch', 'put']) {
		it(`Should respond 404 because no other methods than POST are allowed (logsnag - ${method})`, () => {
			const request = new Request({
				method,
				url: `https://test.com/log/testing_project_name`
			});

			const { callback, params } = router.route(request);
			const result = callback(request, params);

			// This route responds with the same name
			expect(result).to.be.instanceof(Response);
			expect(result.status).to.be.eql(404);
		});
	}


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
