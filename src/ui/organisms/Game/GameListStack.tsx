import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import SectionTitle from '../../atoms/Texts/SectionTitle';
import GamePoster from '../../atoms/GamePoster';
import { IGameShort } from '../../../domain/entities/gameEntities';
import globalStyles from '../../themes/globalStyles';

type Props = {
	data: Array<IGameShort>;
	title?: string;
};

const styles = StyleSheet.create({
	container: {
		gap: 10,
		...globalStyles.paddingHorizontal,
	},
	stackContainer: {
		flexDirection: 'row',
	},
});

const GameListStack = ({ data, title }: Props) => {
	const { width } = useWindowDimensions();

	const posterWidth = useMemo(() => width / 3, []);

	const itemOffset = useMemo(() => (width - 45) / 6, []);

	const renderItem = (item: IGameShort, index: number) => (
		<View
			key={item.id}
			style={{
				position: 'absolute',
				right: index * itemOffset,
			}}
		>
			<GamePoster cover={item.cover} name={item.name} width={posterWidth} />
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
