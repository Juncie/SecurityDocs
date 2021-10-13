import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import NavBar from "../components/NavBar";

const HomeComponent = () => {
  <View>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Login");
      }}
    >
      <Text>Login</Text>
    </TouchableOpacity>
  </View>;
};

function Home({ navigation }) {
  return (
    <View>
      <HomeComponent />
      <NavBar />
    </View>
  );
}

export default Home;
