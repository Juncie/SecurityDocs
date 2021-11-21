import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dbActions from '../api/api';
import useAuth from '../context/useAuth';
import CustomInput from './custom/CustomInput';
import CustomButton from './custom/CustomButton';
import Container from './custom/CustomContainer';
import { GlobalStyles } from '../styles/GlobalStyles';

const Login = () => {
	const { setUser, error, setError } = useAuth();
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const navigation = useNavigation();

	const handleLogin = async () => {
		if (!userId || !password) {
			setError('Please provide a login and password.');
			setTimeout(() => setError(''), 5000);
		}
		try {
			let res = await dbActions.login({ userId, password });
			console.log(res);
		} catch (error) {
			setError(error.message);
			console.log(error.message);
			setTimeout(() => setError(''), 5000);
		}
	};

	return (
		<Container>
			<Text style={styles.errorMessage}>{error && <Text>{error}</Text>}</Text>
			<View style={styles.inputSection}>
				<CustomInput
					placeholder='User ID'
					value={userId}
					setValue={setUserId}
				/>
				<CustomInput
					placeholder='Password'
					value={password}
					setValue={setPassword}
					secureTextEntry={true}
				/>
				<CustomButton text='Login' onPress={handleLogin} />
				<CustomButton
					text='Register'
					type='SECONDARY'
					onPress={() => navigation.navigate('Register')}
				/>
				<CustomButton text='Home' onPress={() => navigation.navigate('Home')} />
			</View>
		</Container>
	);
};

export default Login;

const styles = StyleSheet.create({
	inputSection: {
		alignContent: 'center',
		height: '80%',
		width: '85%',
		justifyContent: 'center',
		backgroundColor: '#fefefe',
	},
	errorMessage: {
		marginVertical: 10,
		alignSelf: 'center',
		color: 'red',
	},
});
