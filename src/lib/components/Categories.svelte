<script lang="ts">
	import { clickOutside } from '$lib/actions/clickOutside';
	import { fly } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	let { currentCategory = $bindable(0), class: className = '', isOpen = $bindable(true), onClickOutside = () => {} }: {
		currentCategory?: number;
		class?: string;
		isOpen?: boolean;
		onClickOutside?: () => void;
	} = $props();

	const categories = ['All', 'Rust', 'Svelte', 'Technology'];
</script>

{#if isOpen}
	<div
		class={twMerge('flex gap-2.5', className)}
		transition:fly={{
			y: -40,
			duration: 500
		}}
		use:clickOutside={{
			callback: onClickOutside,
		}}
        role="group"
        aria-label="Filter posts by category"
	>
		{#each categories as category, i}
			<button
				class="rounded-xl transition-colors duration-200 ease-in-out ~px-3/4 ~py-1.5/2.5 {currentCategory ===
				i
					? 'bg-gray-200 dark:bg-zinc-700'
					: ''}"
                aria-pressed={currentCategory === i}
                type="button"
				onclick={() => (currentCategory = i)}>{category}</button

			>
		{/each}
	</div>
{/if}
