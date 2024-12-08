import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { useQuery } from 'react-query';

import getGamesCustomFilter from '../../infrastructure/fetch/game/getGamesWithFilter';
import FilterIcon from '../atoms/Icons/FilterIcon';
import SortByIcon from '../atoms/Icons/SortByIcon';
import { SheetIdEnum } from '../organisms/ActionSheet/sheets';
import FilteredGames from '../organisms/Game/FilteredGames';
import ErrorPage from '../templates/ErrorPage';
import LoadingPage from '../templates/LoadingPage';
import colors from '../themes/colors';

type Props = StaticScreenProps<{
	sortByRating?: boolean;
	collectionId?: number;
}>;

const styles = StyleSheet.create({
	headerRightContainer: {
		gap: 10,
		flexDirection: 'row',
	},
});

const MOST_RATED = () =>
	'where total_rating_count > 100;sort rating_count desc;';

const BY_COLLECTION = (collectionId: number) =>
	`where collections = ${collectionId};sort rating_count desc;`;

const FilteredGamesScreen = ({ route }: Props) => {
	const navigation = useNavigation();

	const headerRight = () => {
		return (
			<View style={styles.headerRightContainer}>
				<Pressable onPress={() => SheetManager.show(SheetIdEnum.FILTER_GAME)}>
					<FilterIcon color={colors.primary} />
				</Pressable>
				<Pressable onPress={() => SheetManager.show(SheetIdEnum.SORT_BY_GAME)}>
					<SortByIcon color={colors.primary} />
				</Pressable>
			</View>
		);
	};

	useEffect(() => {
		navigation.setOptions({ headerRight });
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

	if (query?.isLoading) {
		return <LoadingPage />;
	}

	if (query?.isError) {
		return <ErrorPage />;
	}

	if (query.data) {
		return (
			<FilteredGames
				data={query.data}
				isRefetching={query.isRefetching}
				refetch={() => query.refetch()}
			/>
		);
	}

	return null;
};

export default FilteredGamesScreen;
