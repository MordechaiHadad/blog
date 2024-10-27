<script lang="ts">
	import Home from '$lib/pages/Home.svelte';

	let { data } = $props();
</script>

<Home posts={data.posts} />
