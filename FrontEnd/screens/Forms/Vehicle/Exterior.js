import { View, Text } from 'react-native';
import React from 'react';

import C_Button from '../../../components/custom/C_Button';

const Exterior = ({ navigation }) => {
	const navigate = navigation.navigate;
	const goToInterior = () =>
		navigate('Daily Report', { screen: 'Vehicle', params: { screen: 'Interior' } });

	return (
		<View>
			<Text>Exterior</Text>
			<C_Button text='Next' onPress={goToInterior} />
			<C_Button text='Back' onPress={() => navigation.pop()} />
		</View>
	);
};

export default Exterior;
