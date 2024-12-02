import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import GameListColumns from '../organisms/Game/GameListColumns';
import { useQuery } from 'react-query';
import ErrorPage from '../templates/ErrorPage';
import colors from '../themes/colors';
import getGamesCustomFilter from '../../infrastructure/fetch/game/getGamesWithFilter';
import { StaticScreenProps } from '@react-navigation/native';

type Props = StaticScreenProps<{
	requestFilter: string;
}>;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const Filters = ({ route }: Props) => {
	const query = useQuery(['filteredGames', route?.params?.requestFilter], () =>
		getGamesCustomFilter(route?.params?.requestFilter),
	);

	if (query?.isError) {
		return <ErrorPage />;
	}

	return (
		<View style={styles.container}>
			<ScrollView
				refreshControl={
					<RefreshControl
						colors={[colors.text]}
						tintColor={colors.text}
						refreshing={query.isRefetching}
						onRefresh={query.refetch}
					/>
				}
			>
				<GameListColumns data={query.data} />
			</ScrollView>
		</View>
	);
};

export default Filters;
