<script lang="ts">
	import type { IContext } from '$lib';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount, setContext } from 'svelte';
	import '../app.css';
	export const prerender = true;

	let { children, data } = $props();

	let context: IContext = $state({
		isDarkMode: false,
		currentTab: 0,
		posts: []
	});

	context.posts = data.posts;

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

	<p class="mt-auto">Copyright © 2024  |  All rights reserved.</p>
</div>
