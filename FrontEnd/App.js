import React, { useState, useEffect, useContext } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import HomeStack from "./routes/HomeStack";
import Login from "./screens/Login";
import UserContext from "./context/UserContext";
import dbRoute from "./routes/api";
import Forms from "./screens/Forms";

function App() {
  const [user, setUser] = useState({
    user: 'Brandon'
  });
  const [loading, setLoading] = useState(true);



 

  let fonts = Font.useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

return <HomeStack />
  

}

export default App;
