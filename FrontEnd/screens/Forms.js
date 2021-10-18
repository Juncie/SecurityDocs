import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

function Forms({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("SAR")}>
        <Text>SAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Forms;
