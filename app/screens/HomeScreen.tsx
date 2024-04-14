import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import getPopular from '../api';
import GameList from '../components/list/GameList';
import GameSmallList from '../components/list/GameSmallList';
import mockGameList from '../mock';

import SearchScreen from './SearchScreen';

export default function HomeScreen() {
	const insets = useSafeAreaInsets();
	// const [popularGames, setPopularGames] = useState([]);

	// useEffect(() => {
	// 	getPopular().then(setPopularGames);
	// }, []);

	return (
		<ScrollView
			contentContainerStyle={{
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
			}}
		>
			{/* <SearchScreen /> */}
			<GameList
				title="Popular Games"
				subtitle="Don't miss the most popular games on OpenCritic today"
				data={mockGameList.popular}
			/>
			<GameSmallList title="Recently Released" data={mockGameList.popular} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	titles: {
		paddingHorizontal: 15,
	},
});
