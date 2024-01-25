import { connect, disconnect } from '$lib/db';

export async function load() {
	const client = await connect();

	try {
		const result = await client.query(
			'SELECT id_artykul as "ID", tytul as "Tytuł", data_utworzenia as "Data utworzenia" FROM projekt.artykuly ORDER BY id_artykul'
		);

		return {
			props: {
				data: result.rows
			}
		};
	} finally {
		await disconnect(client);
	}
}
