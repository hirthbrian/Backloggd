import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';

import { StatusEnum } from '../../domain/enum/StatusEnum';
import getLoggedGames from '../../infrastructure/fetch/game/getLoggedGames';
import SegmentedControl from '../molecules/common/SegmentedControl';
import GameListColumns from '../organisms/Game/GameListColumns';
import ErrorPage from '../templates/ErrorPage';
import LoadingPage from '../templates/LoadingPage';
import colors from '../themes/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
	},
	scrollViewContainer: {
		flex: 1,
	},
});

const VALUES = [StatusEnum.COMPLETED, StatusEnum.PLAYING, StatusEnum.BACKLOG];

const Profile = () => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const query = useQuery(['loggedGames', selectedIndex], () =>
		getLoggedGames(
			'e9a4f011-1fe4-4144-acdd-30b2db5bfc13',
			VALUES[selectedIndex],
		),
	);

	if (query?.isError) {
		return <ErrorPage />;
	}

	return (
		<View style={styles.container}>
			<SegmentedControl
				onChange={setSelectedIndex}
				selectedIndex={selectedIndex}
				values={['Completed', 'Playing', 'Backlog']}
			/>
			<ScrollView
				contentContainerStyle={styles.scrollViewContainer}
				refreshControl={
					<RefreshControl
						colors={[colors.text]}
						tintColor={colors.text}
						refreshing={query.isRefetching}
						onRefresh={query.refetch}
					/>
				}
			>
				{query?.isLoading ? (
					<LoadingPage />
				) : (
					<GameListColumns data={query.data} />
				)}
			</ScrollView>
		</View>
	);
};

export default Profile;
