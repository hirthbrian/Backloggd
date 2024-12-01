import React from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';

import getLoggedGames from '../../infrastructure/fetch/getLoggedGames';
import GameListColumns from '../organisms/Game/GameListColumns';
import { useQuery } from 'react-query';
import LoadingPage from '../templates/LoadingPage';
import ErrorPage from '../templates/ErrorPage';
import colors from '../themes/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonContainer: {
		gap: 10,
	},
});

const Profile = () => {
	const query = useQuery(['loggedGames'], () => getLoggedGames());

	if (query?.isLoading) return <LoadingPage />;
	if (query?.isError) return <ErrorPage />;

	return (
		<ScrollView
			refreshControl={
				<RefreshControl
					colors={[colors.text]}
					tintColor={colors.text}
					refreshing={query.isRefetching}
					onRefresh={query.refetch}
				/>
			}
			style={styles.container}
		>
			<GameListColumns data={query.data} />
		</ScrollView>
	);
};

export default Profile;
