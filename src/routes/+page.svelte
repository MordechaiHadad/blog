<script lang="ts">
	import Home from '$lib/pages/Home.svelte';

	let { data } = $props();
	console.log(data.posts[0].slug);
</script>

<Home posts={data.posts} />
