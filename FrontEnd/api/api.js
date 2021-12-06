import axios from 'axios';
import userEvent from '@testing-library/user-event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

// console.log(process.env);

const serverUrl =
	process.env.NODE_ENV === 'production' ? '' : `http://localhost:5000/api/auth`;

// console.log(serverUrl);

const createHeaders = () => {
	return {
		headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
	};
};

export default actions = {
	getUser: async () => await axios.get(`${serverUrl}/getuser`, createHeaders()),
	register: async profile => await axios.post(`${serverUrl}/register`, profile),
	login: async (userId, password) => {
		const { data } = await axios.post(`${serverUrl}/login`, {
			userId,
			password,
		});
		if (data) {
			console.log(data);
			let token = data.token;
			let user = data.user;
			await AsyncStorage.setItem('token', token);
			await AsyncStorage.setItem('user', JSON.stringify(user));
		}
		return data;
	},
};
