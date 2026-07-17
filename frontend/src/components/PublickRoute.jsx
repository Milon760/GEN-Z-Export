import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlobalLoader from './GlobalLoader'; // আপনার লোডার কম্পোনেন্ট

const PublicRoute = () => {
    const { user, loading } = useAuth();

    // যতক্ষণ ব্যাকগ্রাউন্ডে চেক হবে ইউজার লগইন কিনা, ততক্ষণ লোডার দেখাবে
    if (loading) {
        return <GlobalLoader />;
    }

    // ইউজার যদি লগইন থাকে, তবে তাকে ড্যাশবোর্ড বা হোমে পাঠিয়ে দেবে (রিডাইরেক্ট)
    // আর লগইন না থাকলে লগইন/রেজিস্টার পেজ দেখতে দেবে (<Outlet />)
    return (!user ? <Outlet /> : <Navigate to="/dashboard" replace />);
};

export default PublicRoute;