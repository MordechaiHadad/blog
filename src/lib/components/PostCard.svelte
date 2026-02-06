<script lang="ts">
	import { calculateReadingTime } from '$lib';
	import type { Post } from '$lib/posts';
	import { Circle } from 'lucide-svelte';

	let { post }: { post: Post } = $props();
</script>

<a class="flex flex-col gap-0.5" href="/articles/{post.slug}">
	<div class="relative aspect-4/3 overflow-hidden rounded-2xl" aria-labelledby="post-{post.slug}">
		<img src={post.image} alt="{post.slug} cover" class="size-full object-cover" />
		<p
			class="absolute top-2.5 left-2.5 z-10 rounded-2xl bg-gray-200 px-3 py-1.5 text-sm dark:bg-zinc-700"
		>
			{post.category}
		</p>
	</div>
	<div class="flex flex-col gap-1">
		<div
			class="flex place-items-center gap-1.5 text-start text-xs text-neutral-600 dark:text-neutral-400"
		>
			<time datetime={post.date.toISOString()}>
				{post.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
			</time>
			<Circle class="size-1.5 fill-neutral-600 dark:fill-neutral-400" />
			<p>{calculateReadingTime(post.content)} minutes read</p>
		</div>
		<h2 class="text-start text-lg font-bold" id="post-{post.slug}">{post.title}</h2>
		<p class="line-clamp-2 text-start text-sm text-neutral-600 dark:text-neutral-400">
			{post.description}
		</p>
	</div>
</a>
