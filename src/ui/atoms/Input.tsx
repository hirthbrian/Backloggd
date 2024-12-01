import React, { useState } from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputProps,
	TextInputSubmitEditingEventData,
	View,
} from 'react-native';
import fonts from '../themes/fonts';
import colors from '../themes/colors';

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
