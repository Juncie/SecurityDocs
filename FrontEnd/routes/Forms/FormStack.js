import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Equipment from '../../components/Forms/Equipment';
import Vehicle from '../../components/Forms/Vehicle';
import Damage from '../../components/Forms/Damage';

const FormTab = createMaterialBottomTabNavigator();

export default FormStack = () => {
	return (
		<FormTab.Navigator>
			<FormTab.Screen name='Equipment' component={Equipment} />
			<FormTab.Screen name='Vehicle' component={Vehicle} />
			<FormTab.Screen name='Damage' component={Damage} />
			<FormTab.Screen name='Vehicle' component={Vehicle} />
		</FormTab.Navigator>
	);
};
