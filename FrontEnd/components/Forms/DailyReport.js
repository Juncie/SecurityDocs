import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, Text, View } from 'react-native';

import Container from '../custom/CustomContainer';
import Equipment from './Equipment';
import SAR from './SAR';
import Vehicle from './Vehicle';
import CustomButton from '../custom/CustomButton';

export default DailyReport = () => {};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	modalContainer: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
});

const {
	container,
	modalContainer,
	modalTitle,
	modalBody,
	modalHeader,
	centeredView,
	modalTitleText,
	modalButtonContainer,
} = styles;
