import type { Posts } from './posts';

export interface IContext {
	currentTab: number;
	isDarkMode: boolean;
	posts: Posts;
	currentSlug: string;
}

export const toggleDarkMode = (context: IContext) => {
	context.isDarkMode = !context.isDarkMode;
	document.documentElement.classList.toggle('dark', context.isDarkMode);
	localStorage.setItem('theme', context.isDarkMode ? 'dark' : 'light');
};

export const calculateReadingTime = (text: string) => {
	const wordsPerMinute = 200; // Average reading speed
	const wordCount = text.trim().split(/\s+/).length;
	const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
	return readingTimeMinutes;
};
