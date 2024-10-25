<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount, setContext } from 'svelte';
	import type { IContext } from '$lib';
	import Home from '$lib/pages/Home.svelte';
	import { getPosts, type Posts } from '$lib/posts';
	import Post from '$lib/pages/Post.svx';

	let context: IContext = $state({
		isDarkMode: false,
		currentTab: 0,
		posts: [],
		currentPost: ''
	});

	const { data } = $props();
	context.posts = data.posts;

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

	onMount(async () => {
		setTheme();
	});
</script>

<div
	class="relative flex size-full flex-col place-items-center text-neutral-900 ~gap-10/12 dark:text-neutral-100"
>
	<Navbar />

	{#if context.currentTab === 0}
		<Home />
	{:else if context.currentTab === 1}
		<Post />
	{/if}
</div>
