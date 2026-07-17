import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlobalLoader from './GlobalLoader'; // আপনার গ্লোবাল লোডার ইম্পোর্ট করুন

const UserPrivateRoute = () => {
    const { user, loading } = useAuth(); // 🟢 এখানে loading স্টেটটি রিসিভ করুন

    // যতক্ষণ এপিআই চেক শেষ না হবে, অ্যাপ কোনো রিডাইরেক্ট করবে না
    if (loading) {
        return <GlobalLoader />; 
    }

    return (user ? <Outlet /> : <Navigate to={'/login'} />)
}

export default UserPrivateRoute;