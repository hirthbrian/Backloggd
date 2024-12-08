import { UserContext } from '@contexts/UserContext';
import SectionTitle from '@texts/SectionTitle';
import globalStyles from '@themes/globalStyles';
import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { getAvatarUrl } from '../../infrastructure/utils';
import colors from '../themes/colors';

const styles = StyleSheet.create({
	container: {
		gap: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		...globalStyles.withPadding,
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 30,
		...globalStyles.withBorder,
	},
});

const WelcomeMessage = () => {
	const user = useContext(UserContext);

	if (user) {
		return (
			<View style={styles.container}>
				<SectionTitle>Welcome back</SectionTitle>
				<Image style={styles.avatar} source={{ uri: getAvatarUrl(user?.id) }} />
				<SectionTitle color={colors.white}>{user?.username}</SectionTitle>
			</View>
		);
	}

	return null;
};

export default WelcomeMessage;
