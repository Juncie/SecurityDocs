import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import db from '../routes/api'


export default function NewUserForm({navigation}){

const submitUser = async user => {
    let res = await db.findUser(user)
    console.log(`You've created a new user!`, res.data);
}

const formValues = { 
  userId: '',
  password: '',
}

console.log(formValues);

  return (
    <View style={styles.container}>
      <Formik initialValues={formValues} onSubmit={submitUser}>
        {(props) => (
          <View>
            <TextInput style={styles.input} placeholder='UserId' onChangeText={props.handleChange('userId')} value={props.values.userId} />
            <TextInput style={styles.input} placeholder='Password' onChangeText={props.handleChange('password')} value={props.values.password} />

            <Button title='Create User' onPress={props.handleSubmit} />

          </View>
        )}
      </Formik>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%%',
        marginHorizontal: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginVertical: 10,
    }
})

