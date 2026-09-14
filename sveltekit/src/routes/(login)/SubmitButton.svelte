<script lang="ts">
	interface Props {
		text: string;
	}

	const { text }: Props = $props();
</script>

<button
	type="submit"
	class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
>
	{text}
</button>
