import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import getHomeLists from '../../infrastructure/fetch/getHomeLists';
import GameListHorizontal from '../organisms/Game/GameListHorizontal';
import ErrorPage from '../templates/ErrorPage';
import LoadingPage from '../templates/LoadingPage';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
	},
	contentContainer: {
		gap: 20,
	},
});

export default function Home() {
	const navigation = useNavigation();
	const response = useQuery(['getHomeList'], getHomeLists);

	if (response?.isLoading) {
		return <LoadingPage />;
	}
	if (response?.isError) {
		return <ErrorPage />;
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			{response?.data.map((data) => (
				<GameListHorizontal
					key={data.name}
					title={data.name}
					data={data.result}
					onPressSeeMore={() => {
						if (data.name === 'Most Rated') {
							navigation.navigate('FilteredGames', {
								sortByRating: true,
							});
						} else {
							return null;
						}
					}}
				/>
			))}
		</ScrollView>
	);
}
