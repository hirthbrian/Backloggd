const OPEN_CRITIC_BASE_URL = 'https://opencritic-api.p.rapidapi.com';
const OPEN_CRITIC_TOKEN = 'b0610e51fcmsha875b3aaf8ec51cp173e70jsn13522d3c47a5';

const GET_POPULAR_ENDPOINT = '/game/popular';
const SEARCH_ENDPOINT = '/game/search';
const GAME_DETAILS_ENDPOINT = '/game';

const headers = {
	'X-RapidAPI-Key': OPEN_CRITIC_TOKEN,
	'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com',
};

const getRequest = (endpoint: string) =>
	fetch(`${OPEN_CRITIC_BASE_URL}${endpoint}`, { method: 'GET', headers }).then(
		(response) => response.json(),
	);

export const getPopular = () => {
	return getRequest(GET_POPULAR_ENDPOINT);
};

export const getGameDetails = (id: number) => {
	return getRequest(`${GAME_DETAILS_ENDPOINT}/${id.toString()}`);
};

export const search = (input: string) => {
	return getRequest(`${SEARCH_ENDPOINT}?criteria=${input}`);
};
