import React, { useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import ActionSheet, {
	SheetManager,
	SheetProps,
} from 'react-native-actions-sheet';

import globalStyles from '../../themes/globalStyles';
import colors from '../../themes/colors';
import { SheetIdEnum } from './sheets';
import SectionTitle from '../../atoms/Texts/SectionTitle';
import PrimaryButton from '../../atoms/PrimaryButton';
import putLog from '../../../infrastructure/mutation/putLog';
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

	const onDeleteLog = () => {
		deleteLog(id).then(() => SheetManager.hide(SheetIdEnum.LOG_GAME));
	};

	const onCreateLog = () => {
		putLog(id, statusSelected).then(() =>
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
				<View style={{ flexDirection: 'row' }}>
					<SecondaryButton LeftIcon={DeleteIcon} onPress={onDeleteLog} />
					<PrimaryButton title="Create Log" onPress={onCreateLog} />
				</View>
			</View>
		</ActionSheet>
	);
};

export default LogGameSheet;
