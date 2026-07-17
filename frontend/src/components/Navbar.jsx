import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    FiSearch,
    FiUser,
    FiHeart,
    FiMenu,
    FiX,
    FiShoppingBag,
    FiChevronRight,
    FiLogOut
} from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';

export default function Navbar1({
    cartCount = 0,
    wishlistCount = 2,
    onCartOpen = () => { }
}) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    // স্ক্রল ইফেক্ট মনিটর
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { name: 'All Drops', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Elite Panjabi', path: '/shop/panjabi', tag: 'EID' },
        { name: 'Resort Shirts', path: '/shop/shirt' },
        { name: 'Cyber Tees', path: '/shop/tshirt' },
        { name: 'Cargo Pants', path: '/shop/pant' }
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    };


    return (
        <header className="w-full fixed top-0 left-0 z-500 font-sans select-none antialiased">
            {/* মেইন নেভিগেশন বার */}
            <nav className={`w-full transition-all duration-300 border-b border-gray-200/80 dark:border-neutral-200/30 ${scrolled
                ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl py-3 shadow-lg shadow-black/5 dark:shadow-white/5'
                : 'bg-white dark:bg-neutral-950 py-5'
                }`}>
                <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center gap-4">

                        {/* লোগো সেকশন */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-all duration-500 transform group-hover:rotate-6 bg-neutral-950 dark:bg-[#C5A059] text-[#C5A059] dark:text-neutral-950 shadow-md">
                                    GZ
                                </div>
                                <div className="flex flex-col items-start leading-none">
                                    <span className="font-black text-xl tracking-tighter text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-[#C5A059] dark:group-hover:text-white/80">
                                        GEN-Z
                                    </span>
                                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase mt-0.5 text-neutral-500 dark:text-[#C5A059]">
                                        Export
                                    </span>
                                </div>
                            </Link>
                        </div>


                        {/* ডেস্কটপ মেনু */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 relative flex items-center gap-2 hover:scale-105 ${isActive
                                        ? 'bg-neutral-900 text-white dark:bg-[#C5A059] dark:text-neutral-950 shadow-sm'
                                        : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                                        }`}
                                >
                                    {item.name}
                                    {item.tag && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded-md font-black bg-red-500 text-white animate-pulse">
                                            {item.tag}
                                        </span>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        {/* রাইট ইউটিলিটি হাব */}
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            {/* থিম টগল বাটন */}
                            <button
                                onClick={toggleTheme}
                                className={`relative w-14 h-7 rounded-full p-1 transition-all duration-500 border border-slate-200 dark:border-slate-700 shadow-inner focus:outline-none 
                               ${theme === 'dark' ? "bg-slate-800" : "bg-slate-100"}`}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center
                               ${theme === 'dark' ? "translate-x-7 bg-indigo-600" : "translate-x-0 bg-white"}`}
                                >
                                    {theme === 'dark' ? (
                                        <IoIosMoon className="w-3 h-3 text-white" />
                                    ) : (
                                        <IoIosSunny className="w-3 h-3 text-yellow-500" />
                                    )}
                                </div>
                            </button>

                            {/* নতুন মডার্ন সার্চ আইকন বাটন */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${isSearchOpen
                                    ? 'bg-[#C5A059]/10 text-[#C5A059]'
                                    : 'text-neutral-600 dark:text-neutral-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] hover:bg-neutral-100 dark:hover:bg-neutral-900'
                                    }`}
                            >
                                <FiSearch size={18} />
                            </button>

                            {/* উইশলিস্ট বাটন */}
                            <Link
                                to="/wishlist"
                                className="p-2.5 rounded-xl transition-all duration-300 relative text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-105 active:scale-95"
                            >
                                <FiHeart size={18} />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-neutral-950 animate-ping"></span>
                                )}
                            </Link>

                            {/* শপিং ব্যাগ কাউন্টার */}
                            <Link to={'/cart'}
                                onClick={onCartOpen}
                                className="p-2.5 rounded-xl transition-all duration-300 relative group text-neutral-600 dark:text-neutral-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-105 active:scale-95"
                            >
                                <FiShoppingBag size={18} className="group-hover:rotate-6 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold bg-[#C5A059] text-neutral-950 ring-2 ring-white dark:ring-neutral-950">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* অথেন্টিকেশন বাটন (Desktop Only) */}
                            <div className="hidden lg:flex items-center gap-2 ml-2">
                                {user ? (
                                    <>
                                        <Link to="/dashboard" className="flex gap-1 p-2.5 rounded-xl transition-all duration-300 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                                            <div className='w-10 h-10 rounded-[50%] overflow-hidden transition-all duration-200 hover:scale-105'>
                                                <img src="profile.jpg" alt="profile" />
                                            </div>
                                        </Link>
                                        {user.isAdmin && (
                                            <Link
                                                to="/admin-dashboard"
                                                className="group flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-400 bg-transparent text-xs font-semibold uppercase tracking-wider text-black dark:text-slate-200 transition-all duration-300 hover:bg-amber-400/10 hover:border-amber-600 dark:hover:bg-amber-400/10 dark:hover:text-amber-400 dark:hover:border-amber-400/40"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                                Admin
                                            </Link>
                                        )}

                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="text-xs font-bold uppercase tracking-wider px-3 py-2 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-xl hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-300">
                                            Sign In
                                        </Link>
                                        <Link to="/register" className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all duration-300 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-[#C5A059] dark:text-neutral-950 dark:hover:bg-[#C5A059]/90 shadow-sm">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* মোবাইল মেনু ট্রিগার */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden p-2.5 rounded-xl transition-all duration-300 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                            >
                                <FiMenu size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ড্রপডাউন ইনলাইন সার্চ বার (ফুল স্ক্রিন ওভারলে রিপ্লেস করা হয়েছে) */}
                <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 ${isSearchOpen ? 'max-h-20 opacity-100 py-3' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}>
                    <div className="max-w-3xl mx-auto px-4">
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                            <FiSearch className="text-[#C5A059] absolute left-4 text-base" />
                            <input
                                type="text"
                                placeholder="What are you looking for today?..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white dark:bg-neutral-950 pl-11 pr-12 py-2.5 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                                >
                                    <FiX size={16} />
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </nav>

            {/* মোবাইল ড্রয়ার মেনু */}
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                <div className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-neutral-950 p-6 flex flex-col justify-between transform transition-transform duration-300 shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div>
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-2">
                                <span className="font-black text-lg tracking-wider text-neutral-950 dark:text-white">GEN-Z</span>
                                <span className="text-[10px] font-bold text-[#C5A059] tracking-wider">EXP.</span>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-neutral-500 hover:text-neutral-950 dark:hover:text-white rounded-xl bg-neutral-100 dark:bg-neutral-900"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* মোবাইল নেভিগেশন লিংকসমূহ */}
                        <div className="mt-6 space-y-1">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${isActive
                                        ? 'bg-[#C5A059] text-neutral-950 shadow-sm'
                                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-white'
                                        }`}
                                >
                                    <span>{item.name}</span>
                                    <FiChevronRight size={16} className="opacity-70" />
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* মোবাইল ফুটার অ্যাকশন বাটন */}
                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                        {user ? (
                            <div className="flex gap-2">
                                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex-grow py-3 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                                    <FiUser size={16} className="text-[#C5A059]" /> Dashboard
                                </Link>
                                <button onClick={() => { setIsLoggedIn(false); setIsMobileMenuOpen(false); }} className="px-4 bg-red-50 dark:bg-red-950/25 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                                    <FiLogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border border-neutral-300 dark:border-neutral-700 text-center text-neutral-700 dark:text-neutral-300 font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all">
                                    Sign In
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="py-3 bg-neutral-950 text-white dark:bg-[#C5A059] dark:text-neutral-950 text-center font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-neutral-900 dark:hover:bg-[#C5A059]/90 transition-all">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}