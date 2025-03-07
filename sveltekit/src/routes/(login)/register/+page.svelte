<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	import { RegisterAction } from '$lib/auth';

	import InputField from '../InputField.svelte';
	import SubmitButton from '../SubmitButton.svelte';
</script>

<form use:enhance={RegisterAction} method="POST" class="space-y-6">
	<input type="hidden" name="next" value={page.url.searchParams.get('next')} />

	<InputField title="Email" name="email" type="text" />
	<InputField title="Password" name="password" type="password" />
	<InputField title="Confirm password" name="passwordConfirm" type="password" />

	{#if page.form?.response?.message}
		<p class="text-red-500">{page.form.response.message}</p>
	{/if}

	<SubmitButton text="Register" />

	<a href="/login" class="block text-sm text-center text-blue-600 hover:text-blue-800"
		>Already have an account</a
	>
</form>
