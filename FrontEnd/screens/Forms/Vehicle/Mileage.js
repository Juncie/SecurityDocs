import { View, Text } from 'react-native';
import React from 'react';

import CustomButton from '../../../components/custom/C_Button';

const Mileage = ({ navigation }) => {
	const navigate = navigation.navigate;
	const goToNext = () => navigate('Daily Report', { screen: 'ActivityReport' });

	return (
		<View>
			<Text>Mileage</Text>
			<CustomButton text='Next' onPress={goToNext} />
			<CustomButton text='Back' onPress={() => navigation.pop()} />
		</View>
	);
};

export default Mileage;
