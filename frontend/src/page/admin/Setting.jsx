import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { 
  FaMoon, 
  FaSun, 
  FaUser, 
  FaLock, 
  FaBell, 
  FaShieldAlt, 
  FaGlobe, 
  FaSave 
} from 'react-icons/fa';

const Setting = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // সেটিংসের অন্যান্য ফিচারের জন্য লোকাল স্টেট (ম্যানেজমেন্টের জন্য)
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300
      bg-slate-50 text-slate-900 
      dark:bg-zinc-950 dark:text-zinc-50"
    >
      {/* 🌟 হেডার সেকশন */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">System Settings</h1>
        <p className="text-sm mt-1 text-slate-500 dark:text-zinc-400">
          Manage your account preferences, theme customization, and security parameters.
        </p>
      </div>

      {/* 🛠️ সেটিংস লেআউট গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* বাম পাশের মেইন কনফিগারেশন এরিয়া (২ কলাম) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ১. থিম ও ডিসপ্লে সেটিংস কার্ড */}
          <div className="p-6 rounded-2xl border bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FaGlobe className="text-blue-500" /> Display Preferences
            </h2>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mb-6">
              Choose how the dashboard interface appears on your device terminal screen.
            </p>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800/60">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">Interface Theme Mode</span>
                <span className="text-xs text-slate-400 dark:text-zinc-500">
                  Switch between glowing light environment or dark space layout.
                </span>
              </div>
              
              {/* প্রিমিয়াম কাস্টম টগল বাটন */}
              <button 
                onClick={toggleTheme}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner
                  ${theme === 'dark' || theme === true ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <span 
                  className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300
                    ${theme === 'dark' || theme === true ? 'translate-x-8' : 'translate-x-1'}`}
                >
                  {theme === 'dark' || theme === true ? (
                    <FaMoon className="w-3 h-3 text-blue-600" />
                  ) : (
                    <FaSun className="w-3 h-3 text-amber-500" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* ২. নোটিফিকেশন কন্ট্রোল কার্ড */}
          <div className="p-6 rounded-2xl border bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FaBell className="text-violet-500" /> System Notifications
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/20 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Order Updates Alert</span>
                  <span className="text-xs text-slate-400">Receive real-time sound prompts for incoming client checkouts.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications} 
                  onChange={() => setNotifications(!notifications)} 
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" 
                />
              </div>
            </div>
          </div>

          {/* ৩. সিকিউরিটি প্যারামিটারস কার্ড */}
          <div className="p-6 rounded-2xl border bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FaShieldAlt className="text-emerald-500" /> Privacy & Cryptography
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/20 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Two-Factor Authentication (2FA)</span>
                  <span className="text-xs text-slate-400">Secure terminal access matrix using advanced OTP tokens.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={twoFactor} 
                  onChange={() => setTwoFactor(!twoFactor)} 
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" 
                />
              </div>
            </div>
          </div>

        </div>

        {/* ডান পাশের প্রোফাইল কুইক ওভারভিউ (১ কলাম) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 text-3xl mb-4 border border-blue-500/20 shadow-inner">
              <FaUser />
            </div>
            <h3 className="font-bold text-lg">Admin Controller Node</h3>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">Status: Primary Operator Identity</p>
            
            <div className="w-full border-t border-slate-100 dark:border-zinc-800 mt-6 pt-6 space-y-3 text-left">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-400">Active Node Level:</span>
                <span className="font-bold text-emerald-500">Root Access</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-400">Encryption Layer:</span>
                <span className="font-mono bg-slate-50 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-zinc-700 text-[10px]">TLS 1.3 Active</span>
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2">
              <FaSave /> Save Configuration
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Setting;