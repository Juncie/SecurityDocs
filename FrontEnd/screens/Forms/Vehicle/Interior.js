import { View, Text } from 'react-native';
import React from 'react';

import CustomButton from '../../../components/custom/C_Button';

const Interior = ({ navigation }) => {
	const navigate = navigation.navigate;
	const goToTires = () =>
		navigate('Daily Report', { screen: 'Vehicle', params: { screen: 'Tires' } });

	return (
		<View>
			<Text>Interior</Text>
			<CustomButton text='Next' onPress={goToTires} />
			<CustomButton text='Back' onPress={() => navigation.pop()} />
		</View>
	);
};

export default Interior;
