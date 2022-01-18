import axios from 'axios';
import userEvent from '@testing-library/user-event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const PORT = 8080;

const serverUrl =
	process.env.NODE_ENV === 'production' ? '' : `http://localhost:${PORT}/api`;

console.log('serverURL', serverUrl);

const createHeaders = () => {
	return {
		headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
	};
};

export default actions = {
	getUser: async () => await axios.get(`${serverUrl}/auth/getuser`, createHeaders()),
	register: async profile => await axios.post(`${serverUrl}/auth/register`, profile),
	login: async (userID, password) => {
		try {
			const { data } = await axios.post(`${serverUrl}/auth/login`, {
				userID,
				password,
			});
			if (data) {
				let token = data.token;
				let user = data.user;
				await AsyncStorage.setItem('token', token);
				await AsyncStorage.setItem('user', JSON.stringify(user));
				return data;
			}
		} catch (e) {
			console.log(e);
		}
		return data;
	},
};
