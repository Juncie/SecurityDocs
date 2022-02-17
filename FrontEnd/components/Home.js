import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAuth from '../context/useAuth';
import C_Button from './custom/C_Button';
import Container from './custom/C_Container';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
	const { user, logout } = useAuth();
	const navigation = useNavigation();
	return (
		<Container style={styles.container}>
			<Text style={styles.text}>
				{user?.first} <Text>{user?.last}</Text>
			</Text>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate('Daily Report')}
					style={styles.option}
				>
					<Text style={styles.optionText}>Forms</Text>
				</TouchableOpacity>
			</View>
			<C_Button text='Logout' onPress={logout} type='TERITARY' />
		</Container>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	text: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 30,
		marginTop: 10,
	},
	option: {
		marginHorizontal: '10%',
		width: '35%',
		height: '60%',
		backgroundColor: 'gray',
	},
	optionText: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white',
	},
});
