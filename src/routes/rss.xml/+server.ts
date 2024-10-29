import { getPosts } from "$lib/posts";

export async function GET() {
	const posts = await getPosts();

	const headers = { 'Content-Type': 'application/xml' }

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>Mordechai's Blog</title>
				<description>It's just a blog bruzzer</description>
				<link>https://mord-blog.vercel.app/</link>
				<atom:link href="https://mord-blog.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>https://mord-blog.vercel.app/articles/${post.slug}</link>
							<guid isPermaLink="true">https://mord-blog.vercel.app/articles/${post.slug}</guid>
							<pubDate>${post.date.toUTCString()}</pubDate>
						</item>
					`
					)
					.join('')}
			</channel>
		</rss>
	`.trim()

	return new Response(xml, { headers })
}
