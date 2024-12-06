import NormalRegular from '@texts/NormalRegular';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { IPlatform } from '../../../domain/entities/platformEntities ';
import colors from '../../themes/colors';

type Props = {
	data: Array<IPlatform>;
};

const styles = StyleSheet.create({
	container: {
		gap: 6,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	item: {
		gap: 2,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 4,
		borderRadius: 4,
		borderColor: colors.text_secondary,
		borderWidth: 1,
	},
	// image: {
	// 	height: 15,
	// 	width: 15,
	// 	backgroundColor: 'red',
	// },
});

const PlatformList = ({ data }: Props) => {
	const renderItem = (item: IPlatform) => (
		<View style={styles.item} key={item.id}>
			{/* <Image
				style={styles.image}
				source={{ uri: getImageUrl(item.platform_logo.image_id, 'thumb') }}
			/> */}
			<NormalRegular>{item.name}</NormalRegular>
		</View>
	);

	return <View style={styles.container}>{data?.map(renderItem)}</View>;
};

export default PlatformList;
