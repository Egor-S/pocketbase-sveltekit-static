import { redirect } from '@sveltejs/kit';

import { authState } from '$lib/auth.svelte';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	if (authState.user !== null) {
		throw redirect(302, url.searchParams.get('next') || '/');
	}
};
