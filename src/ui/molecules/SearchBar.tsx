import React, { useState } from 'react';
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputSubmitEditingEventData,
	View,
} from 'react-native';
import SearchIcon from '../atoms/Icons/SearchIcon';
import fonts from '../themes/fonts';
import colors from '../themes/colors';
import NormalRegular from '../atoms/Texts/NormalRegular';

type Props = {
	onSubmit: (text: string) => void;
};

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

const SearchBar = ({ onSubmit }: Props) => {
	const [text, setText] = useState('');

	const onSubmitEditing = (
		event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
	) => onSubmit(event.nativeEvent.text);

	return (
		<View style={styles.container}>
			<TextInput
				autoFocus
				value={text}
				style={styles.input}
				onChangeText={setText}
				placeholderTextColor={colors.text_secondary}
				enterKeyHint="search"
				placeholder="Search"
				onSubmitEditing={onSubmitEditing}
			/>
			<SearchIcon color={colors.text} />
		</View>
	);
};

export default SearchBar;
