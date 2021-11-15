import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { set } from 'react-native-reanimated';

import dbActions from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState('');
	const [loadingInitial, setLoadingInitial] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (user) {
			setUser(user);
		} else {
			setUser(null);
		}
		console.log('Use Effect Completed');
		setLoadingInitial(false);
	}, []);

	const logout = async () => {
		setLoading(true);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user, 
				setUser, 
				error, 
				setError, 
				loading, 
				setLoading, 
				logout
			}}
		>
			{!loadingInitial && children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
