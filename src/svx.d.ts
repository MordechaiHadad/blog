declare module '*.svx' {
	import type { ComponentType } from 'svelte';
	const component: ComponentType;
	export default component;
}
