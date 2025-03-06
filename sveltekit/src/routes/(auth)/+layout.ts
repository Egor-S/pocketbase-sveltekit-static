import { redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

import { pb } from '$lib/pocketbase';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	try {
		await pb.collection('users').authRefresh();
	} catch (e) {
		if (!(e instanceof ClientResponseError)) {
			throw e;
		}
		pb.authStore.clear();
		const relUrl = url.pathname + url.search;
		throw redirect(302, `/login?next=${encodeURIComponent(relUrl)}`);
	}
};
