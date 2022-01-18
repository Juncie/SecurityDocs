import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../custom/CustomButton';

export default Damage = () => {
	const [damage, setDamage] = useState({});

	//get request to get damage

	//if damage, push damage to state and show modal
	//if no damage, show no damage modal

	return (
		<View>
			<Text style={textHeader}>Is there new damage to the vehicle?</Text>
			<CustomButton
				title='Yes'
				onPress={() => {
					setDamage(true);
				}}
			/>
			<CustomButton
				title='No'
				type='secondary'
				onPress={() => {
					setDamage(false);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	textHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
});

let { textHeader } = styles;
