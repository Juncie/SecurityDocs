import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

function Home({ navigation }) {
const lastScreen = () => {
  navigation.goBack('Login')
console.log('Going back!');
}

  return (
    <View style={styles.container}>
      <View>
        <Button title='Log Out' onPress={() => navigation.navigate("Login")} />
      </View>
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Button title='Forms' onPress={() => navigation.navigate("Forms")} />

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Home;
