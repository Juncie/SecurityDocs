import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SAR from "../screens/SAR";

function NavBar(props) {
  const NavTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <NavTab.Navigator>
        <NavTab.Screen name="SAR" component={SAR} />
        <NavTab.Screen name="SAR" component={SAR} />
        <NavTab.Screen name="SAR" component={SAR} />
        <NavTab.Screen name="SAR" component={SAR} />
        <NavTab.Screen name="SAR" component={SAR} />
      </NavTab.Navigator>
    </NavigationContainer>
  );
}

export default NavBar;
