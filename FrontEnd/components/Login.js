import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import actions from '../api/api';
import useAuth from '../context/useAuth';
import CustomInput from './custom/CustomInput';
import CustomButton from './custom/CustomButton';
import Container from './custom/CustomContainer';
import LoadView from './custom/CustomLoader';

const Login = () => {
	const { setUser, error, setError, loading, setLoading, authToken } =
		useAuth();
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const [isHidden, setIsHidden] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		if (loginError) {
			Alert.alert('Error', loginError);
			setLoginError('');
		}
	}, [loginError]);

	const handleLogin = async () => {
		setLoading(true);

		if (userId < 1 || password < 1) {
			setLoading(false);
			setLoginError('Please enter a valid user id and password');
			return;
		}
		try {
			let { data } = await actions.login(userId, password);

			if (data.success) {
				setUser(data.user);
				setLoading(false);
				setUserId('');
				setPassword('');
			}
		} catch (err) {
			setLoginError(err.message);
		}
		setLoading(false);
	};

	if (loading) {
		return <LoadView />;
	}

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
					secureTextEntry={isHidden}
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
