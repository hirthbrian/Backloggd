// @flow
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeIcon from './src/components/icons/HomeIcon';
import ListIcon from './src/components/icons/ListIcon';
import SearchIcon from './src/components/icons/SearchIcon';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import UserListScreen from './src/screens/UserListScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function OtherScreenGroup() {
	return (
		<Stack.Group>
			<Stack.Screen
				key="detail"
				name="Details"
				component={DetailsScreen}
				options={({ route }) => ({
					title: route?.params?.name,
				})}
			/>
		</Stack.Group>
	);
}

function BottomTabStack() {
	return (
		<BottomTab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={HomeScreen}
				options={{ tabBarIcon: HomeIcon }}
			/>
			<BottomTab.Screen
				name="UserList"
				component={UserListScreen}
				options={{ tabBarIcon: ListIcon }}
			/>
			<BottomTab.Screen
				name="Search"
				component={SearchScreen}
				options={{ tabBarIcon: SearchIcon }}
			/>
		</BottomTab.Navigator>
	);
}

function HeaderTitle() {
	const { colors } = useTheme();

	return (
		<Image
			source={require('./assets/logo-title.png')}
			style={{ height: 20, width: 105, tintColor: colors.text }}
		/>
	);
}

export default function App() {
	return (
		<View style={styles.container}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Main"
						component={BottomTabStack}
						options={{ headerTitle: HeaderTitle }}
					/>
					{OtherScreenGroup()}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
