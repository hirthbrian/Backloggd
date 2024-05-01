import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import styled from 'styled-components/native';

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

const FilterPillContainer = styled.View<{
	isHighlighted: boolean;
	backgroundColor: string;
}>`
	background-color: ${(props) => props.backgroundColor};
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
	const { colors } = useTheme();

	const renderItem = ({ item }: { item: Filters }) => {
		const { id, label } = item;
		const isHighlighted = highlightedFilter === id;
		return (
			<Pressable key={item.id} onPress={() => onFilterSelected(id)}>
				<FilterPillContainer
					isHighlighted={isHighlighted}
					backgroundColor={isHighlighted ? colors.primary : colors.border}
				>
					{isHighlighted ? (
						<NormalRegular color={colors.background}>{label}</NormalRegular>
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
			style={{ backgroundColor: colors.background }}
			contentContainerStyle={styles.container}
			ItemSeparatorComponent={renderSeparator}
		/>
	);
}

export const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
});

export default FilterBanner;
