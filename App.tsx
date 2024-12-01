import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	createStaticNavigation,
	StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SheetProvider } from 'react-native-actions-sheet';

import GameDetails from './src/ui/pages/GameDetails';
import Home from './src/ui/pages/Home';
import Search from './src/ui/pages/Search';
import Profile from './src/ui/pages/Profile';
import colors from './src/ui/themes/colors';
import HomeIcon from './src/ui/atoms/Icons/HomeIcon';
import SearchIcon from './src/ui/atoms/Icons/SearchIcon';
import AccountFullIcon from './src/ui/atoms/Icons/AccountFullIcon';
import AccountIcon from './src/ui/atoms/Icons/AccountIcon';
import HomeFullIcon from './src/ui/atoms/Icons/HomeFullIcon';
import { QueryClient, QueryClientProvider } from 'react-query';
import { supabase } from './src/infrastructure/lib/supabase';
import { Session } from '@supabase/supabase-js';
import SignUp from './src/ui/pages/account/SignUp';
import SignIn from './src/ui/pages/account/SignIn';

import './src/ui/organisms/ActionSheet/sheets';
import LoadingPage from './src/ui/templates/LoadingPage';

const queryClient = new QueryClient();

const HeaderTitle = () => (
	<Image
		source={require('./assets/logo.png')}
		style={{ width: 110, height: 25 }}
	/>
);

const BottomTabStack = createBottomTabNavigator({
	screens: {
		Home: {
			screen: Home,
			options: {
				tabBarIcon: (props) =>
					props.focused ? <HomeFullIcon {...props} /> : <HomeIcon {...props} />,
			},
		},
		Search: {
			screen: Search,
			options: {
				tabBarIcon: SearchIcon,
			},
		},
		Profile: {
			screen: Profile,
			options: {
				tabBarIcon: (props) =>
					props.focused ? (
						<AccountFullIcon {...props} />
					) : (
						<AccountIcon {...props} />
					),
			},
		},
	},
	screenOptions: {
		headerShown: false,
		sceneStyle: {
			backgroundColor: colors.background,
		},
		tabBarStyle: {
			backgroundColor: colors.background_light,
		},
		tabBarActiveTintColor: colors.text_highlight,
		tabBarInactiveTintColor: colors.text,
	},
});

const AuthStack = createNativeStackNavigator({
	screens: {
		SignIn: {
			screen: SignIn,
			options: { headerTitle: 'Sign in' },
		},
		SignUp: {
			screen: SignUp,
			options: { headerTitle: 'Sign up' },
		},
	},
	screenOptions: {
		headerStyle: {
			backgroundColor: colors.background_light,
		},
		contentStyle: {
			backgroundColor: colors.background,
		},
		headerTintColor: colors.text,
	},
});

const RootStack = createNativeStackNavigator({
	screens: {
		Main: { screen: BottomTabStack, options: { headerTitle: HeaderTitle } },
		GameDetails: {
			screen: GameDetails,
		},
	},
	screenOptions: {
		headerStyle: {
			backgroundColor: colors.background_light,
		},
		contentStyle: {
			backgroundColor: colors.background,
		},
		headerTintColor: colors.text,
	},
});

type RootStackParamList = StaticParamList<typeof BottomTabStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

const Navigation = createStaticNavigation(RootStack);
const AuthNavigation = createStaticNavigation(AuthStack);

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
				{session ? <Navigation /> : <AuthNavigation />}
			</SheetProvider>
		</QueryClientProvider>
	);
}
