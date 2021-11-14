import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function Container({children}) {
    return (
        <SafeAreaView styles={} >
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
