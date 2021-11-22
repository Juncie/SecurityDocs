import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	SafeAreaView,
	Alert,
} from 'react-native';
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
		if (userId.length < 5 || password.length < 5) {
			Alert.alert('Warning!', 'Please provide a valid username and password.');
		} else {
			try {
				let res = await dbActions.login({ userId, password });
				AsyncStorage.setItem('authToken', res.data.token);
				setUser(res.data.user);
			} catch (error) {
				setError('Invalid Credentials');
				setTimeout(() => setError(''), 5000);
			}
		}
	};

	return (
		<Container style={styles.loginContainer}>
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
				<CustomButton text='Login' onPress={handleLogin} type='SECONDARY' />
				<CustomButton text='Forgot Password' type='TERTIARY' />
				<CustomButton onPress={() => navigation.navigate('Register')} />
			</View>
		</Container>
	);
};

export default Login;

const styles = StyleSheet.create({
	loginContainer: {
		alignItems: 'center',
	},
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
