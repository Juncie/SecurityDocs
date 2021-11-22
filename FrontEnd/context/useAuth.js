import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { set } from 'react-native-reanimated';

import dbActions from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState('');
	const [loadingInitial, setLoadingInitial] = useState(true);
	const [loading, setLoading] = useState(false);

	const getUser = async () => {
		const id = AsyncStorage.getItem('token');
		let res = await dbActions.getUser(id);
		setUser(res.data);
		console.log(`User`, user);
	};

	useEffect(() => {
		if (user) {
			setUser(user);
		} else {
			setUser(null);
		}
		setLoadingInitial(false);
	}, []);

	const logout = async () => {
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
