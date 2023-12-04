<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { LoginAction } from '$lib/pocketbase';
</script>

<form method="POST" use:enhance={LoginAction}>
	<input name="next" type="hidden" value={$page.url.searchParams.get('next')} />

	<input name="email" placeholder="email or username" />

	<input name="password" type="password" placeholder="password" />
	{#if $page.form}
		<span>{$page.form.message}</span>
	{/if}

	<button type="submit">Login</button>
</form>

<a href="/register">Register</a>
