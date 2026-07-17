import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosSettings, IoMdHome, IoMdLogOut } from 'react-icons/io';
import { FaBoxOpen, FaTruck } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { FiMenu, FiX } from 'react-icons/fi'; // রেসপন্সিভ মোবাইল মেনুর জন্য আইকন

const Navbar = ({ handleLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // মোবাইল সাইডবার কন্ট্রোল স্টেট

  const menuItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: <IoMdHome size={20} /> },
    { path: '/admin-dashboard/users', label: 'Users', icon: <HiUsers size={20} /> },
    { path: '/admin-dashboard/products', label: 'Products', icon: <FaBoxOpen size={20} /> },
    { path: '/admin-dashboard/product-create', label: 'Create Product', icon: <FaBoxOpen size={20} /> },
    { path: '/admin-dashboard/orders', label: 'Orders', icon: <FaTruck size={20} /> },
    { path: '/admin-dashboard/setting', label: 'Setting', icon: <IoIosSettings size={20} /> },
  ];

  // সাইডবারের কমন UI কন্টেন্ট (যা মোবাইল ও ডেস্কটপ উভয়ের জন্য ব্যবহার হবে)
  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between">
      <div>
        {/* 🌟 লোগো সেকশন */}
        <div className="flex-shrink-0">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-all duration-500 transform group-hover:rotate-6 bg-zinc-950 dark:bg-[#C5A059] text-[#C5A059] dark:text-neutral-950 shadow-md">
              GZ
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-[#C5A059] dark:group-hover:text-[#C5A059]">
                GEN-Z
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase mt-0.5 text-slate-500 dark:text-[#C5A059]/80">
                Export
              </span>
            </div>
          </Link>
        </div>

        {/* 📋 নেভিগেশন লিংক মেনু */}
        <ul className="space-y-1.5 pt-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)} // মোবাইলে ক্লিক করলে মেনু বন্ধ হবে
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 group
                    ${isActive
                      ? 'bg-[#C5A059] text-zinc-950 shadow-md shadow-[#C5A059]/10'
                      : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60 hover:text-slate-900 dark:hover:text-zinc-100'
                    }`}
                >
                  <span className={`transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 🚪 লগআউট বাটন এরিয়া */}
      <div className="border-t border-slate-200 dark:border-zinc-800 pt-4">
        <button
          onClick={() => { handleLogout?.(); setIsOpen(false); }}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl font-semibold text-sm transition-all duration-300
            text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20"
        >
          <IoMdLogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 📱 ১. মোবাইল টপ বার (স্মার্টফোন স্ক্রিনের জন্য সর্বদা দৃশ্যমান) */}
      <div className="sm:hidden w-full bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm bg-zinc-950 dark:bg-[#C5A059] text-[#C5A059] dark:text-neutral-950">
            GZ
          </div>
          <span className="font-black text-md tracking-tight text-slate-950 dark:text-white">GEN-Z</span>
        </Link>

        {/* টগল বাটন */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 bg-slate-50 dark:bg-zinc-800/40"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* 📱 ২. মোবাইল স্লাইড-আউট ড্রয়ার (মোবাইল ব্যাকড্রপ ও অ্যানিমেশন সহ) */}
      <div className={`fixed inset-0 z-40 sm:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* ডার্ক ব্যাকড্রপ ওভারলে */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

        {/* বাম পাশ থেকে আসা সাইডবার */}
        <div className={`absolute top-0 bottom-0 left-0 w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 p-5 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
        </div>
      </div>

      {/* 💻 ৩. ডেস্কটপ সাইডবার (বড় স্ক্রিনে স্থায়ী ও স্ট্যাটিক থাকবে) */}
      <div className="hidden sm:flex flex-col justify-between w-64 h-screen sticky top-0 transition-colors duration-300 p-5
        bg-white border-r border-slate-200 
        dark:bg-zinc-900 dark:border-zinc-800"
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Navbar;