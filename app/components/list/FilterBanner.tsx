import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../constants/Colors';
import { NormalLight, NormalRegular } from '../Texts';

interface Filters {
	id: string;
	label: string;
}

interface FilterBannerProps {
	filters: Array<Filters>;
	highlightedFilter: string;
	onFilterSelected: (id: string) => void;
}

const FilterPillContainer = styled.View<{ isHighlighted: boolean }>`
	background-color: ${({ isHighlighted }) =>
		isHighlighted ? Colors.primary : Colors.lightGrey};
	justify-content: center;
	border-radius: 20px;
	padding: 8px 16px;
	height: 32px;
`;

export function FilterBanner({
	filters,
	highlightedFilter,
	onFilterSelected,
}: FilterBannerProps) {
	const renderItem = ({ item }: { item: Filters }) => {
		const { id, label } = item;
		const isHighlighted = highlightedFilter === id;
		return (
			<Pressable key={item.id} onPress={() => onFilterSelected(id)}>
				<FilterPillContainer isHighlighted={isHighlighted}>
					{isHighlighted ? (
						<NormalRegular color={Colors.background}>{label}</NormalRegular>
					) : (
						<NormalLight>{label}</NormalLight>
					)}
				</FilterPillContainer>
			</Pressable>
		);
	};

	const renderSeparator = () => <View style={{ width: 5 }} />;

	return (
		<FlatList
			horizontal
			data={filters}
			renderItem={renderItem}
			contentContainerStyle={styles.container}
			ItemSeparatorComponent={renderSeparator}
		/>
	);
}

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	pill: {
		backgroundColor: Colors.lightGrey,
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
});

export default FilterBanner;
