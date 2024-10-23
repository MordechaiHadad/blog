export interface IContext {
	currentTab: number;
	isDarkMode: boolean;
}

export const toggleDarkMode = (context: IContext) => {
	context.isDarkMode = !context.isDarkMode;
	document.documentElement.classList.toggle('dark', context.isDarkMode);
	localStorage.setItem('theme', context.isDarkMode ? 'dark' : 'light');
};
