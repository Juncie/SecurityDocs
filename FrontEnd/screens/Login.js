import React, { useState, useContext } from "react";
import { Image, Keyboard, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, View, StyleSheet, Button, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import UserContext from "../context/UserContext";
import dbRoute from "../routes/api";


function Login({navigation}) {
  const [enableShift, setEnableShift] = useState();
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  
const {user, setUser} = useContext(UserContext)

const findUser = async userId => {
  let res = await dbRoute.getUser(userId).then(user => {
    console.log(user)
    setUser(user)
  })

}  

return (
    <KeyboardAvoidingView behavior='height' enabled={enableShift} style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View style={styles.content}>
          <Image source={require("../assets/icon.png")} style={styles.image} />
          <TextInput onFocus={() => setEnableShift(true)} placeholder='Employee Id' style={styles.input} onChangeText={text => setUserId(text)} />
          <TextInput onFocus={() => setEnableShift(true)} placeholder='Password' style={styles.input} onChangeText={text => setPassword(text)} />
          <View style={styles.btnContainer}>
            <Button title='Login' onPress={findUser} />
            <Button title='Register' onPress={() => navigation.navigate('Register')} />
          </View>
        </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: 200,
    height: 200,
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "75%",
    height: 45,
    padding: 5,
  },
  btnContainer: {
    marginBottom: 100,
    flexDirection: "row",
  },
});

export default Login;
