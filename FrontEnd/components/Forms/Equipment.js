import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, Switch } from 'react-native';
import CustomButton from '../custom/CustomButton';

import Container from '../custom/CustomContainer';

export default Equipment = () => {
	const [equipment, setEquipment] = useState({});

	const [phone, setPhone] = useState(false);
	const [showPhone, setShowPhone] = useState(false);
	const [keys, setKeys] = useState(false);
	const [showkeys, setShowKeys] = useState(false);
	const [radio, setRadio] = useState(false);

	return (
		<Container>
			<Text style={tabTitle}>Equipment</Text>
			<View style={formContainer}>
				<View style={options}>
					<Text>Phone</Text>
					<Switch value={phone} onValueChange={() => setShowPhone(!showPhone)} />
				</View>
				{showPhone && (
					<Modal style={modalContainer}>
						<CustomButton
							text='Close Modal'
							onPress={() => setShowPhone(false)}
							type='SECONDARY'
						/>
					</Modal>
				)}

				<View>
					<Text>Keys</Text>
				</View>

				<View>
					<Text>Radio</Text>
				</View>
				<View>
					<Text>Flashlight</Text>
				</View>

				<View>
					<Text>Other</Text>
				</View>
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: 'grey',
	},

	tabTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},

	formContainer: {
		flexDirection: 'column',
		marginTop: 10,
	},

	options: {
		flexDirection: 'row',
		marginBottom: 10,
		alignItems: 'center',
	},
});

let { tabTitle, formContainer, modalContainer, options } = styles;
