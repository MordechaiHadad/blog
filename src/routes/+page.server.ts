import type { TagEntry } from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/tags.json');
	const tags: TagEntry[] = res.ok ? await res.json() : [];
	return { tags };
};
