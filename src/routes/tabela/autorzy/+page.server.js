import { connect, disconnect } from '$lib/db';

export async function load() {
	const client = await connect();

	try {
		const result = await client.query('SELECT * FROM projekt.autorzy');

		return {
			props: {
				data: result.rows
			}
		};
	} finally {
		await disconnect(client);
	}
}
