<script lang="ts">
	import Categories from '$lib/components/Categories.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import type { Posts } from '$lib/posts';
	import { Github, Linkedin, Filter, Rss } from 'svelte-feathers';

	let { posts }: { posts: Posts } = $props();
	let currentCategory = $state(0);
	let isCategoriesOpen = $state(false);

	let filteredPosts = $derived.by(() => {
		switch (currentCategory) {
			case 0:
				return posts;
			case 1:
				return posts.filter((post) => post.category === 'Rust');
			case 2:
				return posts.filter((post) => post.category === 'Svelte');
			case 3:
				return posts.filter((post) => post.category === 'Technology');
			default:
				return posts;
		}
	});
</script>

<div class="flex w-full max-w-[90vw] flex-col gap-5 lg:~max-w-2xl/6xl">
	<!-- Header Section  -->
	<div class="flex place-content-center lg:justify-between">
		<div
			class="flex size-full max-w-[36.313rem] flex-col place-items-center gap-2.5 px-2.5 lg:place-items-start lg:px-0"
		>
			<h1 class="font-bold ~text-2xl/3xl">Hello, Welcome to my blog!</h1>
			<h4 class="text-center ~text-lg/xl lg:text-start">
				I am Mordechai, a sponsored open-source software engineer.
			</h4>
			<p class="text-center ~text-sm/base lg:text-start">
				Here I will write about many different programming related topics, but might expand beyond
				programming.
			</p>
		</div>
		<div class="hidden flex-col gap-3 place-self-end lg:flex">
			<a href="https://github.com/MordechaiHadad" target="_blank">
				<Github />
			</a>
			<a href="https://www.linkedin.com/in/mordechai-hadad/" target="_blank">
				<Linkedin />
			</a>
			<a href="/rss.xml" target="_blank">
				<Rss />
			</a>
		</div>
	</div>

	<!-- Sorting Section -->
	<div class="flex size-full justify-between px-2.5 lg:place-content-center">
		<div class="flex gap-3 lg:hidden">
			<a href="https://github.com/MordechaiHadad" target="_blank">
				<Github />
			</a>
			<a href="https://www.linkedin.com/in/mordechai-hadad/" target="_blank">
				<Linkedin />
			</a>
			<a href="/rss.xml" target="_blank">
				<Rss />
			</a>
		</div>
		<button onclick={() => (isCategoriesOpen = !isCategoriesOpen)} class="lg:hidden">
			<Filter />
		</button>
		<Categories bind:currentCategory class="hidden lg:flex" />
	</div>
	<Categories
		bind:currentCategory
		class="flex place-content-center"
		isOpen={isCategoriesOpen}
		onClickOutside={() => (isCategoriesOpen = false)}
	/>

	<!-- Posts Section -->

	{#key filteredPosts}
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-3">
			{#each filteredPosts as post (post.slug)}
				<PostCard {post} />
			{/each}
		</div>
	{/key}
</div>
