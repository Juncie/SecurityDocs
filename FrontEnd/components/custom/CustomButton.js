import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';

const CustomButton = ({
	text,
	onPress,
	type = 'PRIMARY',
	bgColor,
	fgColor,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			text={text}
			style={[
				styles.container,
				styles[`container_${type}`],
				bgColor ? { backgroundColor: bgColor } : {},
			]}
		>
			<Text
				style={[
					styles.text,
					styles[`text_${type}`],
					fgColor ? { color: fgColor } : {},
				]}
			>
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
	container_PRIMARY: {
		backgroundColor: GlobalStyles.primary,
	},

	container_SECONDARY: {
		borderColor: GlobalStyles.primary,
		borderWidth: 2,
		borderRadius: 5,
		textAlign: 'center',
		alignSelf: 'center',
	},

	container_TERTIARY: {},

	text: {
		fontWeight: 'bold',
		textAlign: 'center',
	},
	text_PRIMARY: {
		color: GlobalStyles.white,
	},
	text_SECONDARY: {
		color: GlobalStyles.black,
	},
	text_TERTIARY: {
		color: GlobalStyles.tertiary,
	},
});
