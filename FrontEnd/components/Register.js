import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	SafeAreaView,
	ActivityIndicator,
	ScrollView,
} from 'react-native';
import useAuth from '../context/useAuth';

const Register = () => {
	const { user, setUser, error, setError, loading, setLoading } = useAuth();

	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [userId, setUserId] = useState('');
	const [role, setRole] = useState('');
	const [location, setLocation] = useState('');
	const [password, setPassword] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [profile, setProfile] = useState({});

	const navigation = useNavigation();
	const goToLogin = () => navigation.navigate('Login');

	const handleChange = (name, val) => {
		let newProfile = { ...profile };
		newProfile[name] = val;
		setProfile(newProfile);
	};
	
	const handleSubmit = async () => {
		setLoading(true);
		if (email !== confirmEmail) {
			setLoading(false);
			setEmail('');
			setConfirmEmail('');
			setTimeout(() => {
				setError('');
			}, 5000);
			return setError('Emails do not match');
		}

		if (password !== confirmPassword) {
			setLoading(false);
			setPassword('');
			setConfirmPassword('');
			setTimeout(() => {
				setError('');
			}, 5000);
			return setError('Passwords do not match');
		}
		try {
			setLoading(false);
			let res = await dbActions.register(profile);
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => setError(''), 5000);
		}
	};

	if (!loading) {
		<ActivityIndicator size='large' color='green' />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<ScrollView>
					<Text style={styles.errorMessage}>{error && <Text>{error}</Text>}</Text>
					<TextInput
						value={first}
						placeholder='First'
						onChangeText={(text) => {
							setFirst(text);
							handleChange(text);
						}}
						style={styles.input}
					/>
					<TextInput
						value={last}
						placeholder='Last'
						onChangeText={(text) => {
							setLast(text);
							handleChange('last', text);
						}}
						style={styles.input}
					/>
					<TextInput
						value={email}
						placeholder='Email'
						onChangeText={(text) => {
							setEmail(text);
							handleChange('email', text);
						}}
						style={styles.input}
					/>
					<TextInput
						value={confirmEmail}
						placeholder='Confirm Email'
						onChangeText={(text) => setConfirmEmail(text)}
						style={styles.input}
					/>

					<TextInput
						value={userId}
						placeholder='User id'
						maxLength={5}
						onChangeText={(text) => {
							setUserId(text);
							handleChange('userId', text);
						}}
						style={styles.input}
						keyboardType='number-pad'
					/>

					<TextInput
						value={role}
						placeholder='Role'
						onChangeText={(text) => {
							setRole(text);
							handleChange('role', text);
						}}
						style={styles.input}
					/>
					<TextInput
						value={location}
						placeholder='Location'
						onChangeText={(text) => {
							setLocation(text);
							handleChange('location', text);
						}}
						style={styles.input}
					/>
					<TextInput
						value={password}
						placeholder='Password'
						onChangeText={(text) => {
							setPassword(text);
							handleChange('password', text);
						}}
						style={styles.input}
					/>
					<TextInput
						value={confirmPassword}
						placeholder='Confirm Password'
						onChangeText={(text) => setConfirmPassword(text)}
						style={styles.input}
					/>
					<TouchableOpacity style={styles.button} onPress={handleSubmit} style={styles.button}>
						<Text style={styles.text}>Register This User</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.secondaryButton} onPress={goToLogin}>
						<Text style={styles.secondaryText}>Back to Login</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: 'green',
		padding: 15,
		borderRadius: 5,
		height: 50,
		width: 200,
		marginVertical: 20,
		alignSelf: 'center',
	},
	secondaryButton: {
		height: 50,
		width: 200,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 5,
		textAlign: 'center',
		padding: 15,
		alignSelf: 'center',
	},
	secondaryText: {
		color: 'black',
		alignSelf: 'center',
	},
	text: {
		alignSelf: 'center',
		color: 'white',
	},
	errorMessage: {
		marginVertical: 10,
		alignSelf: 'center',
		color: 'red',
	},
	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		padding: 10,
		marginVertical: 5,
		width: '75%',
		alignSelf: 'center',
	},
});
