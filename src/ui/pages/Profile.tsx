import React from 'react';
import { ScrollView } from 'react-native';

import { useQuery } from 'react-query';
import LoadingPage from '../templates/LoadingPage';
import ErrorPage from '../templates/ErrorPage';
import GameListColumns from '../organisms/Game/GameListColumns';
import getMostRated from '../../infrastructure/fetch/getMostRated';

const Profile = () => {
	const response = useQuery(['getMostRated'], getMostRated);

	if (response?.isLoading) return <LoadingPage />;
	if (response?.isError) return <ErrorPage />;

	return (
		<ScrollView>
			<GameListColumns data={response.data} />
		</ScrollView>
	);
};

export default Profile;
