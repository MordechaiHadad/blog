import matter from 'gray-matter';
import { resolve, join } from 'path';

interface TagEntry {
	name: string;
	slug: string;
	count: number;
}

const POSTS_DIR = resolve(import.meta.dirname!, '../posts');
const OUTPUT_PATH = resolve(import.meta.dirname!, '../static/tags.json');

async function buildTags() {
	const tagMap = new Map<string, { name: string; count: number }>();

	for await (const entry of Deno.readDir(POSTS_DIR)) {
		if (!entry.isFile || !entry.name.endsWith('.svx')) continue;

		const filePath = join(POSTS_DIR, entry.name);
		const content = await Deno.readTextFile(filePath);
		const { data } = matter(content);

		const tags: string[] | undefined = data.tags;
		if (!tags || !Array.isArray(tags)) continue;

		for (const tag of tags) {
			const slug = tag.toLowerCase();
			const existing = tagMap.get(slug);

			if (existing) {
				existing.count++;
			} else {
				tagMap.set(slug, { name: tag, count: 1 });
			}
		}
	}

	const tags: TagEntry[] = Array.from(tagMap.values())
		.map(({ name, count }) => ({
			name,
			slug: name.toLowerCase(),
			count
		}))
		.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

	await Deno.writeTextFile(OUTPUT_PATH, JSON.stringify(tags, null, 2));

	console.log(`✅ Built tags.json with ${tags.length} tags from ${POSTS_DIR}`);
	for (const tag of tags) {
		console.log(`   - ${tag.name} (${tag.slug}): ${tag.count} post${tag.count > 1 ? 's' : ''}`);
	}
}

buildTags().catch((err) => {
	console.error('❌ Failed to build tags:', err);
	Deno.exit(1);
});
