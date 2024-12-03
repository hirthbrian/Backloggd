import { getRequest } from '.';
import { IGameShort } from '../../domain/entities/gameEntities';

const ENDPOINT = '/v4/multiquery';

const FIELDS = `
	cover.image_id,
	name
`;

const MOST_RATED = `
	query games "Most Rated" {
		fields ${FIELDS};
		where total_rating_count > 100;
		sort rating_count desc;
	};
`;

const NEW_RELEASE = `
	query games "New Release" {
		fields ${FIELDS};
		where first_release_date > ${Date.now()};
		sort first_release_date desc;
	};
`;

const getHomeLists = () =>
	getRequest<
		Array<{
			name: string;
			result: Array<IGameShort>;
		}>
	>(ENDPOINT, `${MOST_RATED}${NEW_RELEASE}`);

export default getHomeLists;
