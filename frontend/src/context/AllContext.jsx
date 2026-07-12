import React, { Children } from 'react'
import { AuthProvider } from './AuthContext'
import ThemeProvider from './ThemeContext'
import ProductProvider from './ProductContext'

export const AllProviders = ({ children }) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <ProductProvider>
                    {children}
                </ProductProvider>
            </ThemeProvider>
        </AuthProvider>
    )
};