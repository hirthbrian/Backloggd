import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import GameListColumns from '../organisms/Game/GameListColumns';
import { useQuery } from 'react-query';
import ErrorPage from '../templates/ErrorPage';
import colors from '../themes/colors';
import getGamesCustomFilter from '../../infrastructure/fetch/game/getGamesWithFilter';
import { StaticScreenProps } from '@react-navigation/native';

type Props = StaticScreenProps<{
	filters: {
		sortByRating?: boolean;
	};
}>;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const MOST_RATED = 'where total_rating_count > 100;sort rating_count desc;';

const FilteredGames = ({ route }: Props) => {
	const filters = useMemo(() => {
		let requestString = '';
		if (route.params.filters.sortByRating) {
			requestString += MOST_RATED;
		}
		return requestString;
	}, [route.params.filters]);

	const query = useQuery(['filteredGames', filters], () =>
		getGamesCustomFilter(filters),
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

export default FilteredGames;
