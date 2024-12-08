import NormalRegular from '@texts/NormalRegular';
import colors from '@themes/colors';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useMutation, useQuery } from 'react-query';

import { StatusEnum } from '../../domain/enum/StatusEnum';
import getLog from '../../infrastructure/fetch/log/getLog';
import { triggerHaptic } from '../../infrastructure/lib/hapticFeedback';
import insertLog from '../../infrastructure/mutation/log/insertLog';
import { BacklogIcon } from '../atoms/Icons/BacklogIcon';
import { GamepadIcon } from '../atoms/Icons/GamepadIcon';
import { PlayIcon } from '../atoms/Icons/PlayIcon';

type Props = {
	gameId: number;
};

const styles = StyleSheet.create({
	statusContainer: {
		gap: 15,
		flexDirection: 'row',
	},
	statusItem: {
		flex: 1,
		backgroundColor: colors.background_light,
		borderRadius: 8,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 5,
		gap: 5,
		flexDirection: 'row',
	},
});

const LogStatus = ({ gameId }: Props) => {
	const query = useQuery(['getLog', gameId], () => getLog(gameId));
	const [statusSelected, setStatusSelected] = useState<Array<StatusEnum>>([]);

	const mutation = useMutation({
		mutationFn: ({ id, status }: { id: number; status: Array<StatusEnum> }) =>
			insertLog(id, status),
	});

	useEffect(() => {
		const newStatus = [];
		if (query?.data) {
			if (query?.data.playing) {
				newStatus.push(StatusEnum.PLAYING);
			}
			if (query?.data.completed) {
				newStatus.push(StatusEnum.COMPLETED);
			}
			if (query?.data.backlog) {
				newStatus.push(StatusEnum.BACKLOG);
			}
			setStatusSelected(newStatus);
		}
	}, [query?.data]);

	const onPressItem = (isSelected: boolean, status: StatusEnum) => {
		triggerHaptic();
		const newStats = isSelected
			? statusSelected.filter((s) => s !== status)
			: [...statusSelected, status];

		setStatusSelected(newStats);
		mutation.mutate({ id: gameId, status: newStats });
	};

	const renderStatus = (
		label: string,
		Icon: (props: SvgProps) => React.JSX.Element,
		status: StatusEnum,
	) => {
		const isSelected = !!statusSelected.find((s) => s === status);

		return (
			<Pressable
				onPress={() => onPressItem(isSelected, status)}
				style={[
					styles.statusItem,
					[
						{
							borderColor: isSelected
								? colors.primary
								: colors.background_light,
						},
					],
				]}
			>
				<Icon
					width={15}
					height={15}
					color={isSelected ? colors.primary : colors.text}
				/>
				<NormalRegular color={isSelected ? colors.primary : colors.text}>
					{label}
				</NormalRegular>
			</Pressable>
		);
	};

	return (
		<View style={styles.statusContainer}>
			{renderStatus('Completed', GamepadIcon, StatusEnum.COMPLETED)}
			{renderStatus('Playing', PlayIcon, StatusEnum.PLAYING)}
			{renderStatus('Backlog', BacklogIcon, StatusEnum.BACKLOG)}
		</View>
	);
};

export default LogStatus;
