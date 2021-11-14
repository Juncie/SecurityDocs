import React from 'react'
import { StyleSheet,TouchableOpacity} from 'react-native'

export default function Button({children}) {
    return (
        <TouchableOpacity>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})
