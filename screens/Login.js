import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";

function Login({ navigation }) {
  return (
    <View style={styles.LoginContainer}>
      <Image source={require("../assets/icon.png")} style={styles.BigLogo} />

      <TextInput style={styles.LoginInput} placeholder={"Employee Number"} />

      <TouchableOpacity
        style={styles.LoginButton}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={{ color: "white" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  LoginInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "75%",
    height: "8%",
    margin: 12,
    padding: 10,
  },

  BigLogo: {
    height: 220,
    resizeMode: "contain",
  },

  LoginButton: {
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#3177FF",
  },
});
export default Login;
