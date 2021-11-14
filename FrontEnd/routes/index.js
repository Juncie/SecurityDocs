import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import useAuth from "../context/useAuth";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

const AppStack = ({ navigation }) => {
    const { user } = useAuth();
  return <NavigationContainer>
      {!user ? <AuthStack /> : <HomeStack />}
        </NavigationContainer>;
};

export default AppStack;
