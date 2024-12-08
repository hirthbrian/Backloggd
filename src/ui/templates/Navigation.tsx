import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	createStaticNavigation,
	StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { BookFullIcon } from '../atoms/Icons/BookFullIcon';
import { BookIcon } from '../atoms/Icons/BookIcon';
import HomeFullIcon from '../atoms/Icons/HomeFullIcon';
import HomeIcon from '../atoms/Icons/HomeIcon';
import SearchIcon from '../atoms/Icons/SearchIcon';
import SignIn from '../pages/account/SignIn';
import SignUp from '../pages/account/SignUp';
import FilteredGames from '../pages/FilteredGames';
import GameDetailsScreen from '../pages/GameDetailsScreen';
import Home from '../pages/Home';
import MediaGallery from '../pages/MediaGallery';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import colors from '../themes/colors';

const logo = require('../assets/images/logo.png');

const styles = StyleSheet.create({
	headerImage: {
		width: 110,
		height: 25,
	},
});

const HeaderTitle = () => <Image source={logo} style={styles.headerImage} />;

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
					props.focused ? <BookFullIcon {...props} /> : <BookIcon {...props} />,
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
		GameDetailsScreen: {
			screen: GameDetailsScreen,
			options: {
				headerTransparent: true,
				headerStyle: {
					backgroundColor: 'transparent',
				},
				headerTintColor: colors.white,
			},
		},
		FilteredGames: {
			screen: FilteredGames,
			options: {
				title: 'Games',
			},
		},
		MediaGallery: {
			screen: MediaGallery,
			options: {
				cardStyleInterpolator: ({ current }) => ({
					cardStyle: {
						opacity: current.progress,
					},
				}),
				gestureEnabled: false,
				headerTransparent: true,
				headerStyle: {
					backgroundColor: 'transparent',
				},
				title: '',
				headerBackVisible: false,
				animation: 'fade',
				animationDuration: 200,
			},
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

type RootStackParamList = StaticParamList<typeof RootStack & typeof AuthStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export const Navigation = createStaticNavigation(RootStack);
export const AuthNavigation = createStaticNavigation(AuthStack);
