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

		/**
		 * @type {number[]}
		 */
		const currentAuthorsIDs = [];
		authors.rows.forEach((v) => currentAuthorsIDs.push(v.id));

		const availableAuthors = await client.query(
			'SELECT * FROM projekt.autorzy WHERE id_author != ANY($1::integer[])',
			[currentAuthorsIDs]
		);

		/**
		 * @type {number[]}
		 */
		const currentRedactorsIDs = [];
		redactors.rows.forEach((v) => currentRedactorsIDs.push(v.id));
		if (currentRedactorsIDs.length == 0) currentRedactorsIDs.push(0);

		const availableRedactors = await client.query(
			'SELECT * FROM projekt.redaktorzy WHERE id_redaktor != ANY($1::integer[])',
			[currentRedactorsIDs]
		);

		const cites = await client.query(
			`SELECT art.tytul FROM projekt.cytowania cyt
      JOIN projekt.artykuly art ON cyt.id_zacytowane = art.id_artykul
      WHERE cyt.id_przez = $1`,
			[params.id]
		);

		const availableToCite = await client.query(
			'SELECT id_artykul, tytul FROM projekt.sfinalizowane_artykuly WHERE id_artykul != $1',
			[params.id]
		);

		return {
			props: {
				data: {
					...result.rows[0],
					autorzy: authors.rows,
					redaktorzy: redactors.rows,
					cytuje: cites.rows
				},
				formOptions: {
					availableAuthors: availableAuthors.rows,
					availableRedactors: availableRedactors.rows,
					availableToCite: availableToCite.rows
				}
			}
		};
	} finally {
		await disconnect(client);
	}
}
