import axios from 'axios';
import userEvent from '@testing-library/user-event';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log(process.env);

const serverUrl =
	process.env.NODE_ENV === 'production' ? '' : `http://localhost:5000/api/auth`;

console.log(serverUrl);

export default dbActions = {
	login: async ({ userId, password }) => {
		let res = await axios.post(`${serverUrl}/login`, { userId, password });
		console.log(res);
		AsyncStorage.setItem('token', res.data.token);
		return res;
	},
	register: async profile => await axios.post(`${serverUrl}/register`, profile),
	getUser: async () => await axios.get(`${serverUrl}/getuser`),
};
