import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const CustomInput = ({
	value,
	setValue,
	placeholder,
	secureTextEntry,
	autoCapitalize,
}) => {
	return (
		<View style={styles.container}>
			<TextInput
				value={value}
				onChangeText={setValue}
				style={styles.input}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				autoCapitalize={autoCapitalize}
			/>
		</View>
	);
};

export default CustomInput;

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		padding: 5,
		marginVertical: 5,
		width: '75%',
		alignSelf: 'center',
	},
	button_primary: {},
});
