import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';

import LoadingPage from '../templates/LoadingPage';
import ErrorPage from '../templates/ErrorPage';
import getHomeLists from '../../infrastructure/fetch/getHomeLists';
import GameListHorizontal from '../organisms/Game/GameListHorizontal';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
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
		<ScrollView style={styles.container}>
			<View style={{ gap: 20 }}>
				{response?.data.map((data) => (
					<GameListHorizontal
						key={data.name}
						title={data.name}
						data={data.result}
						onPressSeeMore={() => {
							if (data.name === 'Most Rated') {
								navigation.navigate('Filters', {
									requestFilter: `
									where total_rating_count > 100;
									sort rating_count desc;`,
								});
							} else {
								return null;
							}
						}}
					/>
				))}
			</View>
		</ScrollView>
	);
}
