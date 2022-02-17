import { View, Text } from 'react-native';
import React from 'react';

import CustomButton from '../../../components/custom/C_Button';

const ItemCheck = ({ navigation }) => {
	const navigate = navigation.navigate;
	return (
		<View>
			<Text>Item Check</Text>
			<CustomButton
				text='Next'
				onPress={() =>
					navigate('Daily Report', {
						screen: 'Activity Report',
					})
				}
			/>
			<CustomButton text='Back' onPress={() => navigation.pop()} />
		</View>
	);
};

export default ItemCheck;
