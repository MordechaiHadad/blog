import matter from 'gray-matter';
import { read } from '$app/server';

export const processPost = async (path: string, slug: string): Promise<IPost> => {
	const asset = read(path);
	const text = await asset.text();
	const { data, content } = matter(text);

	const attributes = data as {
		title: string;
		description: string;
		date: string;
		image: string;
		imageCredit: string;
		category: string;
	};

	return {
		slug,
		title: attributes.title,
		description: attributes.description,
		date: new Date(attributes.date),
		image: `/${attributes.image}`,
		imageCredit: attributes.imageCredit,
		category: attributes.category,
		content
	};
};

export const getPosts = async (): Promise<Posts> => {
	const postFiles = import.meta.glob<string>('../../posts/*.svx', {
		query: '?url',
		eager: true,
		import: "default"
	});

    let posts: Posts = [];
    for (const key in postFiles) {
		const slug = key.split('/').pop()?.replace('.svx', '');
		if (!slug) continue;

        const post = await processPost(postFiles[key], slug);
        posts.push(post);
    }

	return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export interface IPost {
	slug: string;
	title: string;
	description: string;
	date: Date;
	image: string;
	imageCredit: string;
	category: string;
	content: string;
}

export type Posts = IPost[];
