import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import signUpWithEmail from '../../../infrastructure/fetch/account/signUpWithEmail';
import Input from '../../atoms/Input';
import PrimaryButton from '../../atoms/PrimaryButton';
import globalStyles from '../../themes/globalStyles';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		justifyContent: 'center',
		...globalStyles.paddingHorizontal,
	},
	buttonContainer: {
		gap: 10,
	},
});

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onPress = () => signUpWithEmail(email, password);

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<Input
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
					placeholder="Email"
				/>
				<Input
					secureTextEntry
					value={password}
					onChangeText={setPassword}
					placeholder="Password"
				/>
			</View>
			<PrimaryButton title="Sign Up" onPress={onPress} />
		</View>
	);
};

export default SignUp;
