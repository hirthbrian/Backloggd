import { getRequest } from '..';
import { IGameShort } from '../../../domain/entities/gameEntities';

const ENDPOINT = '/v4/games';

const FIELDS = `
	cover.image_id,
	first_release_date,
	involved_companies.company.name,
	involved_companies.developer,
	name,
	platforms.name,
	platforms.platform_logo.image_id,
	screenshots.image_id,
	summary
`;

const getGameDetails = (id: number) =>
	getRequest<Array<IGameShort>>(
		ENDPOINT,
		`fields ${FIELDS};
		where id = (${id});`,
	).then((res) => res[0]);

export default getGameDetails;
