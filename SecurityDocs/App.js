import React, { useState } from "react";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Text, View, StyleSheet } from "react-native";

import HomeStack from "./routes/HomeStack";
import Login from "./screens/Login";

let User = 'Brandon';

User ? console.log("true") : console.log("false");

const getFonts = () => {
  return Font.loadAsync({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });
};

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <View>
        <Text>
          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
        </Text>
      </View>
    );
  } else {
    return (
      <AppLoading />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat-Regular",
  },
  container: {
    justifyContent: "center",
  },
});

export default App;
