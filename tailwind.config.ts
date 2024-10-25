import typography from '@tailwindcss/typography';
import fluid, { extract, screens, fontSize } from 'fluid-tailwind';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: {
		files: ['./src/**/*.{html,js,svelte,ts,svx}'],
		extract
	},

	theme: {
		screens,
		fontSize,
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'--tw-prose-body': null,
						'--tw-prose-headings': null,
						'--tw-prose-lead': null,
						'--tw-prose-links': null,
						'--tw-prose-bold': null,
						'--tw-prose-counters': null,
						'--tw-prose-bullets': null,
						'--tw-prose-hr': null,
						'--tw-prose-quotes': null,
						'--tw-prose-quote-borders': null,
						'--tw-prose-captions': null,
						'--tw-prose-code': null,
						'--tw-prose-pre-code': null,
						'--tw-prose-pre-bg': null,
						'--tw-prose-th-borders': null,
						'--tw-prose-td-borders': null,
						'--tw-prose-invert-body': null,
						'--tw-prose-invert-headings': null,
						'--tw-prose-invert-lead': null,
						'--tw-prose-invert-links': null,
						'--tw-prose-invert-bold': null,
						'--tw-prose-invert-counters': null,
						'--tw-prose-invert-bullets': null,
						'--tw-prose-invert-hr': null,
						'--tw-prose-invert-quotes': null,
						'--tw-prose-invert-quote-borders': null,
						'--tw-prose-invert-captions': null,
						'--tw-prose-invert-code': null,
						'--tw-prose-invert-pre-code': null,
						'--tw-prose-invert-pre-bg': null,
						'--tw-prose-invert-th-borders': null,
						'--tw-prose-invert-td-borders': null
					}
				}
			}
		}
	},

	plugins: [typography, fluid]
} as Config;
