import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import { read } from '$app/server';

export const processPost = async (path: string): Promise<IPost> => {
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

	const slug = path.split(/[/\\]/).pop()!;

	return {
		slug: slug.replace('.svx', ''),
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
	const absolutePath = process.cwd();

	const posts = await Promise.all(Object.keys(postFiles).map(async (filePath) => {
		const srcContents = fs.readdirSync(absolutePath);
		console.log(srcContents)
		return await processPost(filePath);
	}));

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
