import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../custom/CustomButton';

const Damage = () => {
	const [damages, setDamages] = useState({});

	//get request to get damage

	//if damage, push damage to state and show modal
	//if no damage, show no damage modal

	return (
		<View>
			<Text style={textHeader}>Is there new damage to the vehicle?</Text>
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

const { textHeader } = styles;

export default Damage;
