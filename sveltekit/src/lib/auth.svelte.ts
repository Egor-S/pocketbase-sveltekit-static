import type { AuthRecord } from 'pocketbase';

import { invalidateAll } from '$app/navigation';
import { pb } from '$lib/pocketbase';

export const authState = $state<{ user: AuthRecord }>({ user: pb.authStore.record });

pb.authStore.onChange((_, record) => {
	authState.user = record;
});

export async function login(email: string, password: string) {
	await pb.collection('users').authWithPassword(email, password);
}

export async function register(email: string, password: string, passwordConfirm: string) {
	await pb.collection('users').create({ email, password, passwordConfirm });
	await pb.collection('users').authWithPassword(email, password);
}

export async function logout() {
	pb.authStore.clear();
	await invalidateAll();
}
