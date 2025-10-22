<script lang="ts">
	import '../app.css';
	import 'prism-themes/themes/prism-vsc-dark-plus.css';

	import type { IContext } from '$lib';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount, setContext } from 'svelte';

	let { children } = $props();

	let context: IContext = $state({
		isDarkMode: false
	});

	const setTheme = () => {
		const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const storedTheme = localStorage.getItem('theme');

		if (!storedTheme) {
			context.isDarkMode = isDarkTheme;
			return;
		}

		context.isDarkMode = storedTheme === 'dark' ? true : false;
	};

	setContext('context', context);

	onMount(async () => {
		setTheme();
	});
</script>

<div
	class="relative flex min-h-screen w-full flex-col place-items-center pb-5 text-neutral-900 ~gap-10/12 dark:text-neutral-100"
>
	<Navbar />

	{@render children()}

	<footer class="mt-auto">
		<p>Copyright © 2024  |  All rights reserved.</p>
	</footer>
</div>
