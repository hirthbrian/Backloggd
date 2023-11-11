import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import GameList from '../components/list/GameList';
import GameSmallList from '../components/list/GameSmallList';
import mockGameList from '../mock';

export default function HomeScreen() {
	return (
		<ScrollView>
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
