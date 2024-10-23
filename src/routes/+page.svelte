<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount, setContext } from 'svelte';
	import type { IContext } from '$lib';
	import Home from '$lib/pages/Home.svelte';

	let context: IContext = $state({
		isDarkMode: false,
		currentTab: 0
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

	$inspect(context);

	onMount(() => {
		setTheme();
	});
</script>

<div
	class="relative flex size-full flex-col place-items-center text-neutral-900 dark:text-neutral-100 ~gap-10/20"
>
	<Navbar />

	{#if context.currentTab === 0}
		<Home />
	{/if}
</div>
