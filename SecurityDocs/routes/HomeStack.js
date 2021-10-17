import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import Login from "../screens/Login";
import SAR from "../screens/SAR";
import Forms from "../screens/Forms";

const Stack = createNativeStackNavigator();

const Users = [
  {
    33879: {
      first: "Brandon",
      last: "Mitchell",
      id: 33879,
      role: "admin",
    },
    12345: {
      first: "Carlo",
      last: "Mendez",
      id: 12345,
      role: "admin",
    },
    67890: {
      first: "Andrew",
      last: "Kernohan",
      id: 67890,
      role: "user",
    },
  },
];

const HomeStack = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator defaultScreenOptions={}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Forms' component={Forms} />
        <Stack.Screen name='SAR' component={SAR} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
