import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Login from "./screens/Login";
import Home from "./screens/Home";

function App(props) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: "Login" }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
