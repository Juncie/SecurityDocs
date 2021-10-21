import React from 'react';
import {StyleSheet, View } from 'react-native';

export default function Card(props) {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        
    },

    cardContent: {

    }
})