import AsyncStorage from '@react-native-async-storage/async-storage';

import actions from '../api/api';

export const signIn = async (userId, password) => {
	try {
		const signInResponse = await actions.login({ userId, password });

		if (signInResponse.data.success) {
			const token = signInResponse.data.token;
			await AsyncStorage.setItem('token', token);
			return signInResponse;
		}
	} catch (error) {}
};
