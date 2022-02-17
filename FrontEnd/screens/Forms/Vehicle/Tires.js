import { View, Text } from 'react-native';
import React from 'react';

import CustomButton from '../../../components/custom/C_Button';

const Tires = ({ navigation }) => {
	const navigate = navigation.navigate;
	return (
		<View>
			<Text>Tires</Text>
			<CustomButton
				text='Next'
				onPress={() =>
					navigate('Daily Report', {
						screen: 'Vehicle',
						params: { screen: 'Fuel' },
					})
				}
			/>
			<CustomButton text='Back' onPress={() => navigation.pop()} />
		</View>
	);
};

export default Tires;
