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
import insertLog from '../../../infrastructure/mutation/insertLog';
import { GamepadIcon } from '../../atoms/Icons/GamepadIcon';
import { PlayIcon } from '../../atoms/Icons/PlayIcon';
import { BacklogIcon } from '../../atoms/Icons/BacklogIcon';
import NormalRegular from '../../atoms/Texts/NormalRegular';
import { StatusEnum } from '../../../domain/enum/StatusEnum';
import { SvgProps } from 'react-native-svg';
import { DeleteIcon } from '../../atoms/Icons/DeleteIcon';
import SecondaryButton from '../../atoms/SecondaryButton';
import deleteLog from '../../../infrastructure/mutation/deleteLog';

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		paddingVertical: 20,
		...globalStyles.paddingHorizontal,
	},
});

const LogGameSheet = ({ payload }: SheetProps<SheetIdEnum.LOG_GAME>) => {
	const id = payload.id;
	const name = payload.name;

	const [statusSelected, setStatusSelected] = useState<Array<StatusEnum>>([]);

	useEffect(() => {
		ReactNativeHapticFeedback.trigger('impactLight');
	}, []);

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
				style={{
					flex: 1,
					backgroundColor: colors.background_light,
					borderRadius: 8,
					borderWidth: 1,
					borderColor: isSelected ? colors.primary : colors.background_light,
					alignItems: 'center',
					paddingVertical: 10,
					gap: 5,
				}}
			>
				<Icon color={isSelected ? colors.primary : colors.text} />
				<NormalRegular color={isSelected ? colors.primary : colors.text}>
					{label}
				</NormalRegular>
			</Pressable>
		);
	};

	return (
		<ActionSheet containerStyle={styles.container}>
			<View style={{ gap: 20 }}>
				<SectionTitle color={colors.white} textAlign="center">
					{name}
				</SectionTitle>
				<View
					style={{
						flexDirection: 'row',
						gap: 15,
					}}
				>
					{renderStatus('Completed', GamepadIcon, StatusEnum.COMPLETED)}
					{renderStatus('Playing', PlayIcon, StatusEnum.PLAYING)}
					{renderStatus('Backlog', BacklogIcon, StatusEnum.BACKLOG)}
				</View>
				<View
					style={{
						flexDirection: 'row',
						gap: 10,
						alignItems: 'center',
					}}
				>
					<SecondaryButton LeftIcon={DeleteIcon} onPress={onDeleteLog} />
					<View style={{ flex: 1 }}>
						<PrimaryButton title="Create Log" onPress={onCreateLog} />
					</View>
				</View>
			</View>
		</ActionSheet>
	);
};

export default LogGameSheet;
