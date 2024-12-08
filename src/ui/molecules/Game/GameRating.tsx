import colors from '@themes/colors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { useMutation, useQuery } from 'react-query';

import getLog from '../../../infrastructure/fetch/log/getLog';
import updateRating from '../../../infrastructure/mutation/log/updateRating';

type Props = {
	gameId: number;
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
});

const GameRating = ({ gameId }: Props) => {
	const query = useQuery(['getLog', gameId], () => getLog(gameId));
	const [rating, setRating] = useState(0);

	const mutation = useMutation({
		mutationFn: ({ id, value }: { id: number; value: number }) =>
			updateRating(id, value),
	});

	useEffect(() => {
		if (query?.data) {
			setRating(query?.data.rating);
		}
	}, [query?.data]);

	const onChange = (value: number) => {
		setRating(value);
		mutation.mutate({ id: gameId, value });
	};

	return (
		<View style={styles.container}>
			<StarRating color={colors.primary} rating={rating} onChange={onChange} />
		</View>
	);
};

export default GameRating;
