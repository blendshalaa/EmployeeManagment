// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load token from localStorage on app load
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setUser({ token: storedToken });
            console.log('Token loaded from localStorage:', storedToken);
        }
    }, []);

    // Login function
    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ token });
        console.log('User logged in with token:', token);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setUser(null); // Reset user state
        console.log('User logged out');
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};