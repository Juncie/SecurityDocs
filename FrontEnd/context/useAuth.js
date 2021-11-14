import React, { createContext, useContext, useState, useEffect } from 'react';
import { set } from 'react-native-reanimated';

import dbActions from '../api/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [userId, setUserId] = useState('');
	const [role, setRole] = useState('');
	const [location, setLocation] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const getUser = async () => {
		try {
			await dbActions.getUser();
			setUser(user);
		} catch (error) {
			console.log(error.message);
		}
	};
    
	useEffect(() => {
		try {
			getUser();
			console.log(`Logged in as: ${user?.name}`);
		} catch (error) {
			console.log(error.message);
		}
	});

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				first,
				setFirst,
				last,
				setLast,
				email,
				setEmail,
				userId,
				setUserId,
				role,
				setRole,
				location,
				setLocation,
				password,
				setPassword,
				error,
				setError,
				loading,
				setLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}; 

export default function useAuth() {
	return useContext(AuthContext);
}
