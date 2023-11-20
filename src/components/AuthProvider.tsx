import React, { createContext, useState, useContext, ReactNode } from 'react';

type AuthState = {
    isAuthenticated: boolean;
    userRole: string | null;
};

type AuthContextType = {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        userRole: null,
    });

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
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