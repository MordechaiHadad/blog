import matter from 'gray-matter';

export const processPost = (path: string): IPost => {
	const { data, content } = matter.read(path, { excerpt: false });

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
	const postFiles = import.meta.glob('/static/posts/*.svx');

	console.log(postFiles);

	const posts = Object.keys(postFiles).map((filePath) => {
		return processPost('.' + filePath);
	});

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
