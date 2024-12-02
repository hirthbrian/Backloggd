import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';

import LoadingPage from '../templates/LoadingPage';
import ErrorPage from '../templates/ErrorPage';
import getHomeLists from '../../infrastructure/fetch/getHomeLists';
import GameListHorizontal from '../organisms/Game/GameListHorizontal';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
	},
});

export default function Home() {
	const response = useQuery(['getHomeList'], getHomeLists);

	if (response?.isLoading) {
		return <LoadingPage />;
	}
	if (response?.isError) {
		return <ErrorPage />;
	}

	return (
		<ScrollView style={styles.container}>
			{/* <GameListStack title={'Recently trending'} data={response?.data} /> */}
			<View style={{ gap: 20 }}>
				{response?.data.map((data) => (
					<GameListHorizontal
						key={data.name}
						title={data.name}
						data={data.result}
					/>
				))}
			</View>
		</ScrollView>
	);
}
