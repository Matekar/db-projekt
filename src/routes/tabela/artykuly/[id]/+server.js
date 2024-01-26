// @ts-nocheck
import { connect, disconnect } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, params }) {
	const formData = await request.formData();
	const client = await connect();

	const requestType = formData.get('type');

	return json({
		success: true
	});
}
