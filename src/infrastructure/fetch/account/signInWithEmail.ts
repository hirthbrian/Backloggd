import { Alert } from 'react-native';

import { supabase } from '../../lib/supabase';

const signInWithEmail = (email: string, password: string) => {
	supabase.auth.signInWithPassword({ email, password }).then(({ error }) => {
		if (error) {
			Alert.alert(error.message);
		}
	});
};

export default signInWithEmail;
