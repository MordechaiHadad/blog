<script lang="ts">
	import { onMount } from 'svelte';
	import { Clock, Calendar } from 'svelte-feathers';
	import { calculateReadingTime, normalizeApostrophes, updateUrl } from '$lib';
	import type { IPost } from '$lib/posts';

	let {
		post,
		compiledHtml,
		headers
	}: {
		post: IPost;
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

<article class="flex w-full max-w-[90vw] flex-col gap-5 lg:~max-w-2xl/4xl">
	<header class="flex flex-col gap-2.5">
		<div
			class="flex w-full flex-col gap-1.5 rounded-lg md:h-80"
			role="banner"
			style="background-image: url({post.image}); background-size: cover; background-position: center;"
		>
			<div
				class="flex size-full flex-col place-content-center gap-2.5 rounded-lg bg-neutral-900/60 p-2.5 text-neutral-100 md:place-items-center"
			>
				<h1 class="w-full break-words text-3xl font-bold md:text-center">{post.title}</h1>
				<p class="w-full break-words md:text-center">{post.description}</p>
				<div class="flex flex-wrap gap-3 text-start ~text-xs/sm">
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
	<div bind:this={contentDiv} class="content prose mt-3 w-full max-w-none">
		{@html compiledHtml?.code}
	</div>
</article>

<style>
	:global(.credit a) {
		@apply text-blue-500;
	}
	:global(.content h2) {
		scroll-margin-top: 100px;
	}
	:global(.content h1:hover),
	:global(.content h2:hover),
	:global(.content h3:hover),
	:global(.content h4:hover),
	:global(.content h5:hover),
	:global(.content h6:hover) {
		text-decoration: underline;
	}
</style>
