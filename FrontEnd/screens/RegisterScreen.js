import React from 'react';
import { Keyboard, KeyboardAvoidingView, Text, View, TouchableWithoutFeedback } from "react-native";
import Register from '../components/Register';



export default RegisterScreen = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView>
                <Register />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}


