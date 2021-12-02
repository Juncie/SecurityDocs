import AsyncStorage from '@react-native-async-storage/async-storage';
import { reloadAsync } from 'expo-updates';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import actions from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authToken, setAuthToken] = useState(null);
	const [error, setError] = useState('');
	const [loadingInitial, setLoadingInitial] = useState(false);
	const [loading, setLoading] = useState(false);

	const logout = async () => {
		setLoadingInitial(true);
		try {
			await AsyncStorage.removeItem('token');
			await AsyncStorage.removeItem('user');
			setUser(null);
			setAuthToken(null);
			setLoadingInitial(false);
			console.log(`Successfully logged out`);
		} catch (error) {
			console.log(`Error logging out: ${error.message}`);
			setLoadingInitial(false);
		}
	};

	const getToken = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token !== null) {
				setAuthToken(token);
			}
		} catch (error) {
			console.log(`Error getting token: ${error.message}`);
		}
	};

	const getUser = async () => {
		try {
			const user = await AsyncStorage.getItem('user');
			if (user !== null) {
				setUser(JSON.parse(user));
			}
		} catch (error) {
			console.log(`Error getting user: ${error.message}`);
		}
	};

	useEffect(() => {
		getToken();
		getUser();
	}, [user, authToken]);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				authToken,
				setAuthToken,
				error,
				setError,
				loading,
				setLoading,
				logout,
				getUser,
			}}
		>
			{loadingInitial ? (
				<ActivityIndicator size='large' color='green' style={styles.loading} />
			) : (
				children
			)}
		</AuthContext.Provider>
	);
};

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
	},
});

export default function useAuth() {
	return useContext(AuthContext);
}
