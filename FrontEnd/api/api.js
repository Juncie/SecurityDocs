import axios from 'axios';
import userEvent from '@testing-library/user-event';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PORT = 8080;
const serverUrl =
	process.env.NODE_ENV === 'production' ? '' : `http://localhost:${PORT}/api`;

console.log('serverURL', serverUrl);

// AsyncStorage.getItem('token').then(token => {
// 	console.log('Token', token);
// });

const createHeaders = () => {
	return { headers: { Authorization: `Bearer` } };
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

	newSAR: async post => await axios.post(`${serverUrl}/private/newsar`),

	getSAR: async id =>
		await axios.get(`${serverUrl}/private/getsar/${id}`, createHeaders()),

	getAllSAR: async (date, userID) =>
		await axios.get(
			`${serverUrl}/private/findallsars`,
			{ date, userID },
			createHeaders()
		),

	newSarEntry: async entry =>
		await axios.post(
			`${serverUrl}/private/newsarentry/${sarId}`,
			{ entry }
			// createHeaders()
		),

	updateSarEntry: async (value, sarId, entryId) =>
		await axios.post(
			`${serverUrl}/private/updatesarentry/${sarId}/${entryId}`,
			{ value },
			createHeaders()
		),

	submitSAR: async sarId =>
		await axios.post(`${serverUrl}/private/submitsar/${sarId}`, createHeaders()),

	deleteSAR: async sarId =>
		await axios.post(`${serverUrl}/private/deletesar/${sarId}`, createHeaders()),
};

export const { getUser, register, login, newSAR } = actions;
