import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import dbRoute from '../routes/api'

export default function NewUserForm(props){

  const submitUser = async user => {
    let res = await dbRoute.newUser(user)
    console.log(`You've created a new user!`, res.data);
}

const formValues = { 
  first: "", 
  last: "", 
  userId: "", 
  role: "", 
  location: "" 
}

console.log(formValues);

  return (
    <View style={styles.container}>
      <Formik initialValues={formValues} onSubmit={submitUser}>
        {(props) => (
          <View>
            <TextInput style={styles.input} placeholder='First' onChangeText={props.handleChange('last')} value={props.values.last} />
            <TextInput style={styles.input} placeholder='Last' onChangeText={props.handleChange('first')} value={props.values.first} />
            <TextInput style={styles.input} placeholder='UserId' onChangeText={props.handleChange('userId')} value={props.values.userId} />
            <TextInput style={styles.input} placeholder='Role' onChangeText={props.handleChange('role')} value={props.values.role} />
            <TextInput style={styles.input} placeholder='Location' onChangeText={props.handleChange('location')} value={props.values.location} />

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

