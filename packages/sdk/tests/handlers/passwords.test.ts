/**
 * @jest-environment node
 */

import { Directus } from '../../src';
import { test } from '../utils';

describe('password', function () {
	test(`request`, async (url, nock) => {
		const scope = nock()
			.post('/auth/password/request', {
				email: 'admin@example.com',
			})
			.reply(200, {});

		const sdk = new Directus(url);
		await sdk.auth.password.request('admin@example.com');

		expect(scope.pendingMocks().length).toBe(0);
	});

	test(`reset`, async (url, nock) => {
		const scope = nock()
			.post('/auth/password/reset', {
				token: 'token',
				password: 'newpassword',
				reset_url: 'http://some_url.com',
			})
			.reply(200, {});

		const sdk = new Directus(url);
		await sdk.auth.password.reset('token', 'newpassword', 'http://some_url.com');

		expect(scope.pendingMocks().length).toBe(0);
	});
});
