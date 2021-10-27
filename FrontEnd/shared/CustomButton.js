import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  <TouchableOpacity onPress={onPress} style={[styles.container, styles.container[`container_$type`], bgColor ? { backgroundColor: bgColor } : {}]}>
    <Text style={[styles.text, styles[`text_${type}`], fgColor ? { color: fgColor } : {}]}>{text}</Text>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {},
  container_PRIMARY: {},
  container_SECONDARY: {},
  container_TERITARY: {},
  text: {},
  text_PRIMARY: {},
  text_SECONDARY: {},
  text_TERITARY: {},
});

export default CustomButton;