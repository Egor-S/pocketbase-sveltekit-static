<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	import { LoginAction } from '$lib/auth';

	import InputField from '../InputField.svelte';
	import SubmitButton from '../SubmitButton.svelte';
</script>

<form use:enhance={LoginAction} method="POST" class="space-y-6">
	<input type="hidden" name="next" value={page.url.searchParams.get('next')} />

	<InputField title="Email" name="email" type="text" />
	<InputField title="Password" name="password" type="password" />

	<SubmitButton text="Login" />
</form>
