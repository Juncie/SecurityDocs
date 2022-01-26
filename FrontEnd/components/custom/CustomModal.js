import { View, Text, StyleSheet, Modal, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';

export default ModalPopup = ({
	visible,
	transparent,
	children,
	animationType,
	onRequestClose,
	onDismiss,
	containerStyle,
}) => {
	const handleClose = () => {
		visible = false;
	};

	return (
		<Modal
			visible={visible}
			onRequestClose={onRequestClose}
			animationType={animationType}
			transparent={transparent}
			onDismiss={onDismiss}
		>
			<View style={[styles.modalContainer]}>
				<View style={styles.formContainer || containerStyle}>{children}</View>
				<View style={styles.ButtonContainer}>
					<CustomButton text='Close' onPress={onRequestClose} type='PRIMARY' />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: '#7184aa',
	},
	ButtonContainer: {
		flexDirection: 'column-reverse',
		marginTop: -20,
		height: '100%',
	},
});
