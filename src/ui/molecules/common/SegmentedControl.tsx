import React from 'react';
import { StyleSheet } from 'react-native';
import SegmentedControlLib from '@react-native-segmented-control/segmented-control';

import colors from '../../themes/colors';
import fonts from '../../themes/fonts';

type Props = {
	onChange: (index: number) => void;
	selectedIndex: number;
	values: Array<string>;
};

const styles = StyleSheet.create({
	font: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: fonts.regular,
		fontWeight: '400',
		color: colors.text,
	},
	activeFont: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: fonts.semiBold,
		fontWeight: '600',
		color: colors.white,
	},
	container: {
		marginHorizontal: 15,
		backgroundColor: colors.background_highlight,
	},
});

const SegmentedControl = ({ onChange, selectedIndex, values }: Props) => {
	return (
		<SegmentedControlLib
			values={values}
			selectedIndex={selectedIndex}
			onChange={(event) => onChange(event.nativeEvent.selectedSegmentIndex)}
			fontStyle={styles.font}
			style={styles.container}
			activeFontStyle={styles.activeFont}
			tintColor={colors.background_light}
		/>
	);
};

export default SegmentedControl;
