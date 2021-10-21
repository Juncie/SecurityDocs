import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import Login from "../screens/Login";
import SAR from "../screens/SAR";
import Forms from "../screens/Forms";
import Header from '../shared/header';

const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name='Login' component={Login} />
        
        <Stack.Screen 
        name='Home' d
        component={Home}
        options={{headerTitle: () => {
        <Header />}
        }} />
        
        <Stack.Screen name='Forms' component={Forms} />
        <Stack.Screen name='SAR' component={SAR} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
