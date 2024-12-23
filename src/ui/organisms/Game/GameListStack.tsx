import { IGameShort } from '@entities/gameEntities';
import SectionTitle from '@texts/SectionTitle';
import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import GamePoster from '../../atoms/GamePoster';
import globalStyles from '../../themes/globalStyles';

type Props = {
	data: Array<IGameShort>;
	title?: string;
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
		...globalStyles.withPadding,
	},
	stackContainer: {
		flexDirection: 'row',
	},
	item: {
		position: 'absolute',
	},
});

const GameListStack = ({ data, title }: Props) => {
	const { width } = useWindowDimensions();

	const posterWidth = useMemo(() => width / 3, [width]);

	const itemOffset = useMemo(() => (width - 45) / 6, [width]);

	const renderItem = (item: IGameShort, index: number) => (
		<View
			key={item.id}
			style={[
				styles.item,
				{
					right: index * itemOffset,
				},
			]}
		>
			<GamePoster
				id={item.id}
				cover={item.cover}
				name={item.name}
				width={posterWidth}
			/>
		</View>
	);

	return (
		<View style={styles.container}>
			{title && <SectionTitle>{title}</SectionTitle>}
			<View style={styles.stackContainer}>
				{data?.splice(0, 5)?.map(renderItem)}
			</View>
		</View>
	);
};

export default GameListStack;
