import React, { useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	SafeAreaView,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { search } from '../api';
import { NormalRegular, TextInput } from '../components/Texts';
import Colors from '../constants/Colors';

export default function SearchScreen() {
	const navigation = useNavigation();
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const renderSeparator = () => (
		<View
			style={{
				height: 1,
				opacity: 0.5,
				marginHorizontal: 15,
				backgroundColor: Colors.lightGrey,
			}}
		/>
	);

	const onPress = (id: number, name: string) => {
		navigation.goBack();
		navigation.navigate('Details', { id, name });
	};

	const renderItem = ({ item }) => (
		<Pressable
			onPress={() => onPress(item.id, item.name)}
			style={({ pressed }) => ({
				paddingHorizontal: 15,
				paddingVertical: 10,
				backgroundColor: pressed ? Colors.primary : Colors.white,
			})}
		>
			<NormalRegular key={item.id}>{item.name}</NormalRegular>
		</Pressable>
	);

	const renderLoading = () => (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ActivityIndicator size="large" />
		</View>
	);

	const onSearch = ({ nativeEvent: { text } }) => {
		setIsLoading(true);
		search(text)
			.then(setResults)
			.then(() => setIsLoading(false));
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
			<TextInput
				autoFocus
				enterKeyHint="search"
				placeholder="Search..."
				onSubmitEditing={onSearch}
			/>
			{isLoading ? (
				renderLoading()
			) : (
				<FlatList
					data={results}
					renderItem={renderItem}
					contentContainerStyle={{ flex: 1 }}
					ItemSeparatorComponent={renderSeparator}
				/>
			)}
		</SafeAreaView>
	);
}
