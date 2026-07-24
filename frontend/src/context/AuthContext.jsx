import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import API from '../helper/API';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [myOrder, setMyOrder] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // নতুন স্টেট: এটি দিয়ে ট্র্যাক করা হবে অ্যাপের প্রাথমিক সেশন চেক শেষ হয়েছে কিনা
    const [loading, setLoading] = useState(true);

    // ================= 1. USER PROFILE DATA LOAD =================
    const userProfileData = useCallback(async () => {
        // এখানে গ্লোবাল লোডার অন না করাই ভালো, কারণ এটি ব্যাকগ্রাউন্ডে চেক হবে
        try {
            const response = await API.get('/auth/profile');
            const result = response.data;

            if (result.success) {
                setUser(result.user);
                return result.user;
            } else {
                console.log('Profile context unauthorized or missing token');
                setUser(null);
            }
        } catch (error) {
            console.error('Profile fetch failed:', error.response?.data?.message || error.message);
            setUser(null);
        }
        return null;
    }, []);

    // ================= 2. MY ORDER HISTORY =================
    const myOrderHistroy = useCallback(async () => {
        try {
            const response = await API.get('/api/products/my-orders');
            const result = response.data;

            if (result.success) {
                const orders = result.payload?.userOrders || result.userOrders || result;
                setMyOrder(orders);
            } else {
                setMyOrder([]);
            }
        } catch (error) {
            console.error('Order history API failed:', error.response?.data?.message || error.message);
            setMyOrder([]);
        }
    }, []);

    // ================= 3. REGISTER USER =================
    const registerUser1 = async (registrationData) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/auth/register', registrationData);
            const result = response.data;
            console.log(result, 'regis')
            if (result.success) {
                return { success: true, message: result.message || 'Registration successful!' };
            } else {
                return { success: false, message: result.message || 'Registration failed.' };
            }
        } catch (error) {
            return { success: false, message: error.message || 'Server connection error.' };
        } finally {
            setIsLoading(false);
        }
    };

    // ================= 4. EMAIL VERIFICATION =================
    const verifyUserEmail = useCallback(async (token) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/auth/verify', { token });
            const result = response.data;
            if (result.success) {
                return { success: true, message: result.message || 'Identity established!' };
            } else {
                return { success: false, message: result.message || 'Token verification failed.' };
            }
        } catch (error) {
            return { success: false, message: error.message || 'Network layer error.' };
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ================= 5. LOGIN USER =================
    const loginUser = async (loginData) => {
        setIsLoading(true);
        try {
            const response = await API.post('/auth/login', loginData);
            const result = response.data;

            if (result.success) {
                const loggedInUser = result.payload?.user || result.user;
                setUser(loggedInUser);

                await userProfileData();
                await myOrderHistroy();

                return { success: true, message: result.message || 'Logged in successfully!' };
            } else {
                return { success: false, message: result.message || 'Invalid credentials.' };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message || 'Login execution error.' };
        } finally {
            setIsLoading(false);
        }
    };

    // ================= 6. USER LOGOUT =================
    const userLogout = async () => {
        setIsLoading(true);
        try {
            const response = await API.post('/auth/logout');
            setUser(null);
            setMyOrder(null);
            setSuccessMsg('Successfully logged out!');
            setErrorMsg('');
            return response.data;
        } catch (error) {
            console.error('Logout error:', error.message);
            setErrorMsg(error.response?.data?.message || 'Logout process failed.');
            setUser(null);
            setMyOrder(null);
        } finally {
            setIsLoading(false);
        }
    };

    // ================= SAFE AUTO-LOAD SEQUENTIAL ON MOUNT =================
    useEffect(() => {
        const initializeAuthSession = async () => {
            setLoading(true); // 🟢 সেশন চেক করা শুরু হলো
            const verifiedUser = await userProfileData();

            if (verifiedUser) {
                await myOrderHistroy();
            } else {
                setMyOrder([]);
            }
            setLoading(false); // 🟢 সেশন চেক করা শেষ হলো (ইউজার পাওয়া যাক বা না যাক)
        };

        initializeAuthSession();
    }, [userProfileData, myOrderHistroy]);



    // ১. রেজিস্ট্রেশন ফাংশন (OTP টোকেন পাঠাবে)
    const registerUser = async (formData) => {
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const res = await axios.post('http://localhost:5000/auth/register', formData);

            // সেশন স্টোরেজে সেভ
            if (res.data?.payload?.token) {
                sessionStorage.setItem('activationToken', res.data.payload.token);
                sessionStorage.setItem('userEmail', formData.email);
            }

            setSuccessMsg(res.data.message || 'OTP আপনার ইমেলে পাঠানো হয়েছে।');
            return { success: true, message: res.data.message };
        } catch (error) {
            const msg = error.response?.data?.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।';
            setErrorMsg(msg);
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };

    // ২. OTP ভেরিফিকেশন ফাংশন
    const verifyOtp = async (userOtp) => {
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        const token = sessionStorage.getItem('activationToken');

        try {
            const res = await axios.post('http://localhost:5000/auth/verify', { userOtp, token });

            // সফল হলে সেশন ক্লিয়ার
            sessionStorage.removeItem('activationToken');
            sessionStorage.removeItem('userEmail');

            setSuccessMsg(res.data.message || 'অ্যাকাউন্ট ভেরিফাইড হয়েছে!');
            return { success: true, message: res.data.message };
        } catch (error) {
            const msg = error.response?.data?.message || 'ভুল OTP কোড! আবার চেষ্টা করুন।';
            setErrorMsg(msg);
            return { success: false, message: msg };
        } finally {
            setIsLoading(false);
        }
    };


// Provider value তে updateUserProfile টি অবশ্যই রপ্তানি (export) করবে:
// <AuthContext.Provider value={{ user, setUser, updateUserProfile, ... }}>


    const userData = {
        user,
        myOrder,
        successMsg,
        setSuccessMsg,
        errorMsg,
        setErrorMsg,
        isLoading,
        loading,
        verifyUserEmail,
        loginUser,
        userProfileData,
        myOrderHistroy,
        registerUser,
        verifyOtp,
        userLogout,
    };

    // এখানে গ্লোবাল লোডার রিটার্ন না করে সরাসরি চিলড্রেন পাস করুন, রাউট প্রটেক্টরে লোডিং হ্যান্ডেল করাই উত্তম
    return (
        <AuthContext.Provider value={userData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);