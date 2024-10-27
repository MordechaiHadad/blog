import { getPosts } from '$lib/posts';

export const load = async ({ params }) => {
	const posts = await getPosts();

	return {
		posts
	};
};
