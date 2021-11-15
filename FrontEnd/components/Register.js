import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	SafeAreaView,
	ActivityIndicator,
	ScrollView,
	Button,
} from 'react-native';
import * as yup from 'yup';

import useAuth from '../context/useAuth';
import { dbActions as database } from '../api/api';

const Register = () => {
	const { user, setUser, error, setError, loading, setLoading } = useAuth();

	const [showErr, setShowErr] = useState(false);
	const [submitting, setSubmitting] = useState(true);

	const validate = yup.object().shape({
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

	const navigation = useNavigation();
	const goToLogin = () => navigation.navigate('Login');

	const handleSubmit = async (profile, actions) => {
		setShowErr(true);
		setLoading(true);
		resetForm({ values: '' });
		setTimeout(() => setShowErr(false), 15000);
		actions.resetForm();
		try {
			setLoading(false);
			let res = await dbActions.register(profile);
			console.log(`profile has been created: ${profile.first}`);
		} catch (error) {
			setLoading(false);
			setShowErr(true);
			setError(error.response.data.error);
			setInterval(() => {
				setError('');
			}, 5000);
		}
	};

	{
		loading && <ActivityIndicator size='large' color='green' />;
	}

	return (
		<ScrollView>
			<Text style={styles.errorMessage}>{error && <Text>{error}</Text>}</Text>
			<Formik
				style={styles.container}
				validateOnMount={true}
				initialValues={formValues}
				onSubmit={(values, actions) => {
					handleSubmit(values);
					actions.resetForm();
				}}
				validationSchema={validate}
			>
				{({ values, handleChange, handleBlur, errors, isValid, resetForm }) => (
					<ScrollView style={styles.innerContainer}>
						<TextInput
							placeholder='First'
							onBlur={handleBlur('first')}
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
							style={styles.input}
							keyboardType='number-pad'
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
						<Text style={styles.errorMsg}>{showErr && <Text>{errors?.confirmPassword}</Text>}</Text>
						<TouchableOpacity
							style={styles.button}
							onPress={(values, resetForm) => {handleSubmit(values, resetForm)}}
							style={styles.button}
						>
							<Text style={styles.text}>Register This User</Text>
						</TouchableOpacity>
					</ScrollView>
				)}
			</Formik>
			<TouchableOpacity style={styles.secondaryButton} onPress={goToLogin}>
				<Text style={styles.secondaryText}>Back to Login</Text>
			</TouchableOpacity>
		</ScrollView>
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
	errorMsg: {
		alignSelf: 'flex-start',
		color: 'red',
		marginVertical: 5,
		marginLeft: 50,
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
