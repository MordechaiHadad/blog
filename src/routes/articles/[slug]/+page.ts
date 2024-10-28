import { error } from '@sveltejs/kit'
import { read } from '$app/server';

export async function load({ params }) {
	try {
		// const asset = read("/posts/" + params.slug + ".svx");
		const post = await import(`../../../../posts/${params.slug}.svx`)

		return {
			content: post.default,
            slug: params.slug
		}
	} catch (e) {
        console.log(e);
		error(404, `Could not find ${params.slug}`)
	}
}
