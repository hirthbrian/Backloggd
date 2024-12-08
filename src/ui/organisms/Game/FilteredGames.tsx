import { IGameShort } from '@entities/gameEntities';
import colors from '@themes/colors';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import GameListColumns from './GameListColumns';

type Props = {
	data: Array<IGameShort>;
	isRefetching: boolean;
	refetch: () => void;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const FilteredGames = ({ data, isRefetching, refetch }: Props) => {
	return (
		<View style={styles.container}>
			<ScrollView
				refreshControl={
					<RefreshControl
						colors={[colors.text]}
						tintColor={colors.text}
						refreshing={isRefetching}
						onRefresh={refetch}
					/>
				}
			>
				<GameListColumns data={data} />
			</ScrollView>
		</View>
	);
};

export default FilteredGames;
