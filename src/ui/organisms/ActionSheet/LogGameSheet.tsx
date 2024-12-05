import NormalRegular from '@texts/NormalRegular';
import SectionTitle from '@texts/SectionTitle';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { SvgProps } from 'react-native-svg';
import { useQuery } from 'react-query';

import { StatusEnum } from '../../../domain/enum/StatusEnum';
import getLog from '../../../infrastructure/fetch/log/getLog';
import { triggerHaptic } from '../../../infrastructure/lib/hapticFeedback';
import deleteLog from '../../../infrastructure/mutation/log/deleteLog';
import insertLog from '../../../infrastructure/mutation/log/insertLog';
import { BacklogIcon } from '../../atoms/Icons/BacklogIcon';
import { DeleteIcon } from '../../atoms/Icons/DeleteIcon';
import { GamepadIcon } from '../../atoms/Icons/GamepadIcon';
import { PlayIcon } from '../../atoms/Icons/PlayIcon';
import PrimaryButton from '../../atoms/PrimaryButton';
import SecondaryButton from '../../atoms/SecondaryButton';
import colors from '../../themes/colors';
import ActionSheetBase from './ActionSheetBase';
import { SheetIdEnum } from './sheets';

const styles = StyleSheet.create({
	container: {
		gap: 20,
	},
	statusContainer: {
		gap: 15,
		flexDirection: 'row',
	},
	statusItem: {
		flex: 1,
		backgroundColor: colors.background_light,
		borderRadius: 8,
		borderWidth: 1,
		alignItems: 'center',
		paddingVertical: 10,
		gap: 5,
	},
	buttonContainer: {
		gap: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	logButton: {
		flex: 1,
	},
});

const LogGameSheet = ({ payload }: SheetProps<SheetIdEnum.LOG_GAME>) => {
	const id = payload.id;
	const name = payload.name;

	const query = useQuery(['getLog', id], () => getLog(id));

	const [statusSelected, setStatusSelected] = useState<Array<StatusEnum>>([]);

	useEffect(() => {
		const test = [];
		if (query?.data) {
			if (query?.data.playing) {
				test.push(StatusEnum.PLAYING);
			}
			if (query?.data.completed) {
				test.push(StatusEnum.COMPLETED);
			}
			if (query?.data.backlog) {
				test.push(StatusEnum.BACKLOG);
			}
			setStatusSelected(test);
		}
	}, [query?.data]);

	const onDeleteLog = () => {
		deleteLog(id).then(() => SheetManager.hide(SheetIdEnum.LOG_GAME));
	};

	const onCreateLog = () => {
		insertLog(id, statusSelected).then(() =>
			SheetManager.hide(SheetIdEnum.LOG_GAME),
		);
	};

	const renderStatus = (
		label: string,
		Icon: (props: SvgProps) => React.JSX.Element,
		status: StatusEnum,
	) => {
		const isSelected = statusSelected.find((s) => s === status);

		return (
			<Pressable
				onPress={() => {
					triggerHaptic();
					setStatusSelected(
						isSelected
							? statusSelected.filter((s) => s !== status)
							: [...statusSelected, status],
					);
				}}
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
				<Icon color={isSelected ? colors.primary : colors.text} />
				<NormalRegular color={isSelected ? colors.primary : colors.text}>
					{label}
				</NormalRegular>
			</Pressable>
		);
	};

	return (
		<ActionSheetBase containerStyle={styles.container}>
			<SectionTitle color={colors.white} textAlign="center">
				{name}
			</SectionTitle>
			<View style={styles.statusContainer}>
				{renderStatus('Completed', GamepadIcon, StatusEnum.COMPLETED)}
				{renderStatus('Playing', PlayIcon, StatusEnum.PLAYING)}
				{renderStatus('Backlog', BacklogIcon, StatusEnum.BACKLOG)}
			</View>
			<View style={styles.buttonContainer}>
				<SecondaryButton LeftIcon={DeleteIcon} onPress={onDeleteLog} />
				<View style={styles.logButton}>
					<PrimaryButton title="Create Log" onPress={onCreateLog} />
				</View>
			</View>
		</ActionSheetBase>
	);
};

export default LogGameSheet;
