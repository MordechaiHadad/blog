import { extractHeaders } from '$lib';
import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';

export async function load({ params, parent }) {
	const { posts } = await parent();
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) throw error(404, 'Post not found');


    const headers = extractHeaders(post.content);
	const compiledHtml = await compile(post.content);
	return {
		post,
		compiledHtml,
		headers
	};
}
