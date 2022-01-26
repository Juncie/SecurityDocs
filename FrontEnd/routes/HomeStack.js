import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/HomeScreen';
import DailyReport from '../screens/DailyReportScreen';
import FormTabs from './FormTabs';
import CustomButton from '../components/custom/CustomButton';
import useAuth from '../context/useAuth';

const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => {
	const { logout } = useAuth();

	const LogOut = () => {
		return <CustomButton text='Logout' onPress={logout} type='TERITARY' />;
	};
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='Daily Report' component={FormTabs} />
		</Stack.Navigator>
	);
};

export default HomeStack;
