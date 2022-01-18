import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default Equipment = () => {
	const [equipment, setEquipment] = useState({});

	return (
		<View>
			<Text style={modalTitle}>Equipment</Text>
			<View style={formContainer}>
				<Text>Phone</Text>
				<Text>Keys</Text>
				<Text>Radio</Text>
				<Text>Flashlight</Text>
				<Text>Other</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},

	formContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
});

let { modalTitle, formContainer } = styles;
