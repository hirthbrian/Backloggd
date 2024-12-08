import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';

import FilterGameSheet from './FilterGameSheet';
import LogGameSheet from './LogGameSheet';
import SortByGameSheet from './SortByGameSheet';

export enum SheetIdEnum {
	FILTER_GAME = 'filter-game',
	LOG_GAME = 'log-game',
	SORT_BY_GAME = 'sort-by-game',
}

registerSheet(SheetIdEnum.FILTER_GAME, FilterGameSheet);
registerSheet(SheetIdEnum.LOG_GAME, LogGameSheet);
registerSheet(SheetIdEnum.SORT_BY_GAME, SortByGameSheet);

declare module 'react-native-actions-sheet' {
	interface Sheets {
		[SheetIdEnum.FILTER_GAME]: SheetDefinition;
		[SheetIdEnum.LOG_GAME]: SheetDefinition<{
			payload: {
				id: number;
				name: string;
			};
		}>;
		[SheetIdEnum.SORT_BY_GAME]: SheetDefinition;
	}
}

export {};
