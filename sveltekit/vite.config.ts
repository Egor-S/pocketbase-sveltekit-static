import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		proxy: {
			'^/(api|_)/': {
				target: 'http://localhost:8090',
				changeOrigin: true,
			},
		},
	},
});
