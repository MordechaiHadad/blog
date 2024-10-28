import { error } from '@sveltejs/kit';
import { read } from '$app/server';

export async function load({ params }) {
	return {
		slug: params.slug
	};
}
