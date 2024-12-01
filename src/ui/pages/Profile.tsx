import React from 'react';
import { StyleSheet, View } from 'react-native';

import globalStyles from '../themes/globalStyles';
import Button from '../atoms/Button';
import signOut from '../../infrastructure/fetch/account/signOut';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		...globalStyles.paddingHorizontal,
	},
	buttonContainer: {
		gap: 10,
	},
});

const Profile = () => {
	return (
		<View style={styles.container}>
			<Button title="Sign out" onPress={signOut} />
		</View>
	);
};

export default Profile;
