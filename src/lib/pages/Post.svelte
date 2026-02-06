<script lang="ts">
	import { onMount } from 'svelte';
	import { Clock, Calendar } from 'lucide-svelte';
	import { calculateReadingTime, normalizeApostrophes, updateUrl } from '$lib';
	import type { Post } from '$lib/posts';

	let {
		post,
		compiledHtml,
		headers
	}: {
		post: Post;
		compiledHtml:
			| {
					code: string;
					data?: Record<string, unknown>;
					map?: string;
			  }
			| undefined;
		headers: {
			level: number;
			text: string;
			id: string;
		}[];
	} = $props();
	let contentDiv: HTMLDivElement;

	onMount(() => {
		if (contentDiv) {
			headers.forEach((header) => {
				const elements = contentDiv.querySelectorAll<HTMLElement>(`h${header.level}`);
				for (const element of elements) {
					if (
						normalizeApostrophes(element.textContent.trim()) === normalizeApostrophes(header.text)
					) {
						element.id = header.id;
						element.addEventListener('click', () => updateUrl(header.id));
						element.style.cursor = 'pointer';

						break;
					}
				}
			});
		}
	});
</script>

<article class="flex w-full max-w-[90vw] flex-col gap-5 @3xl:max-w-2xl @6xl:max-w-4xl">
	<header class="flex flex-col gap-2.5">
		<div
			class="flex w-full flex-col gap-1.5 rounded-lg @lg:h-80"
			role="banner"
			style="background-image: url({post.image}); background-size: cover; background-position: center;"
		>
			<div
				class="flex size-full flex-col place-content-center gap-2.5 rounded-lg bg-neutral-900/60 p-2.5 text-neutral-100 @lg:place-items-center"
			>
				<h1 class="w-full text-2xl font-bold wrap-break-word @lg:text-center @lg:text-3xl">
					{post.title}
				</h1>
				<p class="w-full wrap-break-word @lg:text-center">{post.description}</p>
				<div class="flex flex-wrap gap-3 text-start text-xs @lg:text-sm">
					<div class="flex gap-1.5">
						<Calendar class="size-4" />
						<time datetime={post.date.toISOString()}>
							{post.date.toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit'
							})}
						</time>
					</div>
					<div class="flex gap-1.5">
						<Clock class="size-4" />
						<p>{calculateReadingTime(post.content)} minutes read</p>
					</div>
				</div>
			</div>
		</div>
		<p class="credit text-xs">{@html post.imageCredit}</p>
	</header>
	<div
		bind:this={contentDiv}
		class="content prose prose-code:text-neutral-900 dark:prose-code:text-neutral-100 prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100 dark:prose-a:text-neutral-100 mt-3 w-full max-w-none text-neutral-900 dark:text-neutral-100"
	>
		{@html compiledHtml?.code}
	</div>
</article>

<style>
	@reference "tailwindcss";

	:global(.credit a) {
		@apply text-blue-500;
	}
	:global(.content h2) {
		scroll-margin-top: 100px;
	}

	:global(.content code)::before,
	:global(.content code)::after {
		content: none !important;
		display: none !important;
	}
	:global(.content code) {
		@apply rounded bg-neutral-200 p-1 dark:bg-neutral-600/20;
	}

	:global(.content pre > code) {
		@apply rounded-none bg-transparent p-0 text-base;
	}
</style>
