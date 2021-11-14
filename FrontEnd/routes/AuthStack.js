import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthStack = ({ navigation }) => {
  
  return <Stack.Navigator>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
         </Stack.Navigator>
};

export default AuthStack;