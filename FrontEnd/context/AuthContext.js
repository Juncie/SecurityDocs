import React, { createContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const AuthContext = createContext({});



export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    
    return <AuthContext.Provider value={user, setUser, loading, setLoading}>{children}</AuthContext.Provider>
}

