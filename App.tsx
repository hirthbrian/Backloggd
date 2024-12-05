import './src/ui/organisms/ActionSheet/sheets';

import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';

import { SessionContext } from './src/infrastructure/contexts/SessionContext';
import { supabase } from './src/infrastructure/lib/supabase';
import LoadingPage from './src/ui/templates/LoadingPage';
import { AuthNavigation, Navigation } from './src/ui/templates/Navigation';

const queryClient = new QueryClient();

export default function App() {
	const [userSession, setUserSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUserSession(session);
			setLoading(false);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setUserSession(session);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<GestureHandlerRootView>
					<SessionContext.Provider value={userSession}>
						<SheetProvider>
							{userSession ? <Navigation /> : <AuthNavigation />}
						</SheetProvider>
					</SessionContext.Provider>
				</GestureHandlerRootView>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
}
