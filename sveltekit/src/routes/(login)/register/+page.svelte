<script lang="ts">
	import { ClientResponseError } from 'pocketbase';

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import { register } from '$lib/auth.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import SubmitButton from '$lib/components/SubmitButton.svelte';

	interface FormError {
		message?: string;
		data?: Record<string, { message: string }>;
	}

	let pending = $state(false);
	let error = $state<FormError>();

	async function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirm = formData.get('passwordConfirm') as string;

		pending = true;
		error = undefined;
		try {
			await register(email, password, passwordConfirm);
			const next = (page.url.searchParams.get('next') || '/') as Pathname;
			await goto(resolve(next));
		} catch (e) {
			if (e instanceof ClientResponseError) {
				error = e.response;
			} else {
				throw e;
			}
		} finally {
			pending = false;
		}
	}
</script>

<form {onsubmit} class="space-y-6">
	<InputField title="Email" name="email" type="text" error={error?.data?.email?.message} />
	<InputField
		title="Password"
		name="password"
		type="password"
		error={error?.data?.password?.message}
	/>
	<InputField
		title="Confirm password"
		name="passwordConfirm"
		type="password"
		error={error?.data?.passwordConfirm?.message}
	/>

	{#if error?.message}
		<p class="text-red-500">{error.message}</p>
	{/if}

	<SubmitButton text="Register" {pending} />

	<a href={resolve('/login')} class="block text-center text-sm text-blue-600 hover:text-blue-800"
		>Already have an account</a
	>
</form>
