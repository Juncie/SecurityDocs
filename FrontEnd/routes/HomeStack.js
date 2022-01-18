import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/HomeScreen';
import DailyReport from '../screens/DailyReportScreen';

const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='DailyReport' component={DailyReport} />
		</Stack.Navigator>
	);
};

export default HomeStack;
