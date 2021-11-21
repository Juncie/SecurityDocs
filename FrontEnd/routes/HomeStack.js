import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/HomeScreen";


const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => {
  
  return <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
         </Stack.Navigator>
};

export default HomeStack;