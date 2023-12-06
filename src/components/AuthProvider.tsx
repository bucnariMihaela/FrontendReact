// @ts-ignore
import React, { createContext, useState, useContext, ReactNode } from 'react';
import {useLocalStorage} from "../hooks/useLocalStorage";


type AuthState = { //starea de auth
    isAuthenticated: boolean;
    userRole: string | null;
    userUsername?: string;
};

type AuthContextType = {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>; // functie care permite actualizarea starii de auth
};


//AuthContext poate fi folosit pt a partaja starea de auth si functia de setare intre componente fara a transmite datele prin props
const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const localStorage = useLocalStorage<AuthState>('auth',{
        //valorile initiale
        isAuthenticated: false,
        userRole: null,
        userUsername: null
    });

    return (
        <AuthContext.Provider value={{ authState: localStorage.value, setAuthState:localStorage.setValue }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext); //acceseaza auth context
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};