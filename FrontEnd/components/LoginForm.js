import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AuthContext } from "../context/AuthContext";
import db from "../routes/api";

export default function LoginForm(props) {
  let {user, setUser, loading, setLoading} = useContext(AuthContext)
  let [userId, setUserId] = useState('')
  
  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await db.userAuth(userId);
    setUser(res.data)
  };
  useEffect(() => {
    console.log(user ? true : false);
  }, []);
  
console.log(userId);

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
