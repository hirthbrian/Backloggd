import React, { useEffect, useState } from 'react';
import { SheetProvider } from 'react-native-actions-sheet';

import { QueryClient, QueryClientProvider } from 'react-query';
import { supabase } from './src/infrastructure/lib/supabase';
import { Session } from '@supabase/supabase-js';

import LoadingPage from './src/ui/templates/LoadingPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthNavigation, Navigation } from './src/ui/templates/Navigation';

import './src/ui/organisms/ActionSheet/sheets';

const queryClient = new QueryClient();

export default function App() {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setLoading(false);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<SheetProvider>
				<GestureHandlerRootView>
					{session ? <Navigation /> : <AuthNavigation />}
				</GestureHandlerRootView>
			</SheetProvider>
		</QueryClientProvider>
	);
}
