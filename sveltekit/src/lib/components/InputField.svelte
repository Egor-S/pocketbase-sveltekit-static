<script lang="ts">
	interface Props {
		title: string;
		name: string;
		type: 'email' | 'password' | 'text';
		error?: string;
	}

	const { title, name, type, error }: Props = $props();
</script>

<div>
	<label for={name} class="block text-sm font-medium text-gray-700">{title}</label>
	<input
		{name}
		{type}
		required
		class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
	/>
	{#if error}
		<p class="text-red-500">{error}</p>
	{/if}
</div>
