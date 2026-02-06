<script lang="ts">
	import type { TagEntry } from '$lib';
	import { clickOutside } from '$lib/actions/clickOutside';
	import { fly } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	let {
		currentTagIndex: currentTag = $bindable(0),
		class: className = '',
		isOpen = $bindable(true),
		onClickOutside = (event: MouseEvent | TouchEvent) => {},
		tags
	}: {
		currentTagIndex?: number;
		class?: string;
		isOpen?: boolean;
		onClickOutside?: (event: MouseEvent | TouchEvent) => void;
		tags: TagEntry[];
	} = $props();

	let allTags = $derived.by(() => {
		const allTag: TagEntry = {
			name: 'All',
			slug: 'all',
			count: tags.reduce((acc, tag) => acc + tag.count, 0)
		};
		return [allTag, ...tags];
	});
</script>

{#if isOpen}
	<div
		class={twMerge('flex flex-wrap gap-2.5', className)}
		transition:fly={{
			y: -40,
			duration: 500
		}}
		use:clickOutside={{
			callback: onClickOutside
		}}
		role="group"
		aria-label="Filter posts by tag"
	>
		{#each allTags as tag, i}
			<button
				class="rounded-xl px-3 py-1.5 transition-colors duration-200 ease-in-out @3xl:px-4 @3xl:py-2.5 {currentTag ===
				i
					? 'bg-gray-200 dark:bg-zinc-700'
					: ''}"
				aria-pressed={currentTag === i}
				type="button"
				onclick={() => (currentTag = i)}>{tag.name}</button
			>
		{/each}
	</div>
{/if}
