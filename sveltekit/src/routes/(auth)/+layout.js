import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { user } from '$lib/pocketbase';

/** @type {import('./$types').LayoutLoad} */
export const load = async ({ url }) => {
	if (get(user) === null) {
		throw redirect(302, `/login?next=${url.pathname}`);
	}
};
