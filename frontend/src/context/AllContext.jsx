import React, { Children } from 'react'
import { AuthProvider } from './AuthContext'
import ThemeProvider from './ThemeContext'
import ProductProvider from './ProductContext'
import AdminProvider from './AdminContext'


export const AllProviders = ({ children }) => {
    return (
        <AuthProvider>
            <AdminProvider>
                <ThemeProvider>
                    <ProductProvider>
                        {children}
                    </ProductProvider>
                </ThemeProvider>
            </AdminProvider>
        </AuthProvider>
    )
};