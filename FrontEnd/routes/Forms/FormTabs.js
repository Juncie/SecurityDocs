import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Damage from '../../screens/Forms/DamageScreen';
import Equipment from '../../screens/Forms/EquipmentScreen';
import Issue from '../../screens/Forms/IssueScreen';
import ActivityReport from '../../screens/Forms/ActivityReportScreen';
import VehicleStack from './VehicleStack';

const FormTab = createBottomTabNavigator();

const FormTabs = () => {
	return (
		<FormTab.Navigator screenOptions={{ headerShown: false }}>
			<FormTab.Screen name='Equipment' component={Equipment} />
			<FormTab.Screen name='Damage' component={Damage} />
			<FormTab.Screen name='Vehicle' component={VehicleStack} />
			<FormTab.Screen name='ActivityReport' component={ActivityReport} />
		</FormTab.Navigator>
	);
};

export default FormTabs;
