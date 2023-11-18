<script>
	import { user, logout } from '$lib/pocketbase';
</script>

<h1>Welcome to SvelteKit, {$user?.username}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/login" on:click={logout}>Logout</a>
