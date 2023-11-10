import React from 'react';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { NormalRegular } from '../composants/Texts';
import Colors from '../constants/Colors';
import CheckIcon from '../composants/icons/CheckIcon';
import HeartIcon from '../composants/icons/HeartIcon';
import PlusIcon from '../composants/icons/PlusIcon';
import { StatusEnum } from '../constants/Enums';

function GameUserStatus() {
	const [status, setStatus] = useState<StatusEnum>(StatusEnum.NONE);
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	const renderSubStatus = (
		text: string,
		color: string,
		backgroundColor: string,
		Icon: React.JSX.Element,
		currentStatus,
		setStatus,
	) => {
		return (
			<Pressable onPress={setStatus} style={{ flex: 1 }}>
				{({ pressed }) => (
					<View
						style={{
							paddingVertical: 10,
							paddingHorizontal: 15,
							alignItems: 'center',
							backgroundColor:
								pressed || currentStatus ? backgroundColor : undefined,
						}}
					>
						<View style={{ paddingBottom: 5 }}>
							<Icon color={color} />
						</View>
						<NormalRegular color={color}>{text}</NormalRegular>
					</View>
				)}
			</Pressable>
		);
	};

	const onWantPress = () => {
		setStatus(status === StatusEnum.WANT ? StatusEnum.NONE : StatusEnum.WANT);
	};

	const onPlayedPress = () => {
		setStatus(
			status === StatusEnum.PLAYED ? StatusEnum.NONE : StatusEnum.PLAYED,
		);
	};

	const onFavoritePress = () => {
		setIsFavorite(!isFavorite);
	};

	const renderStatusSeparator = () => (
		<View
			style={{ width: 1, backgroundColor: Colors.lightGrey, opacity: 0.2 }}
		/>
	);

	return (
		<BlurView
			intensity={50}
			tint="light"
			style={{
				borderRadius: 4,
				marginHorizontal: 10,
				marginBottom: 15,
				overflow: 'hidden',
				flexDirection: 'row',
			}}
		>
			{renderSubStatus(
				'Want',
				Colors.text,
				Colors.purple,
				PlusIcon,
				status === StatusEnum.WANT,
				onWantPress,
			)}
			{renderStatusSeparator()}
			{renderSubStatus(
				'Played',
				Colors.text,
				Colors.primary,
				CheckIcon,
				status === StatusEnum.PLAYED,
				onPlayedPress,
			)}
			{renderStatusSeparator()}
			{renderSubStatus(
				'Favorite',
				Colors.text,
				Colors.red,
				HeartIcon,
				isFavorite,
				onFavoritePress,
			)}
		</BlurView>
	);
}

export default GameUserStatus;
