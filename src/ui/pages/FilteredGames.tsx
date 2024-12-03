import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import {
	Pressable,
	RefreshControl,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { useQuery } from 'react-query';

import getGamesCustomFilter from '../../infrastructure/fetch/game/getGamesWithFilter';
import FilterIcon from '../atoms/Icons/FilterIcon';
import { SheetIdEnum } from '../organisms/ActionSheet/sheets';
import GameListColumns from '../organisms/Game/GameListColumns';
import ErrorPage from '../templates/ErrorPage';
import colors from '../themes/colors';

type Props = StaticScreenProps<{
	sortByRating?: boolean;
	collectionId?: number;
}>;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const MOST_RATED = () =>
	'where total_rating_count > 100;sort rating_count desc;';

const BY_COLLECTION = (collectionId: number) =>
	`where collections = ${collectionId};sort rating_count desc;`;

const FilteredGames = ({ route }: Props) => {
	const navigation = useNavigation();

	const renderFilterButton = () => {
		return (
			<Pressable onPress={() => SheetManager.show(SheetIdEnum.FILTER_GAME)}>
				<FilterIcon color={colors.primary} />
			</Pressable>
		);
	};

	useEffect(() => {
		navigation.setOptions({
			headerRight: renderFilterButton,
		});
	}, [navigation]);

	const filters = useMemo(() => {
		let requestString = '';
		if (route.params.sortByRating) {
			requestString += MOST_RATED();
		}
		if (route.params.collectionId) {
			requestString += BY_COLLECTION(route.params.collectionId);
		}
		return requestString;
	}, [route.params]);

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
