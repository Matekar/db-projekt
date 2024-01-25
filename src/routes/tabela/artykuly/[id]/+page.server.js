import { connect, disconnect } from '$lib/db';

export async function load({ params }) {
	const client = await connect();

	try {
		const result = await client.query(
			'SELECT * FROM projekt.artykuly WHERE id_artykul=$1 ORDER BY id_artykul',
			[params.id]
		);

		return {
			props: {
				data: result.rows[0]
			}
		};
	} finally {
		await disconnect(client);
	}
}
