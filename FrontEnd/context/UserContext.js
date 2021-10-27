import React, { createContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    return <UserContext.Provider>{children}</UserContext.Provider>
}
