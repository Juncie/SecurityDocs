import React, { useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, View, StyleSheet, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";




function Login({ navigation }) {
  const [enableShift, setEnableShift] = useState();
  
  return (
    <KeyboardAvoidingView behavior='height' enabled={enableShift} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Image source={require("../assets/icon.png")} style={styles.image} />
          <TextInput onFocus={() => setEnableShift(true)} placeholder='Employee Id' keyboardType='number-pad' style={styles.input} />
          <View style={styles.btnContainer}>
            <MaterialIcons
              name='delete'
              onPress={() => {
                navigation.navigate("Forms");
              }}
              size={50}
            />
            <Button
              title='Login'
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    // flex: 1,
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
    padding: 5,
  },
  btnContainer: {
    marginBottom: 100,
    flexDirection: "row",
  },
});

export default Login;
