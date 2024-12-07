import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import colors from '../themes/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.background,
	},
});

const LoadingPage = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={colors.text} />
		</View>
	);
};

export default LoadingPage;
