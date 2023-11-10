import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from './app/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './app/screens/HomeScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import UserListScreen from './app/screens/UserListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeIcon from './app/composants/icons/HomeIcon.tsx';
import ListIcon from './app/composants/icons/ListIcon.tsx';

import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.header },
				headerTintColor: Colors.white,
				headerTitleStyle: {
					fontWeight: '300',
					fontFamily: 'Roboto-Light',
				},
			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen
				name="Details"
				component={DetailsScreen}
				options={({ route }) => ({
					title: route?.params?.name,
				})}
			/>
		</Stack.Navigator>
	);
}

function ListStackScreen() {
	return (
		<TopTab.Navigator
			screenOptions={{
				tabBarIndicatorStyle: {
					backgroundColor: Colors.primary,
				},
				tabBarActiveTintColor: Colors.primary,
				tabBarStyle: {
					paddingTop: 50,
					backgroundColor: Colors.header,
				},
			}}
		>
			<TopTab.Screen name="Want" component={UserListScreen} />
			<TopTab.Screen name="Played" component={UserListScreen} />
			<TopTab.Screen name="Favorited" component={UserListScreen} />
		</TopTab.Navigator>
	);
}

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarActiveTintColor: Colors.primary,
						tabBarStyle: {
							backgroundColor: Colors.header,
						},
					}}
				>
					<Tab.Screen
						name="HomeTab"
						component={HomeStackScreen}
						options={{ tabBarIcon: HomeIcon }}
					/>
					<Tab.Screen
						name="ListStack"
						component={ListStackScreen}
						options={{ tabBarIcon: ListIcon }}
					/>
				</Tab.Navigator>
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
