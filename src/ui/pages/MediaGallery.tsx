import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import Gallery from 'react-native-awesome-gallery';
import { getImageUrl } from '../../infrastructure/utils';
import { IImage } from '../../domain/entities/commonEntities';

type Props = StaticScreenProps<{
	images: Array<IImage>;
	id: number;
}>;

function MediaGallery({ route }: Props) {
	const navigation = useNavigation();

	const images = useMemo(() => {
		return route.params.images?.map((i) => getImageUrl(i.image_id, '1080p'));
	}, [route.params.images]);

	const goBack = () => navigation.goBack();

	return <Gallery onSwipeToClose={goBack} data={images} />;
}

export default MediaGallery;