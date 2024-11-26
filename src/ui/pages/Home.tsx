import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import GameList from '../organisms/GameList';
import GameSmallList from '../organisms/GameSmallList';

import mockGameList from '../../infrastructure/mock';

export default function Home() {
	const insets = useSafeAreaInsets();
	const { colors } = useTheme();

	// const [popularGames, setPopularGames] = useState([]);

	// useEffect(() => {
	// 	getPopular().then(setPopularGames);
	// }, []);

	return (
		<ScrollView
			contentContainerStyle={{
				paddingBottom: 20,
				backgroundColor: colors.background,
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
