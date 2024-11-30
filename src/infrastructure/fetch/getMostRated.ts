import { getRequest } from '.';
import { IGameShort } from '../../domain/entities/gameEntities';

const ENDPOINT = '/v4/games';

const FIELDS = `
	cover.image_id,
	name
`;

const getMostRated = () =>
	getRequest<Array<IGameShort>>(
		ENDPOINT,
		`fields ${FIELDS};
		where total_rating_count > 100;
		sort rating_count desc;
		limit 100;`,
	);

export default getMostRated;
