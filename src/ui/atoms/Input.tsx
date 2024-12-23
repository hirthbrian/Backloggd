import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import colors from '../themes/colors';
import fonts from '../themes/fonts';

type Props = {} & TextInputProps;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 4,
		borderColor: colors.text,
		gap: 10,
		backgroundColor: colors.background_highlight,
	},
	input: {
		flex: 1,
		fontSize: 14,
		fontFamily: fonts.regular,
		fontWeight: '400',
		color: colors.text,
	},
});

const Input = (props: Props) => {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholderTextColor={colors.text_secondary}
				{...props}
			/>
		</View>
	);
};

export default Input;
