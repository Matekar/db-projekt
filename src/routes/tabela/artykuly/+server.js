// @ts-nocheck
import { connect, disconnect } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const formData = await request.formData();
	const client = await connect();
	const now = new Date(Date.now());

	const data = [formData.get('tytul'), formData.get('podtytul'), now.toUTCString()];
	let result;

	try {
		result = await client.query(
			'INSERT INTO projekt.artykuly VALUES (DEFAULT, $1, $2, $3, DEFAULT, $3)',
			data
		);

		const id = await client.query('SELECT MAX(id_artykul) AS ID FROM projekt.artykuly');

		const author_result = await client.query(
			'INSERT INTO projekt.relacja_autor_artykul VALUES (DEFAULT, $1, $2)',
			[formData.get('autor'), id.rows[0].id]
		);
	} finally {
		await disconnect(client);
	}

	return json({
		success: true,
		result: result.rows
	});
}
