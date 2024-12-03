import { StyleSheet } from 'react-native';

export type StyleSheetProps = {
	width?: number;
	backgroundColor?: string;
};

export default StyleSheet.create({
	paddingHorizontal: {
		paddingHorizontal: 15,
	},
});
