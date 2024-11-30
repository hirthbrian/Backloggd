import { IImage } from './commonEntities';
import { ICompany } from './companyEntities';
import { IPlatform } from './platformEntities ';

export type IGameShort = {
	id: number;
	alternative_names?: Array<{
		id: number;
		name: string;
	}>;
	cover: IImage;
	first_released_date?: number;
	involved_companies?: Array<ICompany>;
	name: string;
	platforms: Array<IPlatform>;
	screenshots: Array<IImage>;
	summary?: string;
};
