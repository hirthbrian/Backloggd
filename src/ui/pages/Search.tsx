import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from '../molecules/SearchBar';
import searchGame from '../../infrastructure/fetch/searchGame';
import { useQuery } from 'react-query';
import NormalRegular from '../atoms/Texts/NormalRegular';
import GameListShort from '../organisms/Game/GameListShort';
import globalStyles from '../themes/globalStyles';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	search: {
		paddingTop: 10,
		...globalStyles.paddingHorizontal,
	},
});

export default function Search() {
	const [query, setQuery] = useState('');
	const response = useQuery(['searchGame', query], () => searchGame(query));

	const onSearch = (text: string) => {
		setQuery(text);
	};

	return (
		<View style={styles.container}>
			<View style={styles.search}>
				<SearchBar onSubmit={onSearch} />
			</View>
			<GameListShort data={response?.data} />
		</View>
	);
}