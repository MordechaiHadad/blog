export type Context = {
	isDarkMode: boolean;
};

export type TagEntry = {
	name: string;
	slug: string;
	count: number;
};

export const toggleDarkMode = (context: Context) => {
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

export const extractHeaders = (content: string) => {
	const headerRegex = /^(#{1,6})\s+(.+)$/gm;
	const headers = [];
	let match;

	while ((match = headerRegex.exec(content)) !== null) {
		headers.push({
			level: match[1].length,
			text: match[2].trim(),
			id: match[2]
				.toLowerCase()
				.replace(/[:\s]+/g, '-')
				.replace(/'/g, '')
				.replace(/^-+|-+$/g, '')
		});
	}

	return headers;
};

export const normalizeApostrophes = (str: string): string => {
	return str.replace(/[\u2018\u2019]/g, "'");
};

export const updateUrl = (id: string) => {
	history.pushState(null, '', `#${id}`);
};
