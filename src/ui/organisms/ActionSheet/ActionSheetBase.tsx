import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

import { triggerHaptic } from '../../../infrastructure/lib/hapticFeedback';
import colors from '../../themes/colors';
import globalStyles from '../../themes/globalStyles';

type Props = {
	children: ReactElement | Array<ReactElement>;
	containerStyle?: ViewStyle;
};

const styles = StyleSheet.create({
	actionSheetcontainer: {
		backgroundColor: colors.background,
		paddingTop: 5,
		...globalStyles.paddingHorizontal,
	},
	indicator: {
		height: 4,
		backgroundColor: colors.background_light,
		paddingBottom: 5,
	},
});

const ActionSheetBase = ({ children, containerStyle }: Props) => {
	useEffect(() => {
		triggerHaptic();
	}, []);

	return (
		<ActionSheet
			gestureEnabled
			indicatorStyle={styles.indicator}
			containerStyle={styles.actionSheetcontainer}
		>
			<View style={containerStyle}>{children}</View>
		</ActionSheet>
	);
};

export default ActionSheetBase;
