import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.header}>
        <MaterialIcons name='home' size={28} onPress={{}} style={styles.icon} />
      <View>
        <Text style={styles.headerText}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
});
