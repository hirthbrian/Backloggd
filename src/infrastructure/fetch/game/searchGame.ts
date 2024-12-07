import { IGameShort } from '../../../domain/entities/gameEntities';
import { getRequest } from '..';

const ENDPOINT = '/v4/games';

const FIELDS = `
	cover.image_id,
	first_release_date,
	name,
	platforms.name
`;

const searchGame = (query: string) =>
	getRequest<Array<IGameShort>>(
		ENDPOINT,
		`search "${query}";
		fields ${FIELDS};`,
	);

export default searchGame;
