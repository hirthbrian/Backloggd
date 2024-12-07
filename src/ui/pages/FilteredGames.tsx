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
import SortByIcon from '../atoms/Icons/SortByIcon';
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
	headerRightContainer: {
		gap: 10,
		flexDirection: 'row',
	},
});

const MOST_RATED = () =>
	'where total_rating_count > 100;sort rating_count desc;';

const BY_COLLECTION = (collectionId: number) =>
	`where collections = ${collectionId};sort rating_count desc;`;

const FilteredGames = ({ route }: Props) => {
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
