<script lang="ts">
	import { Logout, user } from '$lib/auth';

	let { children } = $props();
</script>

<nav class="flex items-center justify-end bg-white px-4 py-2 shadow">
	<div class="mr-4 text-gray-600">{$user?.email}</div>
	<button
		class="rounded bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700"
		onclick={Logout}
	>
		Logout
	</button>
</nav>

{@render children?.()}
