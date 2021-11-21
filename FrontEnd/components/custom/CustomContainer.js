import React from 'react'
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

export default function Container({children}) {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
	},
})
