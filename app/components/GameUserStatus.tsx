import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import { StatusEnum } from '../constants/Enums';

import CheckIcon from './icons/CheckIcon';
import HeartIcon from './icons/HeartIcon';
import PlusIcon from './icons/PlusIcon';
import { NormalRegular } from './Texts';

function GameUserStatus() {
	const [status, setStatus] = useState<StatusEnum>(StatusEnum.NONE);
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	const renderSubStatus = (
		text: string,
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
							<Icon color={currentStatus ? Colors.background : Colors.text} />
						</View>
						<NormalRegular
							color={currentStatus ? Colors.background : Colors.text}
						>
							{text}
						</NormalRegular>
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
			style={{
				width: StyleSheet.hairlineWidth,
				backgroundColor: Colors.background,
				opacity: 0.2,
			}}
		/>
	);

	return (
		<View
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
				Colors.purple,
				PlusIcon,
				status === StatusEnum.WANT,
				onWantPress,
			)}
			{renderStatusSeparator()}
			{renderSubStatus(
				'Played',
				Colors.primary,
				CheckIcon,
				status === StatusEnum.PLAYED,
				onPlayedPress,
			)}
			{renderStatusSeparator()}
			{renderSubStatus(
				'Favorite',
				Colors.red,
				HeartIcon,
				isFavorite,
				onFavoritePress,
			)}
		</View>
	);
}

export default GameUserStatus;
