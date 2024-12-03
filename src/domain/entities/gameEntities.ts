import { IImage } from './commonEntities';
import { ICompany } from './companyEntities';
import { IPlatform } from './platformEntities ';

export type IGameShort = {
	id: number;
	collections: Array<{
		id: number;
		name: string;
		games: Array<IGameShort>;
	}>;
	cover: IImage;
	first_released_date?: number;
	involved_companies?: Array<ICompany>;
	name: string;
	platforms?: Array<IPlatform>;
	screenshots?: Array<IImage>;
	similar_games: Array<IGameShort>;
	summary?: string;
};
