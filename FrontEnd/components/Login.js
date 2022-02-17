import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import actions from '../api/api';
import useAuth from '../context/useAuth';
import C_Input from './custom/C_Input';
import C_Button from './custom/C_Button';
import Container from './custom/C_Container';
import LoadView from './custom/C_Loader';

const Login = () => {
	const { setUser, error, setError, loading, setLoading, setAuthToken, getUser } =
		useAuth();
	const [userID, setuserID] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState('');
	const [isHidden, setIsHidden] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		setLoading(false);
		if (loginError) {
			Alert.alert('Error', loginError);
			setLoginError('');
		}
	}, [loginError]);

	const handleLogin = async () => {
		setLoading(true);

		if (userID < 5 || password < 5) {
			setLoading(false);
			setLoginError('Please enter a valid user id and password');
		}
		let res = await actions.login(userID, password);
		try {
			if (res.success) {
				setLoading(false);
				// setuserID('');
				// setPassword('');
				getUser();
			}
		} catch (err) {
			setLoading(false);
			setLoginError(err.message);
		}
	};

	if (loading) {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
		return <LoadView />;
	}

	return (
		<Container style={styles.loginContainer}>
			<Text style={styles.errorMessage}>{error && <Text>{error}</Text>}</Text>
			<View style={styles.inputSection}>
				<C_Input placeholder='User ID' value={userID} setValue={setuserID} />
				<C_Input
					placeholder='Password'
					value={password}
					setValue={setPassword}
					secureTextEntry={isHidden}
				/>
				<C_Button text='Login' onPress={handleLogin} type='SECONDARY' />
				<C_Button text='Forgot Password' type='TERTIARY' />
				<C_Button text='Register' onPress={() => navigation.navigate('Register')} />
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
