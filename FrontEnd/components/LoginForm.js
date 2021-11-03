import AppLoading from "expo-app-loading";
import React, { useContext, useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Text, } from "react-native";
import { AuthContext } from "../context/AuthContext";
import db from "../routes/api";

export default function LoginForm({navigation}) {
  let {user, setUser, loading, setLoading, logout} = useContext(AuthContext)
  let [userId, setUserId] = useState('')
  
  const timeout = 5000;
  
  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await db.userAuth(userId);
    setUser(res.data)

    if(!user){
     setTimeout(() => {
       <AppLoading />
     }, timeout);
    } else {
      setLoading(false)
      navigation.navigate("Home")
    }
  };

  const goToRegister = () => navigation.navigate("Register")


return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              placeholder='User ID'
              onChangeText={text => setUserId(text)}
            />
            <View style={styles.btnContainer}>
                <Button title='Login' onPress={handleLogin} />
                <Button title='Register' onPress={goToRegister} />
            </View>
            <View>
              <Text> 
                {user?.first}
                {user?.last}
                </Text>
               </View>
          </View>
        </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  
  btnContainer: {
    alignItems: "center",
  },
  content: {
    flex: 1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 15
  },
});
