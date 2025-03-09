import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

import { user } from '$lib/auth';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	if (get(user) !== null) {
		throw redirect(302, url.searchParams.get('next') || '/');
	}
};
