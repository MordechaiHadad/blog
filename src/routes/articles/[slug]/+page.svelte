<script lang="ts">
	import Post from '$lib/pages/Post.svx';
	import { onMount } from 'svelte';
	import { ChevronRight, ChevronLeft } from 'svelte-feathers';
	import { fade, fly } from 'svelte/transition';

	let { data } = $props();
	let isTableOfContentsVisible = $state(false);
</script>

<div class="relative">
	{#if isTableOfContentsVisible}
		<div
			class="fixed right-0 top-[42%] z-10 flex flex-col gap-4 rounded-md border border-gray-200 bg-neutral-100 p-4 shadow-md dark:border-zinc-700 dark:bg-neutral-900"
			transition:fly={{ x: 50, duration: 500 }}
		>
			<button class="w-fit -translate-x-2" onclick={() => (isTableOfContentsVisible = false)}>
				<ChevronRight class="size-6" />
			</button>
			<h4 class="size-lg font-bold">Table Of Contents</h4>
			<div
				class="~max-h-40/max-h-80 flex flex-col gap-2 overflow-y-auto text-wrap p-1 ~max-w-40/60"
			>
				{#each data.headers.filter((header) => header.level === 2) as header, i}
					<a class="hover:font-bold" href="#{header.id}">{i}. {header.text}</a>
				{/each}
			</div>
		</div>
	{:else}
		<button
			class="fixed right-0 top-[42%] z-10 rounded-md border border-gray-200 bg-neutral-100 p-1.5 shadow-md dark:border-zinc-700 dark:bg-neutral-900"
			transition:fly={{ x: 50, duration: 500 }}
			onclick={() => (isTableOfContentsVisible = true)}
		>
			<ChevronLeft class="size-6" />
		</button>
	{/if}
	<Post post={data.post} compiledHtml={data.compiledHtml} headers={data.headers} />
</div>
