const IGDB_BASE_URL = 'https://api.igdb.com';

import { TWITCH_ACCESS_TOKEN,TWITCH_CLIENT_ID } from '../../../secrets';

const headers = {
	Accept: 'application/json',
	'Client-ID': TWITCH_CLIENT_ID,
	Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
};

export async function getRequest<T>(
	endpoint: string,
	body: string,
): Promise<T> {
	const res = await fetch(`${IGDB_BASE_URL}${endpoint}`, {
		method: 'POST',
		headers,
		body,
	});
	return await res.json();
}
