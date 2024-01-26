import { connect, disconnect } from '$lib/db';

export async function load() {
	const client = await connect();

	try {
		const result = await client.query(
			'SELECT id_redaktor AS "ID", imie_redaktor AS "Imie", nazwisko_redaktor AS "Nazwisko" FROM projekt.redaktorzy'
		);

		const articleCount = await client.query('SELECT count FROM projekt.rip');

		return {
			props: {
				data: result.rows,
				articleCount: articleCount.rows
			}
		};
	} finally {
		await disconnect(client);
	}
}
