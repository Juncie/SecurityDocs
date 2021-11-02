import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from "react-native";
import dbRoute from "../routes/api";

export default function LoginForm(props) {
  let [user, setUser] = useState({});

  const handleLogin = async (user) => {
    let res = await dbRoute.findUser(user);
    console.log(res.data);
  };

  return (
    <Formik initialValues={{ userId: "" }} onSubmit={handleLogin} style={styles.container}>
      {(props) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              placeholder='User ID'
              onChange={props.handleChange("userId")}
              value={props.values.userId}
            />
            <View style={styles.btnContainer}>
                <Button title='Login' onPress={props.handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
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
