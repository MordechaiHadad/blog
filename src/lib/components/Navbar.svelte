<script lang="ts">
	import { toggleDarkMode, type IContext } from '$lib';
	import { getContext } from 'svelte';
	import { Moon, Sun } from 'svelte-feathers';

	let context: IContext = getContext('context');
</script>

<nav
	class="nav-shadow sticky z-10 top-2 flex w-full place-items-center justify-between rounded-2xl border border-gray-200 py-3.5 ~max-w-[21.25rem]/lg ~px-5/10 dark:border-zinc-700 bg-neutral-100 dark:bg-zinc-800"
	aria-label="Main navigation"
>
	<a class="~text-lg/2xl" href="/">Mordechai's Blog</a>
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
		box-shadow:
			15px 17px 14px rgba(0, 0, 0, 0.02),
			7px 8px 10px rgba(0, 0, 0, 0.03),
			2px 2px 6px rgba(0, 0, 0, 0.03);
	}
</style>
