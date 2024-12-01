import { getRequest } from '..';
import { IGameShort } from '../../../domain/entities/gameEntities';

const ENDPOINT = '/v4/games';

const FIELDS = `
	cover.image_id,
	name
`;

const getGameByIds = (ids: Array<number>) =>
	getRequest<Array<IGameShort>>(
		ENDPOINT,
		`fields ${FIELDS};
		where id = (${ids.join(',')});`,
	);

export default getGameByIds;
