import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import C_Button from '../custom/C_Button';
import C_Modal from '../custom/C_Modal';
import Equipment from './Equipment';

export default DailyReport = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const navigation = useNavigation();
	const goToEquipment = () =>
		navigation.navigate('DailyReport', { screen: 'Equipment' });

	return (
		<View>
			<C_Modal
				visible={show}
				onRequestClose={handleClose}
				title='Daily Report'
				animationType='slide'
				containerStyle={modalContainer}
			>
				<Equipment />
			</C_Modal>
			<C_Button text='Show Modal' onPress={goToEquipment} />
		</View>
	);
};

const styles = StyleSheet.create({
	modalContainer: {},
});

const { modalContainer } = styles;
