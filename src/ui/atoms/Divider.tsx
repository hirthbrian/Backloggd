import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import colors from '../themes/colors';

type Props = {
	color?: string;
	style?: ViewStyle;
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	divider: {
		height: 1,
	},
});

function Divider({ color = colors.background_light, style }: Props) {
	return (
		<View style={[styles.container, style]}>
			<View style={[styles.divider, { backgroundColor: color }]} />
		</View>
	);
}

export default Divider;
