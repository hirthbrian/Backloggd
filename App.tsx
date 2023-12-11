// @flow
import React from 'react';
import {
	Alert,
	Button,
	Pressable,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useFonts } from 'expo-font';

import CheckIcon from './app/components/icons/CheckIcon';
import HomeIcon from './app/components/icons/HomeIcon';
import ListIcon from './app/components/icons/ListIcon';
import Colors from './app/constants/Colors';
import { StatusEnum } from './app/constants/Enums';
import DetailsScreen from './app/screens/DetailsScreen';
import HomeScreen from './app/screens/HomeScreen';
import SearchScreen from './app/screens/SearchScreen';
import UserListScreen from './app/screens/UserListScreen';

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

const RobotoRegular = require('./assets/fonts/Roboto-Regular.ttf');
const RobotoLight = require('./assets/fonts/Roboto-Light.ttf');
const RobotoBold = require('./assets/fonts/Roboto-Bold.ttf');

const headerConfig: NativeStackNavigationOptions = {
	headerStyle: { backgroundColor: Colors.header },
	headerTintColor: Colors.white,
	headerTitleStyle: {
		fontWeight: '300',
		fontFamily: 'Roboto-Light',
	},
};

const defaultScreens = [
	<Stack.Screen
		key="detail"
		name="Details"
		component={DetailsScreen}
		options={({ route }) => ({
			title: route?.params?.name,
		})}
	/>,
];

function TopTabStack() {
	return (
		<TopTab.Navigator
			screenOptions={{
				tabBarIndicatorStyle: {
					backgroundColor: Colors.primary,
				},
				tabBarActiveTintColor: Colors.primary,
				tabBarStyle: {
					backgroundColor: Colors.header,
				},
			}}
		>
			<TopTab.Screen
				name="Want"
				component={UserListScreen}
				initialParams={{ type: StatusEnum.WANT }}
			/>
			<TopTab.Screen
				name="Played"
				component={UserListScreen}
				initialParams={{ type: StatusEnum.PLAYED }}
			/>
			<TopTab.Screen
				name="Favorited"
				component={UserListScreen}
				initialParams={{ type: StatusEnum.FAVORITED }}
			/>
		</TopTab.Navigator>
	);
}

function ListStack() {
	return (
		<Stack.Navigator screenOptions={headerConfig}>
			<Stack.Screen name="User List" component={TopTabStack} />
			{defaultScreens}
		</Stack.Navigator>
	);
}

function HomeStack() {
	const renderSearchButton = (navigation) => (
		<Button
			title="Search"
			color={Colors.primary}
			onPress={() => navigation.navigate('Search')}
		/>
	);

	const renderCloseButton = (navigation) => (
		<Button title="Close" color={Colors.primary} onPress={navigation.goBack} />
	);

	return (
		<Stack.Navigator screenOptions={headerConfig}>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={({ navigation }) => ({
					headerRight: () => renderSearchButton(navigation),
				})}
			/>
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={({ navigation }) => ({
					presentation: 'modal',
					headerLeft: () => renderCloseButton(navigation),
				})}
			/>
			{defaultScreens}
		</Stack.Navigator>
	);
}

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Regular': RobotoRegular,
		'Roboto-Light': RobotoLight,
		'Roboto-Bold': RobotoBold,
	});

	if (!fontsLoaded) return null;

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			<NavigationContainer>
				<BottomTab.Navigator
					screenOptions={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarActiveTintColor: Colors.primary,
						tabBarStyle: {
							backgroundColor: Colors.header,
						},
					}}
				>
					<BottomTab.Screen
						name="HomeTab"
						component={HomeStack}
						options={{ tabBarIcon: HomeIcon }}
					/>
					<BottomTab.Screen
						name="ListStack"
						component={ListStack}
						options={{ tabBarIcon: ListIcon }}
					/>
				</BottomTab.Navigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
});
