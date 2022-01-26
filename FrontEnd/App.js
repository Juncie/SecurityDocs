import React from 'react';

import AppStack from './routes/index';
import { AuthProvider } from './context/useAuth';
import useAuth from './context/useAuth';

export default function App({ navigation }) {
	const { user } = useAuth();

	return (
		<AuthProvider>
			<AppStack />
		</AuthProvider>
	);
}
