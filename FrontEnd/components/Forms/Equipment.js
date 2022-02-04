import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	Modal,
	Switch,
	TextInput,
} from 'react-native';
import CustomButton from '../custom/CustomButton';

import Container from '../custom/CustomContainer';
import Input from '../custom/CustomInput';
import { useNavigation } from '@react-navigation/native';

export default Equipment = () => {
	const [equipment, setEquipment] = useState({});
	const [showPhone, setShowPhone] = useState(false);
	const [showRadio, setShowRadio] = useState(false);
	const [showKeys, setShowKeys] = useState(false);
	const [showFlashlight, setShowFlashlight] = useState(false);
	const [showOther, setShowOther] = useState(false);
	console.log(equipment);

	const navigation = useNavigation();

	return (
		<Container style={formContainer}>
			<Text style={tabTitle}>Equipment</Text>
			<Text style={tabSubtitle}>
				Please enter any equipment you received for your shift.
			</Text>

			<View style={formRow}>
				<Text style={formLabel}>Phone</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={showPhone ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor='#3e3e3e'
					onValueChange={() => setShowPhone(!showPhone)}
					value={showPhone}
				/>
				{showPhone && (
					<View style={formRow}>
						<Input
							style={formInput}
							placeholder='Phone Number'
							onChangeText={text => setEquipment({ ...equipment, phone: text })}
						/>
					</View>
				)}
			</View>

			<View style={formRow}>
				<Text style={formLabel}>Radio</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={showRadio ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor='#3e3e3e'
					onValueChange={() => setShowRadio(!showRadio)}
					value={showRadio}
				/>
				{showRadio && ( // Radio is selected and should be shown in the form below
					<View style={formRow}>
						<Input
							style={formInput}
							placeholder='Radio Number'
							onChangeText={text => setEquipment({ ...equipment, radio: text })}
						/>
					</View>
				)}
			</View>

			<View style={formRow}>
				<Text style={formLabel}>Keys</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={showKeys ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor='#3e3e3e'
					onValueChange={() => setShowKeys(!showKeys)}
					value={showKeys}
				/>
				{showKeys && ( // Keys is selected and should be shown in the form below
					<View style={formRow}>
						<Input
							style={formInput}
							placeholder='Key Number'
							onChangeText={text => setEquipment({ ...equipment, keys: text })}
						/>
					</View>
				)}
			</View>

			<View style={formRow}>
				<Text style={formLabel}>Flashlight</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={showFlashlight ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor='#3e3e3e'
					onValueChange={() => setShowFlashlight(!showFlashlight)}
					value={showFlashlight}
				/>
				{showFlashlight && ( // Flashlight is selected and should be shown in the form below
					<View>
						<TextInput
							style={formInput}
							placeholder='Flashlight'
							onChangeText={text => setEquipment({ ...equipment, flashlight: text })}
						/>
					</View>
				)}
			</View>

			<View style={formRow}>
				<Text style={formLabel}>Other</Text>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={showOther ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor='#3e3e3e'
					onValueChange={() => setShowOther(!showOther)}
					value={showOther}
				/>
				{showOther && (
					<View style={formRow}>
						<TextInput
							style={formInput}
							placeholder='Other'
							onChangeText={text => setEquipment({ ...equipment, other: text })}
						/>
					</View>
				)}
			</View>
			<CustomButton
				text='Next'
				onPress={() => navigation.navigate('Daily Report', { screen: 'Damage' })}
			/>
		</Container>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		marginTop: 20,
		marginHorizontal: 20,
	},
	tabTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	tabSubtitle: {
		fontSize: 15,
		marginVertical: 10,
		alignSelf: 'center',
		textAlign: 'center',
	},
	formRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

const { tabTitle, formContainer, tabSubtitle, formRow, formLabel, formInput } =
	styles;
