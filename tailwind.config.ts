import typography from '@tailwindcss/typography';
import fluid, { extract, screens, fontSize } from 'fluid-tailwind';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: {
		files: ['./src/**/*.{html,js,svelte,ts,mdsvx}'],
		extract
	},

	theme: {
		screens,
		fontSize,
		extend: {}
	},

	plugins: [typography, fluid]
} as Config;
