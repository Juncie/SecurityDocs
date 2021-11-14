import React, { createContext, useContext } from 'react';
import { useNavigation } from '@react-navigation/core'

const NavContext = createContext({});


export const NavProvider = ({ children }) => {
    const navigation = useNavigation();
    const goToLogin = () => navigation.navigate("Login");
    const goToRegister = () => navigation.navigate("Register");
    // const goToHome = () => navigation.navigate("Home");

    return (
        <NavContext.Provider value={{goToLogin, goToRegister}}>
            {children}
        </NavContext.Provider>
    )
}

export default function useNav() {
    return useContext(NavContext);
}