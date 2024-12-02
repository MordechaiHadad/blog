<script lang="ts">
	import { clickOutside } from '$lib/actions/clickOutside.js';
	import Post from '$lib/pages/Post.svx';
	import { ChevronRight, ChevronLeft } from 'svelte-feathers';
	import { fly } from 'svelte/transition';

	let { data } = $props();
	let isTableOfContentsVisible = $state(false);
</script>

<svelte:head>
	<title>{data.post.title}</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<div class="relative">
	{#if isTableOfContentsVisible}
		<nav
			class="fixed right-0 top-[42%] z-10 flex flex-col gap-4 rounded-md border border-gray-200 bg-neutral-100 p-4 shadow-md dark:border-zinc-700 dark:bg-neutral-900"
			transition:fly={{ x: 50, duration: 500 }}
			use:clickOutside={{ callback: () => (isTableOfContentsVisible = false), allowSwipe: true }}
			aria-label="Table of contents"
		>
			<button
				class="-translate-x-2"
				onclick={() => (isTableOfContentsVisible = false)}
				aria-label="Close table of contents"
			>
				<ChevronRight class="size-6" />
			</button>
			<h4 class="size-lg font-bold">Table Of Contents</h4>
			<div
				class="~max-h-40/max-h-80 flex flex-col gap-2 overflow-y-auto text-wrap p-1 ~max-w-48/60"
			>
				{#each data.headers.filter((header) => header.level === 2) as header, i}
					<a class="hover:font-bold" href="#{header.id}" aria-label="Jump to section: {header.text}"
						>{i}. {header.text}</a
					>
				{/each}
			</div>
		</nav>
	{:else}
		<button
			class="fixed right-0 top-[42%] z-10 rounded-md border border-gray-200 bg-neutral-100 p-1.5 shadow-md dark:border-zinc-700 dark:bg-neutral-900"
			transition:fly={{ x: 50, duration: 500 }}
			onclick={() => (isTableOfContentsVisible = true)}
			aria-label="Open table of contents"
			aria-expanded={isTableOfContentsVisible}
		>
			<ChevronLeft class="size-6" />
		</button>
	{/if}
	<Post post={data.post} compiledHtml={data.compiledHtml} headers={data.headers} />
</div>
