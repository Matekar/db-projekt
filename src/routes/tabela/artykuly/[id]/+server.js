// @ts-nocheck
import { connect, disconnect } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, params }) {
	const formData = await request.formData();
	const client = await connect();

	try {
		if (formData.get('autor')) {
			const authorID = formData.get('autor');

			const res = await client.query(
				'INSERT INTO projekt.relacja_autor_artykul VALUES (DEFAULT, $1, $2)',
				[authorID, params.id]
			);
		}

		if (formData.get('redaktor')) {
			const redactorID = formData.get('redaktor');
			const rola = formData.get('rola');

			const res = await client.query(
				'INSERT INTO projekt.relacja_redaktor_artykul VALUES (DEFAULT, $1, $2, $3)',
				[redactorID, params.id, rola]
			);
		}

		if (formData.get('cytowany')) {
			const cytowanyID = formData.get('cytowany');

			const res = await client.query('INSERT INTO projekt.cytowania VALUES (DEFAULT, $1, $2)', [
				cytowanyID,
				params.id
			]);
		}

		if (formData.get('finalize')) {
			const res = await client.query(
				`UPDATE projekt.artykuly SET status='FINALIZACJA' WHERE id_artykul=$1`,
				[params.id]
			);
		}
	} finally {
		await disconnect(client);

		return json({
			success: true
		});
	}
}
