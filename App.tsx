// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import HomeIcon from './app/components/icons/HomeIcon';
import ListIcon from './app/components/icons/ListIcon';
import SearchIcon from './app/components/icons/SearchIcon';
import Colors from './app/constants/Colors';
import DetailsScreen from './app/screens/DetailsScreen';
import HomeScreen from './app/screens/HomeScreen';
import SearchScreen from './app/screens/SearchScreen';
import UserListScreen from './app/screens/UserListScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const RobotoRegular = require('./assets/fonts/Roboto-Regular.ttf');
const RobotoLight = require('./assets/fonts/Roboto-Light.ttf');
const RobotoBold = require('./assets/fonts/Roboto-Bold.ttf');

const otherScreenGroup = () => {
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
};

function BottomTabStack() {
	return (
		<BottomTab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: Colors.primary,
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

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Regular': RobotoRegular,
		'Roboto-Light': RobotoLight,
		'Roboto-Bold': RobotoBold,
	});

	if (!fontsLoaded) return null;

	return (
		<View style={styles.container}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Main" component={BottomTabStack} />
					{otherScreenGroup()}
				</Stack.Navigator>
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
