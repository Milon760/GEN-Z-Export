import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = async (registrationData) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://gen-z-export-backend.onrender.com/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData),
            });
            const result = await response.json();
            console.log(result, 'result');
            
            if (result.success) {
                setUser(result.user);
                return { success: true, message: result.message || 'Verification complete!' };
            }
            return { success: false, message: result.message || 'System validation rejected.' };
        } catch (error) {
            return { success: false, message: error.message || 'Server connection terminated.' };
        } finally {
            setIsLoading(false);
        }
    };

    const loginUser = async (loginData) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://gen-z-export-backend.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();
                console.log(result, 'login');
                
            if (result.success) {
                setUser(result.user);
                return { success: true, message: result.message || 'Access granted!' };
            } else {
                return { success: false, message: result.message || 'Invalid credentials node.' };
            }
        } catch (error) {
            return { success: false, message: error.message || 'Database server down link error.' };
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, registerUser, loginUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);