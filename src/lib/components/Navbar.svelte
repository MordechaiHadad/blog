<script lang="ts">
	import { toggleDarkMode, type Context } from '$lib';
	import { getContext, onMount } from 'svelte';
	import { Moon, Sun } from 'lucide-svelte';

	let context: Context = getContext('context');
	let scrolled = $state(false);

	function onScroll() {
		if (window.scrollY >= 40) scrolled = true;
		else scrolled = false;
	}

	onMount(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<nav
	class="nav-shadow sticky top-2 z-20 flex w-full max-w-85 place-items-center justify-between rounded-2xl border transition-all duration-500 ease-in-out {!scrolled
		? 'border-transparent'
		: 'border-gray-200 dark:border-zinc-700'} bg-neutral-100 px-5 py-3.5 @xl:max-w-lg dark:bg-zinc-800"
	class:scrolled
	aria-label="Main navigation"
>
	<a class="text-lg @xl:text-xl" href="/">Mordechai's Blog</a>
	<button onclick={() => toggleDarkMode(context)}>
		{#if context.isDarkMode}
			<Sun class="size-6" />
		{:else}
			<Moon class="size-6" />
		{/if}
	</button>
</nav>

<style>
	.nav-shadow {
		box-shadow: none;
	}

	.nav-shadow.scrolled {
		box-shadow:
			15px 17px 14px rgba(0, 0, 0, 0.02),
			7px 8px 10px rgba(0, 0, 0, 0.03),
			2px 2px 6px rgba(0, 0, 0, 0.03);
	}
</style>
