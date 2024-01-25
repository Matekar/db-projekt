// @ts-nocheck
import { connect, disconnect } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const formData = await request.formData();
	const client = await connect();

	const data = [formData.get('imie'), formData.get('nazwisko')];
	let result;

	try {
		result = await client.query('INSERT INTO projekt.redaktorzy VALUES (DEFAULT, $1, $2)', data);
	} finally {
		await disconnect(client);
	}

	return json({
		success: true,
		result: result.rows
	});
}
