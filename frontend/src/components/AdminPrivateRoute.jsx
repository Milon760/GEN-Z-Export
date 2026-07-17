import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import GlobalLoader from './GlobalLoader'; 

const AdminPrivateRoute = () => {
    const { user, loading } = useAuth(); // 🟢 here too

    if (loading) {
        return <GlobalLoader />;
    }

    return (user?.isAdmin ? <Outlet /> : <Navigate to={'/login'} />)
}

export default AdminPrivateRoute;