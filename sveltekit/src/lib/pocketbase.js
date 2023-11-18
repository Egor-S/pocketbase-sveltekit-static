import { writable } from 'svelte/store';
import { applyAction } from '$app/forms';
import { env } from '$env/dynamic/public';
import PocketBase from 'pocketbase';
import { invalidateAll } from '$app/navigation';

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

	const email = /** @type string */ (await formData.get('email'));
	const password = /** @type string */ (await formData.get('password'));
	const next = /** @type string? */ (await formData.get('next'));

	try {
		await pb.collection('users').authWithPassword(email, password);
		applyAction({ type: 'redirect', status: 303, location: next || '/' });
	} catch (e) {
		applyAction({ type: 'failure', status: 403, data: { message: 'Wrong username or password' } });
	}
};
