import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';

import LogGameSheet from './LogGameSheet';

export enum SheetIdEnum {
	LOG_GAME = 'log-game',
}

registerSheet(SheetIdEnum.LOG_GAME, LogGameSheet);

declare module 'react-native-actions-sheet' {
	interface Sheets {
		[SheetIdEnum.LOG_GAME]: SheetDefinition<{
			payload: {
				id: number;
				name: string;
			};
		}>;
	}
}

export {};
