import { getPosts } from '$lib/posts';
import { compile } from 'mdsvex';

export async function GET() {
	const posts = await getPosts();

	const headers = { 'Content-Type': 'application/xml' };

	const processedPosts = await Promise.all(
		posts.map(async (post) => {
			if (!post.content || post.content.length === 0) return post;
			const result = await compile(post.content);
			if (!result?.code) return post;
			return { ...post, content: result.code };
		})
	);

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
			<channel>
				<title>Mordechai's Blog</title>
				<description>It's just a blog bruzzer</description>
				<link>https://mord-blog.vercel.app/</link>
				<atom:link href="https://mord-blog.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
				${processedPosts
					.map(
						(post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>https://mord-blog.vercel.app/articles/${post.slug}</link>
							<guid isPermaLink="true">https://mord-blog.vercel.app/articles/${post.slug}</guid>
							<pubDate>${post.date.toUTCString()}</pubDate>
                            <content:encoded><![CDATA[${post.content}]]></content:encoded>
						</item>
					`
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, { headers });
}
