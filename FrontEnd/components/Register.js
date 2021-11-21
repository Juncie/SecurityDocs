import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	Alert,
} from 'react-native';
import * as yup from 'yup';
import useAuth from '../context/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Container from './custom/CustomContainer';
import CustomButton from './custom/CustomButton';
import CustomInput from './custom/CustomInput';

const Register = () => {
	const { error, setError, loading, setLoading } = useAuth();
	const [showErr, setShowErr] = useState(false);

	const formValues = {
		first: '',
		last: '',
		email: '',
		userId: '',
		role: '',
		location: '',
		password: '',
		confirmEmail: '',
		confirmPassword: '',
	};

	const LoadView = ActivityIndicator;
	const navigation = useNavigation();
	const goToLogin = () => navigation.navigate('Login');

	const validationSchema = yup.object().shape({
		first: yup.string().min(2, 'First name is too short').required('First name is required'),
		last: yup.string().min(2, 'Last name is too short').required('Last name is required'),
		email: yup.string().email('Email is not a valid.').required('Email is required'),
		confirmEmail: yup
			.string()
			.required('Please confirm your email address.')
			.oneOf([yup.ref('email'), null], 'Emails do not match'),
		userId: yup.string().min(5, 'User ID must be at least 5 characters long.'),
		role: yup
			.string()
			.oneOf(['Manager', 'manager', 'Admin', 'admin', 'User', 'user'], 'Invalid role')
			.required('Role is required'),
		location: yup.string().oneOf(['Wittmann', 'Mesa', 'Tempe']).required('Location is required'),
		password: yup
			.string()
			.required('Password is required')
			.min(5, 'Password must be at least 5 characters long.'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'Passwords do not match.')
			.required('Please confirm your password.'),
	});

	const validate = async () => {
		const validateResult = await validationSchema
			.validate(validationSchema, { abortEarly: false })
			.catch((err) => {
				setShowErr(true);
				setTimeout(() => setShowErr(false), 15000);
			});
		return validateResult;
	};

	const handleSubmit = async (profile) => {
		setLoading(true);
		profile.confirmPassword = undefined;
		profile.confirmEmail = undefined;
		console.log(profile);
		try {
			setLoading(false);
			setShowErr(false);
			const { data } = await dbActions.register(profile);
			AsyncStorage.setItem('authToken', data.token);
			Alert.alert(
				`${profile.first} is now an authorizied ${profile.role}`,
				'Would you like to create another user?',
				[
					{
						text: 'Create another user',
						style: 'cancel',
					},
					{ text: 'Back to Login', onPress: () => navigation.navigate('Login') },
				]
			);
		} catch (err) {
			console.log(err.message);
			setLoading(false);
			setError(err.response.data.error);
			setTimeout(() => setError(''), 15000);
			setTimeout(() => setShowErr(false), 7000);
		}
	};

	if (loading) return <LoadView size='large' color='green' style={styles.AI} />;

	return (
		<Container>
			<Text style={styles.errorMessage}>{error && <Text>{error}</Text>}</Text>
			<ScrollView>
				<Formik
					initialValues={formValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
					validateOnChange={false}
					validate={validate}
				>
					{({ values, handleChange, handleSubmit, errors }) => (
						<View>
							<TextInput
								placeholder='First'
								value={values.first}
								onChangeText={handleChange('first')}
								style={styles.input}
							/>
							
							<Text style={styles.errorMsg}>{showErr && <Text>{errors?.first}</Text>}</Text>
							<TextInput
								placeholder='Last'
								value={values.last}
								onChangeText={handleChange('last')}
								style={styles.input}
							/>
							
							<Text style={styles.errorMsg}>{showErr && <Text>{errors?.last}</Text>}</Text>
							<TextInput
								placeholder='Email'
								value={values.email}
								onChangeText={handleChange('email')}
								style={styles.input}
							/>
							
							<Text style={styles.errorMsg}>{showErr && <Text>{errors?.email}</Text>}</Text>
							<TextInput
								placeholder='Confirm Email'
								value={values.confirmEmail}
								onChangeText={handleChange('confirmEmail')}
								style={styles.input}
							/>
							
							<Text style={styles.errorMsg}>{showErr && <Text>{errors?.confirmEmail}</Text>}</Text>
							<TextInput
								placeholder='User id'
								maxLength={5}
								value={values.userId}
								onChangeText={handleChange('userId')}
								keyboardType='number-pad'
								style={styles.input}
							/>
							
							<Text style={styles.errorMsg}>{showErr && <Text>{errors?.userId}</Text>}</Text>
							<TextInput
								placeholder='Role'
								value={values.role}
								onChangeText={handleChange('role')}
								style={styles.input}
							/>
							
							<Text style={styles.errorMsg}>{showErr && <Text>{errors?.role}</Text>}</Text>
							<TextInput
								placeholder='Location'
								value={values.location}
								onChangeText={handleChange('location')}
								style={styles.input}
							/>
							
							<Text style={styles.errorMsg}>{showErr && <Text>{errors?.location}</Text>}</Text>
							<TextInput
								placeholder='Password'
								value={values.password}
								onChangeText={handleChange('password')}
								secureTextEntry={true}
								style={styles.input}
								autoCapitalize={'none'}
							/>
							
							<Text style={styles.errorMsg}>{showErr && <Text>{errors?.password}</Text>}</Text>
							<TextInput
								placeholder='Confirm Password'
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
								secureTextEntry={true}
								style={styles.input}
								autoCapitalize={'none'}
							/>
							<Text style={styles.errorMsg}>
								{showErr && <Text>{errors?.confirmPassword}</Text>}
							</Text>
							<CustomButton text='Register User' onPress={handleSubmit} />
							<CustomButton text='Back to Login' onPress={goToLogin} type='SECONDARY' />
						</View>
					)}
				</Formik>
						
			</ScrollView>
		</Container>
	);
};

export default Register;

const styles = StyleSheet.create({
	errorMessage: {
		marginVertical: 10,
		alignSelf: 'center',
		color: 'red',
	},
	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		padding: 5,
		marginVertical: 5,
		width: '85%',
		alignSelf: 'center',
	},
	errorMsg: {
		alignSelf: 'flex-start',
		color: 'red',
		marginVertical: 5,
		marginLeft: 50,
	},
	
	AI: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
