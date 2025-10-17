import { getPosts } from '$lib/posts';

export const prerender = true;

export const load = async () => {
	const posts = await getPosts();

	return {
		posts
	};
};
