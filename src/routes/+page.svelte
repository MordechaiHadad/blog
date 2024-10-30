<script lang="ts">
	import Home from '$lib/pages/Home.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Mordechai's Blog</title>
	<meta name="description" content="My own personal blog where I share stuff." />
</svelte:head>

<Home posts={data.posts} />
