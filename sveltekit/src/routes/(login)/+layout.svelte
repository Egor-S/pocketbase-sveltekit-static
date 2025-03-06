<script lang="ts">
	const { children } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
		{@render children?.()}
	</div>
</div>
