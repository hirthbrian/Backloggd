import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import colors from '../themes/colors';
import { getImageUrl } from '../../infrastructure/utils';
import SmallRegular from './Texts/SmallRegular';
import { SheetManager } from 'react-native-actions-sheet';
import { SheetIdEnum } from '../organisms/ActionSheet/sheets';
import { IImage } from '../../domain/entities/commonEntities';

type Props = {
	id: number;
	cover: IImage | undefined;
	name: string;
	onPress?: () => void;
	width?: number;
};

const styles = StyleSheet.create({
	image: {
		borderRadius: 5,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.text,
	},
	placeholder: {
		borderRadius: 5,
		overflow: 'hidden',
		justifyContent: 'center',
		padding: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.text,
	},
});

const RATIO = 352 / 264;

function GamePoster({ id, cover, name, onPress, width = 100 }: Props) {
	const onLongPress = () =>
		SheetManager.show(SheetIdEnum.LOG_GAME, {
			payload: { id, name },
		});

	const renderPlaceholder = () => (
		<View
			style={[
				styles.placeholder,
				{
					width,
					height: width * RATIO,
				},
			]}
		>
			<SmallRegular textAlign="center" numberOfLines={3}>
				{name}
			</SmallRegular>
		</View>
	);

	const renderImage = () => (
		<Image
			source={{ uri: getImageUrl(cover.image_id) }}
			style={[
				styles.image,
				{
					width,
					height: width * RATIO,
				},
			]}
		/>
	);

	return (
		<Pressable onPress={onPress} onLongPress={onLongPress}>
			{cover ? renderImage() : renderPlaceholder()}
		</Pressable>
	);
}

export default GamePoster;
