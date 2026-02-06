import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		fs: {
			allow: [path.resolve('posts')]
		}
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
