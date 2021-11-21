import React, { useEffect } from 'react';

import AppStack from './routes/index';
import { AuthProvider } from './context/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from './context/useAuth';

export default function App({ navigation }) {
	return (
		<AuthProvider>
			<AppStack />
		</AuthProvider>
	);
}
