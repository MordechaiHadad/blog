<script lang="ts">
	import { calculateReadingTime, type IContext } from '$lib';
	import type { IPost } from '$lib/posts';
	import { getContext } from 'svelte';
	import { Circle } from 'svelte-feathers';

	interface Props {
		post: IPost;
	}

	let { post }: Props = $props();
</script>

<a class="flex flex-col" href="/articles/{post.slug}">
	<div class="relative">
		<img
			src={post.image}
			alt="{post.slug} cover"
			class="rounded-2xl"
		/>
		<p
			class="absolute left-2.5 top-2.5 z-10 rounded-2xl bg-gray-200 px-3 py-1.5 text-sm dark:bg-zinc-700"
		>
			{post.category}
		</p>
	</div>
	<div class="flex flex-col gap-1">
		<div
			class="flex place-items-center gap-1.5 text-start text-xs text-neutral-600 dark:text-neutral-400"
		>
			<p>
				{post.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
			</p>
			<Circle class="size-1.5 fill-neutral-600 dark:fill-neutral-400" />
			<p>{calculateReadingTime(post.content)} minutes read</p>
		</div>
		<h2 class="text-start text-lg font-bold">{post.title}</h2>
		<p class="line-clamp-2 text-start text-sm text-neutral-600 dark:text-neutral-400">
			{post.description}
		</p>
	</div>
</a>
