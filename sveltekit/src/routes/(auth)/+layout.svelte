<script lang="ts">
	import { Logout, user } from '$lib/auth';

	let { children } = $props();
</script>

<nav class="flex justify-end items-center py-2 px-4 bg-white shadow">
	<div class="text-gray-600 mr-4">{$user?.email}</div>
	<button
		class="px-4 py-2 text-sm text-white bg-gray-600 rounded hover:bg-gray-700"
		onclick={Logout}
	>
		Logout
	</button>
</nav>

{@render children?.()}
