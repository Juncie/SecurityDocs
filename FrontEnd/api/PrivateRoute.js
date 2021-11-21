import React, { useEffect, useState } from 'react';
import axios from axios

import useAuth from '../context/useAuth';
import { Text } from 'react-native';

const PrivateRoute = ({ history }) => {
	const { error, setError } = useAuth();
	const [privateData, setPrivateData] = useState('');

	useEffect(() => {
		if(!AsyncStorage.getItem('token')){
		}
		
		const getPrivateData = async () => {
			const config = {
				headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
			}
			try {
				const {data} = await axios.get("/api/private", config);
				setPrivateData(data.data);
			} catch (error) {
				AsyncStorage.removeItem('token')
				setError("Not authorizied, please login.");
			}
		}
		getPrivateData();
	}, [history])
	return (
		error ? <Text>{error.message}</Text> : <> 
		<View>{privateData}</View>
		</>
	)
};

export default PrivateRoute;
