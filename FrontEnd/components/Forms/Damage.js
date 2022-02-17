import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import C_Button from '../custom/C_Button';
import Container from '../custom/C_Container';

const DamageReport = () => {
	const navigation = useNavigation();
	const [damage, setDamage] = useState({});
	const [open, setOpen] = useState(false);

	//get request to get damage

	//if damage, push damage to state and show modal
	//if no damage, show no damage modal
	return (
		<Container>
			<Text style={textHeader}>Is there new damage to the vehicle?</Text>
			<View style={formRow}>
				<C_Button text='Yes' onPress={() => setOpen(!open)} />

				<C_Button
					text='No'
					onPress={() => navigation.navigate('Daily Report', { screen: 'Vehicle' })}
				/>
			</View>
			{open && ( //if damage, show modal with damage form
				<Modal>
					<View style={modalContainer}>
						<Text style={modalTitle}>Damage</Text>
						<Text style={modalSubtitle}>Please report the damage below.</Text>
						<View style={formRow}>
							<Text style={formLabel}>Area</Text>
							<TextInput style={formInput} placeholder='Area' />
						</View>
						<View style={formRow}>
							<Text style={formLabel}>Description</Text>
							<TextInput style={formInput} placeholder='Description' />
						</View>
						<View style={formRow}>
							<Text style={formLabel}>Attachments</Text>
							<TextInput style={formInput} placeholder='Attachments' />
						</View>
					</View>
					<Button
						title='Submit'
						onPress={() => {
							setOpen(false);
							navigation.navigate('Daily Report', { screen: 'Vehicle' });
						}}
					/>
				</Modal>
			)}
		</Container>
	);
};

const styles = StyleSheet.create({
	textHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		marginVertical: 10,
		alignSelf: 'center',
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
});

const {
	textHeader,
	formRow,
	formLabel,
	formInput,
	modalContainer,
	modalTitle,
	modalSubtitle,
} = styles;

export default DamageReport;
