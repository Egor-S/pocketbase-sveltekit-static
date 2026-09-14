<script lang="ts">
	interface Props {
		text: string;
		pending?: boolean;
	}

	const { text, pending = false }: Props = $props();
</script>

<button
	type="submit"
	disabled={pending}
	class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
>
	{text}
</button>
