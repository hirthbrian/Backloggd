import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';

const signUpWithEmail = (email: string, password: string) => {
	supabase.auth
		.signUp({ email, password })
		.then(({ data: { session }, error }) => {
			if (error) {
				Alert.alert(error.message);
			} else if (!session) {
				Alert.alert('Please check your inbox for email verification!');
			}
		});
};

export default signUpWithEmail;
