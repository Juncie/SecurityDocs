import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

import actions from '../../api/api';

const SAR = () => {
	const [sar, setSar] = useState({});

	const getUserSAR = async () => {
		await actions
			.getSAR({ id: '61c12960701321af386e7534' })
			.then(res => {
				console.log('res', res);
				setSar(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<View>
			<Text>SAR</Text>
			<Button title='Find User SAR' onPress={getUserSAR} />
		</View>
	);
};

export default SAR;
