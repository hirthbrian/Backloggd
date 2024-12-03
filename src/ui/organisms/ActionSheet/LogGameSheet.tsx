import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ActionSheet, {
	SheetManager,
	SheetProps,
} from 'react-native-actions-sheet';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import globalStyles from '../../themes/globalStyles';
import colors from '../../themes/colors';
import { SheetIdEnum } from './sheets';
import SectionTitle from '../../atoms/Texts/SectionTitle';
import PrimaryButton from '../../atoms/PrimaryButton';
import insertLog from '../../../infrastructure/mutation/log/insertLog';
import { GamepadIcon } from '../../atoms/Icons/GamepadIcon';
import { PlayIcon } from '../../atoms/Icons/PlayIcon';
import { BacklogIcon } from '../../atoms/Icons/BacklogIcon';
import NormalRegular from '../../atoms/Texts/NormalRegular';
import { StatusEnum } from '../../../domain/enum/StatusEnum';
import { SvgProps } from 'react-native-svg';
import { DeleteIcon } from '../../atoms/Icons/DeleteIcon';
import SecondaryButton from '../../atoms/SecondaryButton';
import deleteLog from '../../../infrastructure/mutation/log/deleteLog';
import { useQuery } from 'react-query';
import getLog from '../../../infrastructure/fetch/log/getLog';

const styles = StyleSheet.create({
	actionSheetcontainer: {
		backgroundColor: colors.background,
		paddingTop: 5,
		...globalStyles.paddingHorizontal,
	},
	indicator: {
		height: 4,
		backgroundColor: colors.background_light,
	},
	container: {
		gap: 20,
		paddingTop: 5,
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
		ReactNativeHapticFeedback.trigger('impactLight');
	}, []);

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
					setStatusSelected(
						isSelected
							? statusSelected.filter((s) => s !== status)
							: [...statusSelected, status],
					);
				}}
				style={
					(styles.statusItem,
					[
						{
							borderColor: isSelected
								? colors.primary
								: colors.background_light,
						},
					])
				}
			>
				<Icon color={isSelected ? colors.primary : colors.text} />
				<NormalRegular color={isSelected ? colors.primary : colors.text}>
					{label}
				</NormalRegular>
			</Pressable>
		);
	};

	return (
		<ActionSheet
			gestureEnabled
			indicatorStyle={styles.indicator}
			containerStyle={styles.actionSheetcontainer}
		>
			<View style={styles.container}>
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
			</View>
		</ActionSheet>
	);
};

export default LogGameSheet;
