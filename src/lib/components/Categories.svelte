<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	let { currentCategory = $bindable(0), class: className = '' } = $props();

	const categories = ['All', 'Rust', 'Svelte', 'Technology'];
</script>

<div class={twMerge('flex gap-2.5', className)}>
	{#each categories as category, i}
		<button class='~px-3/4 ~py-1.5/2.5 rounded-xl transition-colors ease-in-out duration-200 {currentCategory === i ? 'bg-gray-200 dark:bg-zinc-700' : ''}' onclick={() => (currentCategory = i)}>{category}</button>
	{/each}
</div>
