import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import getHomeLists from '../../infrastructure/fetch/getHomeLists';
import WelcomeMessage from '../molecules/WelcomeMessage';
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
			<WelcomeMessage />
			{response?.data?.map((data) => (
				<GameListHorizontal
					key={data.name}
					title={data.name}
					data={data.result}
				/>
			))}
		</ScrollView>
	);
}
