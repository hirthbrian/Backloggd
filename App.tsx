import React from 'react';
import { Image, StyleSheet, useColorScheme, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Details from './src/ui/pages/Details';
import Home from './src/ui/pages/Home';
import Search from './src/ui/pages/Search';
import UserList from './src/ui/pages/UserList';
import { darkTheme, lightTheme } from './src/ui/themes/colors';
import HomeIcon from './src/ui/atoms/Icons/HomeIcon';
import ListIcon from './src/ui/atoms/Icons/ListIcon';
import SearchIcon from './src/ui/atoms/Icons/SearchIcon';

function HeaderTitle() {
	const { colors } = useTheme();

	return (
		<Image
			source={require('./assets/logo-title.png')}
			style={{ height: 20, width: 105, tintColor: colors.text }}
		/>
	);
}

const BottomTabStack = createBottomTabNavigator({
	screens: {
		Home: { screen: Home, options: { tabBarIcon: HomeIcon } },
		UserList: { screen: UserList, options: { tabBarIcon: ListIcon } },
		Search: { screen: Search, options: { tabBarIcon: SearchIcon } },
	},
	screenOptions: {
		headerShown: false,
		tabBarShowLabel: false,
	},
});

const RootStack = createNativeStackNavigator({
	screens: {
		Main: { screen: BottomTabStack, options: { headerTitle: HeaderTitle } },
		Details: {
			screen: Details,
			options: ({ route }) => ({
				title: route?.params?.name,
			}),
		},
	},
	screenOptions: () => {
		const { colors } = useTheme();

		return {
			headerStyle: {
				backgroundColor: colors.primary,
			},
		};
	},
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	const theme = useColorScheme();

	return (
		<View style={styles.container}>
			<Navigation theme={theme === 'dark' ? darkTheme : lightTheme} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
