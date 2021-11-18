import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

import dbActions from '../api/api';
import useAuth from '../context/useAuth';

const Login = () => {
	const { error, setError } = useAuth();
	const [showErr, setShowErr] = useState(false);

	const navigation = useNavigation();

	const validation = Yup.object().shape({
		userId: Yup.string().required('User Id is required.'),
		password: Yup.string().required('Password is required.'),
	});

	const validate = async () => {
		const validateResult = await validation
			.validate(validation, { abortEarly: false })
			.catch((err) => {
				setShowErr(true);
				setTimeout(() => setShowErr(false), 15000);
			});
		return validateResult;
	};

	const handleLogin = async (profile) => {
		console.log(`profile`, profile);
		try {
			let res = await dbActions.login(profile);
			if (!user) {
				alert('Invalid Login');
			}
		} catch (error) {
			setError(error.message);
			setTimeout(() => setError(''), 5000);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.errorMessage}>{error && <Text>{error}</Text>}</Text>
			<Formik
				initialValues={{ userId: '', password: '' }}
				onSubmit={handleLogin}
				validationSchema={validation}
				validateOnChange={false}
				validate={validate}
			>
				{({ values, handleChange, handleSubmit, errors }) => (
					<ScrollView>
						<TextInput
							style={styles.input}
							value={values.userId}
							placeholder='User Id'
							onChangeText={handleChange('userId')}
						/>
						<Text style={styles.errorMsg}>{showErr&& <Text>{errors?.userId}</Text>}</Text>

						<TextInput
							style={styles.input}
							value={values.password}
							placeholder='Password'
							onChangeText={handleChange('password')}
						/>
						<Text style={styles.errorMsg}>{showErr && <Text>{errors?.userId}</Text>}</Text>
						<Button title='Login' onPress={handleSubmit} />
						<Button title='Register' onPress={() => navigation.navigate('Register')} />
					</ScrollView>
				)}
			</Formik>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
	},
	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		padding: 10,
		marginVertical: 5,
		width: '75%',
		alignSelf: 'center',
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
});
