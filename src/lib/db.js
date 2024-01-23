import pkg from 'pg';
const { Client } = pkg;

import { PGUSER, PGHOST, PGDB, PGPASS } from '$env/static/private';

/**
 * Connect to PostgreSQL
 *
 * @returns client to connected db
 */
export async function connect() {
	const client = new Client({
		user: PGUSER,
		host: PGHOST,
		database: PGDB,
		password: PGPASS,
		port: 5432
	});

	await client.connect();
	return client;
}

/**
 * Disconnects client
 *
 * @param {pkg.Client} client client to be disconnected
 */
export async function disconnect(client) {
	await client.end();
}
