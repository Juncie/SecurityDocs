import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, Switch } from 'react-native';
import CustomButton from '../custom/CustomButton';

import Container from '../custom/CustomContainer';
import {useNavigation} from '@react-navigation/native';

export default Equipment = () => {
	const [equipment, setEquipment] = useState({});

	const [phone, setPhone] = useState(false);
	const [showPhone, setShowPhone] = useState(false);

	const [radio, setRadio] = useState(false);
	const [showRadio, setShowRadio] = useState(false);

	const [keys, setKeys] = useState(false);
	const [showKeys, setShowKeys] = useState(false);

	const [flashlight, setFlashlight] = useState(false);
	const [showFlashlight, setShowFlashlight] = useState(false);

	const [other, setOther] = useState(false);
	const [showOther, setShowOther] = useState(false);

	const WittmannEquipment = [
		{
			name: 'Phone',
			value: phone,
			show: showPhone,
			set: setShowPhone,
			setValue: setPhone,
		},
		{
			name: 'Radio',
			value: radio,
			show: showRadio,
			set: setShowRadio,
			setValue: setRadio,
		},
		{
			name: 'Keys',
			value: keys,
			show: showKeys,
			set: setShowKeys,
			setValue: setKeys,
		},
		{
			name: 'Flashlight',
			value: flashlight,
			show: showFlashlight,
			set: setShowFlashlight,
			setValue: setFlashlight,
		},
		{
			name: 'Other',
			value: other,
			show: showOther,
			set: setShowOther,
			setValue: setOther,
		},
	];

	//map through the array of objects and return the name and value
	const WittmannEquipmentList = WittmannEquipment.map((item, index) => {
		return (
			<View key={index}>
				<Text>{item.name}</Text>
				<Switch
					value={item.value}
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					onValueChange={() => {
						item.set(!item.show);
					}}
				/>
			</View>
		);
	});

	return <Container style={formContainer}>
		{WittmannEquipmentList}
		<CustomButton title="Next" onPress={} />
	</Container>;
};

const styles = StyleSheet.create({
	tabTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	formContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	options: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginBottom: 10,
	},
});

const { tabTitle, formContainer, options } = styles;
