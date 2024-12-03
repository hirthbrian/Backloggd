import { supabase } from '../../lib/supabase';

const signOut = () => {
	supabase.auth.signOut();
};

export default signOut;
