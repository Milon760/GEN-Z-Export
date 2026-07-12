import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiGithub,
    FiFacebook,
    FiInstagram,
    FiTwitter,
    FiArrowRight,
    FiMail,
    FiMapPin,
    FiPhone
} from 'react-icons/fi';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            alert(`Subscribed successfully with: ${email}`);
            setEmail('');
        }
    };

    const footerLinks = {
        shop: [
            { name: 'All Drops', path: '/' },
            { name: 'Elite Panjabi', path: '/shop/panjabi' },
            { name: 'Resort Shirts', path: '/shop/shirt' },
            { name: 'Cyber Tees', path: '/shop/tshirt' },
            { name: 'Cargo Pants', path: '/shop/pant' }
        ],
        support: [
            { name: 'Track Order', path: '/track' },
            { name: 'Return & Exchange', path: '/returns' },
            { name: 'Shipping Info', path: '/shipping' },
            { name: 'Privacy Policy', path: '/privacy' }
        ],
        company: [
            { name: 'About GEN-Z', path: '/about' },
            { name: 'Store Locator', path: '/stores' },
            { name: 'Careers', path: '/careers' },
            { name: 'Contact Us', path: '/contact' }
        ]
    };

    return (
        <footer className="w-full bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 font-sans border-t border-gray-200/80 dark:border-neutral-800/60 transition-colors duration-500 select-none antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

                {/* Top Section: Brand Info + Navigation Lists + Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-gray-200/80 dark:border-neutral-800/60">

                    {/* Column 1: Brand Matrix Layout */}
                    <div className="lg:col-span-2 space-y-5 text-left">
                        <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-all duration-500 transform group-hover:rotate-12 bg-neutral-950 dark:bg-[#C5A059] text-[#C5A059] dark:text-neutral-950 shadow-[0_4px_20px_rgba(197,160,89,0.25)] group-hover:scale-105">
                                GZ
                            </div>
                            <div className="flex flex-col items-start leading-none">
                                <span className="font-black text-xl tracking-tighter text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-[#C5A059]">
                                    GEN-Z
                                </span>
                                <span className="text-[9px] font-bold tracking-[0.25em] uppercase mt-0.5 text-neutral-500 dark:text-[#C5A059]">
                                    Export
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm text-neutral-500 dark:text-neutral-400">
                            Redefining urban street culture with premium aesthetics and dynamic drops. Engineered for the next generation of global trends.
                        </p>

                        {/* Contact Info Block */}
                        <div className="space-y-2 text-sm pt-2">
                            <div className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">
                                <FiMapPin className="text-[#C5A059] flex-shrink-0" size={16} />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-3 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300">
                                <FiPhone className="text-[#C5A059] flex-shrink-0" size={16} />
                                <span>+880 1234-567890</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Shop Drops */}
                    <div className="text-left">
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
                            Shop Drops
                        </h4>
                        <ul className="space-y-2.5 text-sm font-semibold">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="inline-block transition-all duration-300 hover:text-[#C5A059] hover:translate-x-1">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Custom Support Panel */}
                    <div className="text-left">
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
                            Support
                        </h4>
                        <ul className="space-y-2.5 text-sm font-semibold">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="inline-block transition-all duration-300 hover:text-[#C5A059] hover:translate-x-1">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter Box Integration */}
                    <div className="text-left">
                        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-4">
                            Join the Crew
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
                            Subscribe to receive early access to dynamic shock drops, events, and premium updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative flex items-center">
                            <FiMail className="text-neutral-400 dark:text-neutral-500 absolute left-3.5 text-base" />
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-neutral-50 dark:bg-neutral-900/40 pl-10 pr-12 py-2.5 rounded-xl text-xs text-neutral-900 dark:text-white placeholder-neutral-400 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/10 shadow-sm transition-all duration-300"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 p-2 bg-neutral-950 text-white dark:bg-[#C5A059] dark:text-neutral-950 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                                aria-label="Subscribe"
                            >
                                <FiArrowRight size={14} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Section: Copyright Metadata Hub + Social Connect Icons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-xs font-medium">

                    <div className="text-neutral-500 dark:text-neutral-400 tracking-wide text-center sm:text-left order-2 sm:order-1">
                        &copy; {new Date().getFullYear()} <span className="font-bold text-neutral-800 dark:text-white">GEN-Z Export</span>. All Rights Reserved. Engineered with precision.
                    </div>

                    {/* Social Connect Icons Row */}
                    <div className="flex items-center space-x-2 order-1 sm:order-2">
                        {[
                            { icon: <FiFacebook size={16} />, url: 'https://facebook.com' },
                            { icon: <FiInstagram size={16} />, url: 'https://instagram.com' },
                            { icon: <FiTwitter size={16} />, url: 'https://twitter.com' },
                            { icon: <FiGithub size={16} />, url: 'https://github.com' }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-[#C5A059] dark:hover:text-[#C5A059] bg-neutral-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200/30 dark:border-neutral-800/30 hover:scale-110 active:scale-95 transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                </div>

            </div>
        </footer>
    );
}