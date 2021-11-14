import React from "react";

import AppStack from "./routes/index";
import { AuthProvider } from "./context/useAuth";
import { NavigationContainer } from "@react-navigation/native";

export default function App({navigation}) {
  return <AuthProvider>
          <AppStack />
         </AuthProvider>
}
