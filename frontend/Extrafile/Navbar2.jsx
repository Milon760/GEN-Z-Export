import React, { useState, useContext } from 'react';
import { ThemeContext } from './src/context/ThemeContext'; // correct import location setup korte hobe
import { RiSearchLine, RiSunLine, RiMoonLine, RiMenu4Line, RiCloseLine, RiHeartLine, RiShoppingBagLine } from 'react-icons/ri';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "All Drops", path: "#", badge: null },
        { label: "Shop", path: "#", badge: null },
        { label: "Elite Panjabi", path: "#", badge: "Eid" },
        { label: "Resort Shirts", path: "#", badge: null },
        { label: "Cyber Tees", path: "#", badge: null },
        { label: "Cargo Pants", path: "#", badge: null },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 backdrop-blur-sm border-b border-black/5 
                        light:bg-white/95 dark:bg-[#0A0A0A]/95 
                        light:border-[#0A0A0A]/10 dark:border-[#C5A059]/10">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between h-20">

                    {/* Left: GZ EXPORT and GEN-Z */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl 
                                      bg-[#C5A059] text-black">
                            GZ
                        </div>
                        <div className="flex flex-col items-start leading-none gap-0.5">
                            <span className="font-extrabold text-xl tracking-tight light:text-black dark:text-white">
                                GEN-Z
                            </span>
                            <span className="text-[10px] font-medium tracking-[0.25em] uppercase light:text-[#7D7D7D] dark:text-[#C5A059]">
                                EXPORT
                            </span>
                        </div>
                    </div>

                    {/* Middle: Desktop Search Bar */}
                    <div className="hidden lg:flex flex-grow max-w-lg mx-6 relative">
                        <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 light:text-[#7D7D7D] dark:text-[#7D7D7D] w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search your future look..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-11 px-12 rounded-xl border font-medium text-sm transition-all duration-200
                                       light:bg-white light:border-[#EAEAEA] light:text-black light:placeholder:text-[#AEAEAE]
                                       dark:bg-[#141414] dark:border-[#C5A059]/15 dark:text-white dark:placeholder:text-[#7D7D7D]
                                       focus:ring-2 focus:ring-[#C5A059] focus:border-[#C5A059] focus:outline-none"
                        />
                        {searchTerm && (
                            <RiCloseLine
                                onClick={() => setSearchTerm("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer light:text-[#7D7D7D] dark:text-[#7D7D7D] hover:light:text-black hover:dark:text-white w-5 h-5 transition" />
                        )}
                    </div>

                    {/* Right: Actions, Wishlist, Theme, Mobile Menu */}
                    <div className="flex items-center gap-4">

                        {/* Mobile Search Toggle (Optional for UX) */}
                        {/* <button className="lg:hidden p-2 rounded-full light:hover:bg-[#EAEAEA] dark:hover:bg-[#141414]">
                            <RiSearchLine className="w-6 h-6 light:text-black dark:text-white" />
                        </button>
                        */}

                        <button className="hidden md:flex p-2 rounded-full light:hover:bg-[#EAEAEA] dark:hover:bg-[#141414]">
                            <RiHeartLine className="w-6 h-6 light:text-black dark:text-white" />
                        </button>

                        <button className="flex items-center gap-2 font-medium px-4 h-11 rounded-full 
                                           light:bg-[#C5A059] light:text-black
                                           dark:bg-[#141414] dark:border dark:border-[#C5A059]/15 dark:text-[#C5A059]
                                           light:hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]
                                           dark:hover:shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                            <RiShoppingBagLine className="w-5 h-5" />
                            <span className="text-sm">Bag (0)</span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full border border-black/5 
                                      light:bg-white light:border-[#EAEAEA] light:hover:bg-[#EAEAEA]
                                      dark:bg-[#141414] dark:border-[#C5A059]/15 dark:hover:bg-[#C5A059]/10 transition-colors">
                            {theme === 'light' ?
                                <RiMoonLine className="w-5 h-5 light:text-black dark:text-white" /> :
                                <RiSunLine className="w-5 h-5 light:text-black dark:text-white" />
                            }
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2.5 rounded-full 
                                       light:hover:bg-[#EAEAEA] dark:hover:bg-[#141414]">
                            <RiMenu4Line className="w-6 h-6 light:text-black dark:text-white" />
                        </button>
                    </div>
                </div>

                {/* Sub-navbar for Desktop */}
                <div className="hidden lg:flex items-center justify-between h-14 border-t border-black/5 
                              light:border-[#EAEAEA] dark:border-[#C5A059]/10">
                    <div className="flex items-center gap-6">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.path}
                                className="group flex items-center gap-1.5 font-semibold text-sm transition tracking-tight 
                                           light:text-black light:hover:text-[#C5A059]
                                           dark:text-white dark:hover:text-[#C5A059]">
                                {link.label}
                                {link.badge && (
                                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md 
                                                     bg-[#C5A059] text-black">
                                        {link.badge}
                                    </span>
                                )}
                            </a>
                        ))
                        }
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-xs font-semibold light:text-black dark:text-white hover:light:text-[#C5A059] hover:dark:text-[#C5A059]">
                            SIGN IN
                        </button>
                        <button className="text-xs font-bold light:text-black dark:text-white hover:light:text-[#C5A059] hover:dark:text-[#C5A059]">
                            JOIN / SIGN UP
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-black/70 z-[-1] transition-opacity duration-300 
                          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileMenuOpen(false)}>
            </div>

            {/* Mobile Menu Slider */}
            <div className={`fixed top-0 right-0 h-screen w-[300px] bg-white transition-transform duration-300 ease-in-out z-[100] 
                          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-20 flex items-center justify-end px-6 border-b border-[#EAEAEA]">
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                        <RiCloseLine className="w-7 h-7 text-black" />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    {navLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.path}
                            className="block font-semibold text-lg text-black hover:text-[#C5A059]">
                            {link.label}
                            {link.badge && (
                                <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-[#C5A059] text-black">
                                    {link.badge}
                                </span>
                            )}
                        </a>
                    ))}
                    <div className="pt-5 border-t border-[#EAEAEA] space-y-3">
                        <button className="w-full text-left font-semibold text-black hover:text-[#C5A059]">
                            Sign In
                        </button>
                        <button className="w-full text-left font-bold text-black hover:text-[#C5A059]">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;