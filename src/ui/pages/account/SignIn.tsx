import { useNavigation } from '@react-navigation/native';
import NormalRegular from '@texts/NormalRegular';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import signInWithEmail from '../../../infrastructure/fetch/account/signInWithEmail';
import Input from '../../atoms/Input';
import PrimaryButton from '../../atoms/PrimaryButton';
import colors from '../../themes/colors';
import globalStyles from '../../themes/globalStyles';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		justifyContent: 'center',
		...globalStyles.withPadding,
	},
	buttonContainer: {
		gap: 10,
	},
});

const SignIn = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onPress = () => signInWithEmail(email, password);

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
			<PrimaryButton title="Sign In" onPress={onPress} />
			<NormalRegular
				onPress={() => navigation.navigate('SignUp')}
				textAlign="center"
				color={colors.text_highlight}
			>
				Create an account
			</NormalRegular>
		</View>
	);
};

export default SignIn;
