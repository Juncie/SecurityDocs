import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import Engine from '../../screens/Forms/Vehicle/Engine';
import Exterior from '../../screens/Forms/Vehicle/Exterior';
import Interior from '../../screens/Forms/Vehicle/Interior';
import Tires from '../../screens/Forms/Vehicle/Tires';
import Fuel from '../../screens/Forms/Vehicle/Fuel';
import Mileage from '../../screens/Forms/Vehicle/Mileage';
import ItemCheck from '../../screens/Forms/Vehicle/ItemCheck';

const VehicleStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initalState={Engine}>
			<Stack.Group screenOptions={{ presentation: 'containedModal' }}>
				<Stack.Screen name='Engine' component={Engine} />
				<Stack.Screen name='Exterior' component={Exterior} />
				<Stack.Screen name='Interior' component={Interior} />
				<Stack.Screen name='Tires' component={Tires} />
				<Stack.Screen name='Fuel' component={Fuel} />
				<Stack.Screen name='Mileage' component={Mileage} />
				<Stack.Screen name='ItemCheck' component={ItemCheck} />
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default VehicleStack;
