import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { user } from '$lib/pocketbase';

/** @type {import('./$types').PageLoad} */
export const load = async () => {
	if (get(user) !== null) {
		throw redirect(302, '/');
	}
};
