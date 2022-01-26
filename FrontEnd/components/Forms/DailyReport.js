import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../custom/CustomButton';
import CustomModal from '../custom/CustomModal';
import Equipment from './Equipment';

export default DailyReport = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const navigation = useNavigation();
	const goToEquipment = () =>
		navigation.navigate('DailyReport', { screen: 'Equipment' });

	return (
		<View>
			<CustomModal
				visible={show}
				onRequestClose={handleClose}
				title='Daily Report'
				animationType='slide'
			>
				<Equipment />
			</CustomModal>
			<CustomButton text='Show Modal' onPress={goToEquipment} />
		</View>
	);
};

const styles = StyleSheet.create({
	modalContainer: {},
});
