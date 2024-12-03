import React from 'react';
import { StyleSheet } from 'react-native';
import { SheetProps } from 'react-native-actions-sheet';

import NormalRegular from '@texts/NormalRegular';

import ActionSheetBase from './ActionSheetBase';
import { SheetIdEnum } from './sheets';

const styles = StyleSheet.create({});

const FilterGameSheet = ({}: SheetProps<SheetIdEnum.FILTER_GAME>) => {
	return (
		<ActionSheetBase>
			<NormalRegular>HELLO</NormalRegular>
		</ActionSheetBase>
	);
};

export default FilterGameSheet;
