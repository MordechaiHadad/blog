import { extractHeaders } from '$lib';
import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';

export async function load({ params, parent }) {
	const { posts } = await parent();
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) throw error(404, 'Post not found');

	const headers = extractHeaders(post.content);
	const compiledHtml = await compile(post.content);

	if (compiledHtml && typeof compiledHtml.code === 'string') {
		compiledHtml.code = compiledHtml.code.replace(/\{@html `([\s\S]*?)`\}/g, (_m, inner) => {
			return inner
				.replace(/\\u003C/g, '<')
				.replace(/\\u003E/g, '>')
				.replace(/\\n/g, '\n')
				.replace(/\\"/g, '"')
				.replace(/\\'/g, "'")
				.replace(/\\\\/g, '\\')
		});
	}

	return {
		post,
		compiledHtml,
		headers
	};
}
