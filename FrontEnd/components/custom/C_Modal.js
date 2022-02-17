import { View, Text, StyleSheet, Modal, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';

export default ModalPopup = ({
	visible,
	transparent,
	children,
	animationType,
	onRequestClose,
	onDismiss,
	containerStyle,
}) => {
	return (
		<Modal
			visible={visible}
			onRequestClose={onRequestClose}
			animationType={animationType}
			transparent={transparent}
			onDismiss={onDismiss}
			style={[styles.container, containerStyle]}
		>
			<View style={containerStyle}>{children}</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: '#7184aa',
	},
});
