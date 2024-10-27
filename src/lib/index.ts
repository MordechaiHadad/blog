export interface IContext {
	isDarkMode: boolean;
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
