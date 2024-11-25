import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import NormalRegular from '../../ui/atoms/Texts/NormalRegular';
import NormalLight from '../../ui/atoms/Texts/NormalLight';

interface Filters {
	id: string;
	label: string;
}

interface FilterBannerProps {
	filters: Array<Filters>;
	highlightedFilter: string;
	onFilterSelected: (id: string) => void;
}

export const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	pillContainer: {
		justifyContent: 'center',
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 8,
		height: 32,
	},
});

export function FilterBanner({
	filters,
	highlightedFilter,
	onFilterSelected,
}: FilterBannerProps) {
	const { colors } = useTheme();

	const renderItem = ({ item }: { item: Filters }) => {
		const { id, label } = item;
		const isHighlighted = highlightedFilter === id;
		return (
			<Pressable key={item.id} onPress={() => onFilterSelected(id)}>
				<View
					style={[
						styles.pillContainer,
						{
							backgroundColor: isHighlighted ? colors.primary : colors.border,
						},
					]}
				>
					{isHighlighted ? (
						<NormalRegular color={colors.background}>{label}</NormalRegular>
					) : (
						<NormalLight>{label}</NormalLight>
					)}
				</View>
			</Pressable>
		);
	};

	const renderSeparator = () => <View style={{ width: 5 }} />;

	return (
		<FlatList
			horizontal
			data={filters}
			renderItem={renderItem}
			style={{ backgroundColor: colors.background }}
			contentContainerStyle={styles.container}
			ItemSeparatorComponent={renderSeparator}
		/>
	);
}

export default FilterBanner;
