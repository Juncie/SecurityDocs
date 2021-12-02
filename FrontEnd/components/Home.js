import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useAuth from '../context/useAuth';
import CustomButton from './custom/CustomButton';
import Container from './custom/CustomContainer';

const Home = () => {
	const { user, logout } = useAuth();
	return (
		<Container style={styles.container}>
			<Text style={styles.text}>
				{user?.first} <Text>{user?.last}</Text>
			</Text>
			<CustomButton text='Logout' onPress={logout} />
		</Container>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
	},
});
