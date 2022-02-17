import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const LoadView = ({ size = 'large', color = 'green' }) => {
	return <ActivityIndicator size={size} color={color} style={styles.loading} />;
};

export default LoadView;

const styles = StyleSheet.create({
	loading: {
		flex: 1,
	},
});
