<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { RegisterAction } from '$lib/pocketbase';
</script>

<form method="POST" use:enhance={RegisterAction}>
	<input name="next" type="hidden" value={$page.url.searchParams.get('next')} />

	<input name="email" type="email" placeholder="email" />
	{#if $page.form?.email}
		<span>{$page.form.email.message}</span>
	{/if}

	<input name="password" type="password" placeholder="password" />
	{#if $page.form?.password}
		<span>{$page.form.password.message}</span>
	{/if}

	<input name="passwordConfirm" type="password" placeholder="password again" />
	{#if $page.form?.passwordConfirm}
		<span>{$page.form.passwordConfirm.message}</span>
	{/if}

	<button type="submit">Register</button>
</form>
<a href="/login">Login</a>
