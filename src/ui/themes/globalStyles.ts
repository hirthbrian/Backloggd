import { StyleSheet } from 'react-native';

import colors from './colors';

export type StyleSheetProps = {
	width?: number;
	backgroundColor?: string;
};

export default StyleSheet.create({
	withPadding: {
		paddingHorizontal: 15,
	},
	withBorder: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.background_light,
	},
});
