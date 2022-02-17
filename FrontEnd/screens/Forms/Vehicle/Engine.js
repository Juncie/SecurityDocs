import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import C_Button from '../../../components/custom/C_Button';

const Engine = ({ navigation }) => {
	const navigate = navigation.navigate;
	const goToExterior = () =>
		navigate('Daily Report', { screen: 'Vehicle', params: { screen: 'Exterior' } });

	return (
		<View>
			<Text>Engine</Text>
			<C_Button text='Next' onPress={goToExterior} />
		</View>
	);
};

export default Engine;
