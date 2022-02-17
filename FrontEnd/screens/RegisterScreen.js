import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import Register from '../components/Register';

export default RegisterScreen = () => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<Register />
		</TouchableWithoutFeedback>
	);
};
