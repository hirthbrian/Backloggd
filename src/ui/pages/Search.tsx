import globalStyles from '@themes/globalStyles';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';

import searchGame from '../../infrastructure/fetch/game/searchGame';
import SearchBar from '../molecules/SearchBar';
import GameListShort from '../organisms/Game/GameListShort';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	search: {
		paddingTop: 10,
		...globalStyles.withPadding,
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
			{response.data && <GameListShort data={response?.data} />}
		</View>
	);
}
