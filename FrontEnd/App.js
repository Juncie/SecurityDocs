import React, { useState, useEffect, useContext, createContext } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import HomeStack from "./routes/HomeStack";
import AuthStack from "./routes/AuthStack";
import {AuthProvider, AuthContext} from "./context/AuthContext";


function App(){
  const {user} = useContext(AuthContext)

  user ? 'User is working' : 'No User'
  // let fonts = Font.useFonts({
  //   "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  //   "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  // });

return (
<AuthProvider> 
  {user? <HomeStack /> : <AuthStack />} 
</AuthProvider>
)

}

export default App;
