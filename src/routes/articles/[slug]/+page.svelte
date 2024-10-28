<script lang="ts">
	import Post from "$lib/pages/Post.svx";

    let { data } = $props();
</script>

<Post Post={data.content} slug={data.slug} posts={data.posts} />