import React from 'react';
import { StyleSheet, View } from 'react-native';
import NormalRegular from '../atoms/Texts/NormalRegular';

type Props = {
	errorMessage?: string;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const ErrorPage = ({ errorMessage = 'Content missing' }: Props) => {
	return (
		<View style={styles.container}>
			<NormalRegular textAlign="center">{errorMessage}</NormalRegular>
		</View>
	);
};

export default ErrorPage;