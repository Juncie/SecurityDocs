import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, 
         TextInput, 
         TouchableWithoutFeedback, 
         Keyboard, 
         StyleSheet, 
         Alert, Button } from "react-native";

import dbActions from "../api/api";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      let user = await dbActions.login(userId, password);

      if (!user) {
        Alert.alert("Invalid User");
      }
      setUser(user);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput keyboardType='numeric' style={styles.input} placeholder='User ID' onChangeText={(text) => setUserId(text)} />

        <TextInput style={styles.input} placeholder='Password' onChangeText={(text) => setPassword(text)} />
        <Button title='Login' onPress={handleLogin} />
        <Button title='Register' onPress={() => navigation.navigate("Register")} />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 15,
    marginVertical: 5,
  },
});

export default Login;

