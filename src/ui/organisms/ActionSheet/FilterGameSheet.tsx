import NormalRegular from '@texts/NormalRegular';
import SectionTitle from '@texts/SectionTitle';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SheetProps } from 'react-native-actions-sheet';

import colors from '../../themes/colors';
import ActionSheetBase from './ActionSheetBase';
import { SheetIdEnum } from './sheets';

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	itemContainer: {
		padding: 10,
		borderRadius: 5,
	},
});

const filters = [
	{ name: 'Game Title' },
	{ name: 'Trending' },
	{ name: 'Release Date' },
	{ name: 'Popularity' },
	{ name: 'Avg Rating' },
];

const FilterGameSheet = ({}: SheetProps<SheetIdEnum.FILTER_GAME>) => {
	const renderItem = ({ name }: { name: string }) => {
		return (
			<Pressable key={name}>
				{({ pressed }) => (
					<View
						style={[
							styles.itemContainer,
							{
								backgroundColor: pressed
									? colors.primary
									: colors.background_light,
							},
						]}
					>
						<NormalRegular color={pressed ? colors.white : colors.text}>
							{name}
						</NormalRegular>
					</View>
				)}
			</Pressable>
		);
	};

	return (
		<ActionSheetBase containerStyle={styles.container}>
			<>
				<SectionTitle>Filter by</SectionTitle>
				{filters.map(renderItem)}
			</>
		</ActionSheetBase>
	);
};

export default FilterGameSheet;
