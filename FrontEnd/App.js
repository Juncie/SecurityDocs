import React from 'react';

import AppStack from './routes/index';
import { AuthProvider } from './context/useAuth';

export default function App({ navigation }) {
	return (
		<AuthProvider>
			<AppStack />
		</AuthProvider>
	);
}
