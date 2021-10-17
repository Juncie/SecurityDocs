import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

function touchableNavigator(props) {
  const touchNav = () => {
    navigation.navigate({ screen });
  };

  return (
    <View>
      <TouchableOpacity screen="" onPress={touchNav}></TouchableOpacity>
    </View>
  );
}

export default touchableNavigator;
