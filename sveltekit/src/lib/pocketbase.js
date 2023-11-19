import { writable } from 'svelte/store';
import { applyAction } from '$app/forms';
import { invalidateAll } from '$app/navigation';
import { env } from '$env/dynamic/public';
import PocketBase from 'pocketbase';
import { ClientResponseError } from 'pocketbase';

/** @type {import('svelte/store').Writable<import('pocketbase').AuthModel>} */
export const user = writable(null);

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL || 'http://localhost:8090');

pb.authStore.onChange(() => {
	user.set(pb.authStore.model);
}, true);

export const logout = async () => {
	pb.authStore.clear();
	await invalidateAll();
};

/** @type {import('@sveltejs/kit').SubmitFunction} */
export const login = async ({ formData, cancel }) => {
	cancel();

	/**
	 * @typedef {Object} LoginData
	 * @property {string} email
	 * @property {string} password
	 * @property {string?} next
	 */
	const data = /** @type {LoginData} */ (Object.fromEntries(formData));

	try {
		await pb.collection('users').authWithPassword(data.email, data.password);
		await applyAction({ type: 'redirect', status: 303, location: data.next || '/' });
	} catch (e) {
		if (e instanceof ClientResponseError) {
			await applyAction({ type: 'failure', status: 400, data: { message: e.response.message } });
		} else {
			throw e;
		}
	}
};

/** @type {import('@sveltejs/kit').SubmitFunction} */
export const register = async ({ formData, cancel }) => {
	cancel();

	/**
	 * @typedef {Object} RegisterData
	 * @property {string} email
	 * @property {string} password
	 * @property {string} passwordConfirm
	 * @property {string?} next
	 */
	const data = /** @type {RegisterData} */ (Object.fromEntries(formData));

	try {
		await pb.collection('users').create(data);
		await pb.collection('users').authWithPassword(data.email, data.password);
		await applyAction({ type: 'redirect', status: 303, location: data.next || '/' });
	} catch (e) {
		if (e instanceof ClientResponseError) {
			await applyAction({ type: 'failure', status: 400, data: e.response.data });
		} else {
			throw e;
		}
	}
};
