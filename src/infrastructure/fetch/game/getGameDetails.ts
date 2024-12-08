import { IGameShort } from '@entities/gameEntities';

import { getRequest } from '..';

const ENDPOINT = '/v4/games';

const FIELDS = `
	collections.games,
	collections.games.cover.image_id,
	collections.games.name,
	collections.name,
	cover.image_id,
	first_release_date,
	involved_companies.company.name,
	involved_companies.developer,
	name,
	platforms.name,
	platforms.platform_logo.image_id,
	screenshots.height,
	screenshots.image_id,
	screenshots.width,
	similar_games,
	similar_games.cover.image_id,
	similar_games.name,
	summary
`;

const getGameDetails = (id: number) =>
	getRequest<Array<IGameShort>>(
		ENDPOINT,
		`fields ${FIELDS};
		where id = (${id});`,
	).then((res) => res[0]);

export default getGameDetails;
