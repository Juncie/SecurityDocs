import React from 'react';
import {
	Keyboard,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

const Container = ({ style, children }) => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Container;
