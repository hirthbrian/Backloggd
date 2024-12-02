import { getRequest } from '..';
import { IGameShort } from '../../../domain/entities/gameEntities';

const ENDPOINT = '/v4/games';

const FIELDS = `
	cover.image_id,
	name
`;

const getGamesCustomFilter = (filter: string) =>
	getRequest<Array<IGameShort>>(
		ENDPOINT,
		`fields ${FIELDS};
		limit 100;
		${filter}`,
	);

export default getGamesCustomFilter;
