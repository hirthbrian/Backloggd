import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

import getGameDetails from '../../infrastructure/fetch/game/getGameDetails';
import GameDetails from '../organisms/Game/GameDetails';
import ErrorPage from '../templates/ErrorPage';
import LoadingPage from '../templates/LoadingPage';

type Props = StaticScreenProps<{
	id: number;
}>;

const GameDetailsScreen = ({ route }: Props) => {
	const navigation = useNavigation();
	const query = useQuery(['getGameDetails', route?.params?.id], () =>
		getGameDetails(route?.params?.id),
	);

	useEffect(() => {
		navigation.setOptions({ title: query?.data?.name || '' });
	}, [navigation, query?.data?.name]);

	if (query?.isLoading) {
		return <LoadingPage />;
	}

	if (query?.isError) {
		return <ErrorPage />;
	}

	if (query.data) {
		return <GameDetails data={query.data} />;
	}

	return null;
};

export default GameDetailsScreen;
