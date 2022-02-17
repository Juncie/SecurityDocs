import { View, Text } from 'react-native';
import React from 'react';

import CustomButton from '../../../components/custom/C_Button';

const Fuel = ({ navigation }) => {
	const navigate = navigation.navigate;
	const goToMileage = () =>
		navigate('Daily Report', { screen: 'Vehicle', params: { screen: 'Mileage' } });

	return (
		<View>
			<Text>Fuel</Text>
			<CustomButton text='Next' onPress={goToMileage} />
			<CustomButton text='Back' onPress={() => navigation.pop()} />
		</View>
	);
};

export default Fuel;
