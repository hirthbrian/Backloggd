import React from 'react';
import { StyleSheet } from 'react-native';
import SegmentedControlLib from '@react-native-segmented-control/segmented-control';

import colors from '../../themes/colors';
import globalStyles from '../../themes/globalStyles';
import fonts from '../../themes/fonts';

type Props = {
	onChange: (index: number) => void;
	selectedIndex: number;
	values: Array<string>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...globalStyles.paddingHorizontal,
	},
	itemsContainer: {
		flexDirection: 'row',
		backgroundColor: colors.background_highlight,
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	separator: {
		width: 1,
		height: '80%',
		backgroundColor: 'red',
	},
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
});

const SegmentedControl = ({ onChange, selectedIndex, values }: Props) => {
	return (
		<SegmentedControlLib
			values={values}
			selectedIndex={selectedIndex}
			onChange={(event) => onChange(event.nativeEvent.selectedSegmentIndex)}
			fontStyle={styles.font}
			style={{
				marginHorizontal: 15,
				backgroundColor: colors.background_highlight,
			}}
			activeFontStyle={styles.activeFont}
			tintColor={colors.background_light}
		/>
	);
};

export default SegmentedControl;
