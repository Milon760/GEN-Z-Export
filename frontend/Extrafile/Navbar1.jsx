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
    FiZap,
    FiGlobe,
    FiLogOut
} from 'react-icons/fi';
import { ThemeContext } from '../src/context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Navbar1({
    cartCount = 0,
    wishlistCount = 2,
    onCartOpen = () => { }
}) {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
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
        <header className="w-full fixed top-0 left-0 z-50 font-sans select-none antialiased">

           

            {/* ২. মেইন নেভিগেশন কোর (ফিক্সড থিম ও ব্যাকগ্রাউন্ড) */}
            <nav className={`w-full transition-all duration-500 text-black bg-white dark:bg-[#0A0A0A]/95 border-b border-slate-500 dark:border-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${scrolled
                ? 'backdrop-blur-xl py-3'
                : 'backdrop-blur-md py-5 '
                }`}>
                <div className="max-w-7xl mx-auto px-3">
                    <div className="flex justify-between items-center">

                        {/* name and logo*/}
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-all duration-500 transform group-hover:rotate-12 bg-black dark:bg-[#C5A059] text-white dark:text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]">
                                    GZ
                                </div>
                                <div className="flex flex-col items-start leading-none text-left">
                                    <span className="font-black text-xl tracking-tighter text-black dark:text-white">
                                        GEN-Z
                                    </span>
                                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase mt-0.5 text-blue-500 dark:text-[#C5A059]">
                                        Export
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* dackstop menu */}
                        <div className="hidden lg:flex items-center space-x-1 lg:space-x-2">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `px-4 py-2 rounded-full text-xs lg:text-sm font-bold tracking-wide transition-all duration-300 relative flex items-center gap-2 group ${isActive
                                        ? 'text-slate-200 hover:text-white bg-slate-900 dark:bg-[#C5A059] dark:text-slate-900 dark:hover:text-black shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                                        : 'text-slate-900 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {item.name}
                                    {item.tag && (
                                        <span className="text-[8px] px-1.5 py-0.5 rounded font-black bg-red-500 text-white animate-pulse">
                                            {item.tag}
                                        </span>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        {/* ইউটি利টি হাব */}
                        <div className="flex items-center space-x-1 sm:space-x-2">

                            {/* theme botton */}
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl transition-all duration-200 dark:text-gray-300 dark:hover:text-[#C5A059] hover:bg-white/5 hover:scale-105 active:scale-95"
                            >
                                {
                                    theme === 'light' ? <FaMoon size={19} /> : <FaSun size={19} />
                                }
                            </button>
                            {/* search button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2.5 rounded-xl transition-all duration-200  dark:text-gray-300  dark:hover:text-[#C5A059] hover:bg-white/5 hover:scale-105 active:scale-95"
                            >
                                <FiSearch size={19} />
                            </button>

                            {/* উইশলিস্ট */}
                            <Link
                                to="/wishlist"
                                className="p-2.5 rounded-xl transition-all duration-200 relative  dark:text-slate-200  dark:hover:text-[#C5A059] hover:bg-white/5 hover:scale-105 active:scale-95"
                            >
                                <FiHeart size={19} />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                                )}
                            </Link>

                            {/* শপিং ব্যাগ কাউন্টার */}
                            <Link to={"/cart"}
                                onClick={onCartOpen}
                                className="p-2.5 rounded-xl transition-all duration-200 relative group dark:text-gray-300 dark:hover:text-[#C5A059] hover:bg-white/5 hover:scale-105 active:scale-95"
                            >
                                <FiShoppingBag size={19} className="group-hover:rotate-6 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 bg-[#C5A059] text-black border-[#0A0A0A]">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* ডাইনামিক অথেন্টিকেশন গেটওয়ে (Desktop Only - lg) */}
                            <div className="hidden lg:flex items-center gap-2 ml-2">
                                {isLoggedIn ? (
                                    <>
                                        <Link to="/dashboard" className="p-2.5 rounded-xl transition-all text-gray-300 hover:text-white">
                                            <FiUser size={19} />
                                        </Link>
                                        <button onClick={() => setIsLoggedIn(false)} className="p-2.5 text-red-500 hover:bg-red-500/5 rounded-xl transition-all">
                                            <FiLogOut size={19} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="text-xs font-bold uppercase tracking-wider px-3 py-2 text-slate-900 dark:text-slate-200 border border-slate-900 dark:border-slate-200 rounded-xl hover:text-black dark:hover:text-white transition-all">
                                            Sign In
                                        </Link>
                                        <Link to="/register" className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all transform active:scale-95 shadow-md bg-slate-600 text-slate-200 hover:text-white hover:bg-slate-900 dark:bg-[#C5A059] dark:text-black dark:hover:bg-white dark:hover:text-slate-900">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* মোবাইল ড্রয়ার ট্রিগার (এখন lg এর নিচে যেকোনো স্ক্রিনেই শো করবে) */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden p-2.5 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-[#C5A059] dark:hover:bg-white/5"
                            >
                                <FiMenu size={20} />
                            </button>

                        </div>

                    </div>
                </div>
            </nav>

            {/* ৩. সার্চ ওভারলে মডেল */}
            <div className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-[500] flex items-center justify-center p-4 transition-all duration-500 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                <div className={`bg-[#121212] w-full max-w-2xl rounded-[24px] p-8 shadow-[0_0_50px_rgba(197,160,89,0.1)] border border-white/5 transform transition-all duration-500 ${isSearchOpen ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'
                    }`}>
                    <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-6">
                        <div className="text-left">
                            <span className="text-[10px] font-black tracking-widest text-[#C5A059] uppercase">SEARCH CATALOG</span>
                            <h3 className="font-bold texxl text-white">Find Your Street Fit</h3>
                        </div>
                        <button
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                            className="p-2.5 text-gray-400 hover:text-white rounded-full bg-white/5"
                        >
                            <FiX size={18} />
                        </button>
                    </div>
                    <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                        <FiSearch className="text-[#C5A059] absolute left-5 text-lg" />
                        <input
                            type="text"
                            placeholder="Type and press enter to search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0A0A0A] pl-14 pr-5 py-4 rounded-xl text-white placeholder-gray-600 border border-white/10 focus:outline-none focus:border-[#C5A059] transition-all duration-300"
                        />
                    </form>
                </div>
            </div>

            {/* ৪. মোবাইল রেসপন্সিভ ইন্টারঅ্যাক্টিভ ড্রয়ার (lg ব্রেকপয়েন্ট এর জন্য আপডেটেড) */}
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-[#121212] border-l border-white/5 p-6 flex flex-col justify-between transform transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div>
                        <div className="flex items-center justify-between pb-6 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="font-black text-lg tracking-wider text-white">GEN-Z</span>
                                <span className="text-[10px] font-bold text-[#C5A059] tracking-wider">EXP.</span>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-gray-400 hover:text-white rounded-md bg-white/5"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className="mt-8 space-y-2">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => `w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 ${isActive
                                        ? 'bg-[#C5A059] text-black'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <span>{item.name}</span>
                                    <FiChevronRight size={16} />
                                </NavLink>
                            ))}
                            t-              </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-3">
                        {isLoggedIn ? (
                            <div className="flex gap-2">
                                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex-grow py-3.5 bg-[#0A0A0A] text-white border border-white/10 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                                    <FiUser size={16} className="text-[#C5A059]" /> Dashboard
                                </Link>
                                <button onClick={() => { setIsLoggedIn(false); setIsMobileMenuOpen(false); }} className="px-4 bg-red-500/10 text-red-500 rounded-xl">
                                    <FiLogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="py-3.5 border border-white/10 text-center text-white font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-white/5 transition-all">
                                    Sign In
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="py-3.5 bg-[#C5A059] text-center text-black font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-white transition-all">
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