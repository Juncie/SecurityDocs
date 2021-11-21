import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';

const CustomButton = ({ text, onPress, type = 'PRIMARY', mode = 'LIGHT', bgColor, fgColor}) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
			text={text}
			style={[
				styles.container, 
				styles[`container_${type}_${mode}`],
				bgColor ? {backgroundColor: bgColor} : {}
			]}
		>
			<Text style={[
				styles.text, 
				styles[`text_${mode}`],
				fgColor ? {color: fgColor} : {}
			]}>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderRadius: 5,
		width: '75%',
		marginTop: 10,
		alignSelf: 'center',
	},
	container_PRIMARY_LIGHT: {
		backgroundColor: GlobalStyles.primary,
	},
	container_PRIMARY_DARK: {
		backgroundColor: GlobalStyles.primary,
	},
	container_SECONDARY_LIGHT: {
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		textAlign: 'center',
		alignSelf: 'center',
	},
	container_SECONDARY_DARK: {
		backgroundColor: GlobalStyles.secondry,
	},
	contianer_TERTIARY_LIGHT: {
		borderColor: GlobalStyles.primary,
		borderWidth: 1,
		backgroundColor: GlobalStyles.primary,
	},
	contianer_TERTIARY_DARK: {
		borderColor: GlobalStyles.primary,
		borderWidth: 1,
	},
	
	text: {
		fontWeight: 'bold',
		textAlign: 'center',
	},
	text_LIGHT: {
		color: 'white',
	},
	text_DARK: {
		color: '#010101',
	},
});
