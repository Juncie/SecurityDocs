import React from "react";
import AppLoading from "expo-app-loading";
import * as Font from 'expo-font';

import HomeStack from "./routes/HomeStack";
import Login from "./screens/Login";



function App() {
  let [fontsLoaded, error] = Font.useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  })
  
  if (!fontsLoaded)  {
    return <AppLoading />
  } else {
        return (
         <HomeStack />
        );
      }
}



export default App;
