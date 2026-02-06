<script lang="ts">
	import Tags from '$lib/components/Tags.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import { Filter, Rss } from 'lucide-svelte';
	import { SiGithub } from '@icons-pack/svelte-simple-icons';
	import Linkedin from '$lib/icons/Linkedin.svelte';

	let { data } = $props();
	let currentTagIndex = $state(0);
	let areTagsOpen = $state(false);

	let filteredPosts = $derived.by(() => {
		if (currentTagIndex === 0) return data.posts;

		const currentTag = data.tags[currentTagIndex - 1];
		return data.posts.filter((post) => post.tags.includes(currentTag.name));
	});
</script>

<svelte:head>
	<title>Mordechai's Blog</title>
	<meta name="description" content="My own personal blog where I share stuff." />
</svelte:head>

<div
	class="flex w-full max-w-[90vw] flex-col gap-5 px-4 @lg:max-w-2xl @xl:px-8 @3xl:max-w-4xl @4xl:max-w-7xl"
>
	<!-- Header Section  -->
	<div class="flex place-content-center @lg:justify-between">
		<div
			class="flex size-full max-w-[36.313rem] flex-col place-items-center gap-2.5 px-2.5 text-center @lg:px-0 @2xl:place-items-start @2xl:text-start"
		>
			<h1 class="text-2xl font-bold @2xl:text-3xl">Hello, Welcome to my blog!</h1>
			<h4 class="text-lg @2xl:text-xl">I am Mordechai, an open-source software engineer.</h4>
			<p class="text-sm @2xl:text-base">
				Here I will write about many different programming related topics, but might expand beyond
				programming.
			</p>
		</div>
		<div class="hidden flex-col gap-3 place-self-end @3xl:flex">
			<a href="https://github.com/MordechaiHadad" target="_blank">
				<SiGithub />
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
	<div class="flex size-full justify-between px-2.5 @3xl:hidden">
		<div class="flex gap-3">
			<a href="https://github.com/MordechaiHadad" target="_blank">
				<SiGithub />
			</a>
			<a href="https://www.linkedin.com/in/mordechai-hadad/" target="_blank">
				<Linkedin />
			</a>
			<a href="/rss.xml" target="_blank">
				<Rss />
			</a>
		</div>
		<button onclick={() => (areTagsOpen = !areTagsOpen)}>
			<Filter />
		</button>
	</div>

	<Tags bind:currentTagIndex class="hidden place-content-center @3xl:flex" tags={data.tags} />
	<Tags
		bind:currentTagIndex
		tags={data.tags}
		class="flex place-content-center @3xl:hidden"
		isOpen={areTagsOpen}
		onClickOutside={() => (areTagsOpen = false)}
	/>

	<!-- Posts Section -->

	{#key filteredPosts}
		<div class="grid grid-cols-1 gap-10 @xl:grid-cols-2 @3xl:grid-cols-3" aria-label="Blog posts">
			{#each filteredPosts as post (post.slug)}
				<PostCard {post} />
			{/each}
		</div>
	{/key}
</div>
