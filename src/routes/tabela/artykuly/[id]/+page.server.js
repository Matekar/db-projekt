import { connect, disconnect } from '$lib/db';

export async function load({ params }) {
	const client = await connect();

	try {
		const result = await client.query(
			'SELECT * FROM projekt.artykuly WHERE id_artykul=$1 ORDER BY id_artykul',
			[params.id]
		);

		const authors = await client.query('SELECT * FROM projekt.autorzy_artykulu($1)', [params.id]);

		const redactors = await client.query('SELECT * FROM projekt.redaktorzy_artykulu($1)', [
			params.id
		]);

		return {
			props: {
				data: {
					...result.rows[0],
					autorzy: authors.rows,
					redaktorzy: redactors.rows
				}
			}
		};
	} finally {
		await disconnect(client);
	}
}
