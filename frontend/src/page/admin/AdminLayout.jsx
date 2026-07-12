import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { FaFonticons } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen border-2 font-sans pt-28 bg-slate-200 dark:bg-slate-900'>
      <Navbar />

      <div className='flex-1 flex-col px-3 py-2'>
        <header className='flex justify-between'>
          <div>
            <h2 className='text-2xl font-medium dark:text-slate-200'>Admin Dashbosrd</h2>
          </div>
          {/* profile */}
          <div className='flex items-center gap-3'>
            <div>
              <input type="text" name="search" className='border rounded-2xl px-4 py-1 ' placeholder='Search products...' />
            </div>
            <div className='flex relative'>
              <IoMdNotifications size={24} />
              <span className='absolute w-4 h-4 flex items-center justify-center rounded-2xl -right-1 -top-1 text-sm text-white bg-red-600'>5</span>
            </div>
            <div className='w-10 h-10 rounded-[50%] overflow-hidden '>
              <img src="profile.jpg" className='' alt="profile" />
            </div>
            <Link to={'/admin-dashboard/profile'} className='flex flex-col items-start'>
              <span className='text-black dark:text-slate-200 font-black tracking-wide'>Md Milon Mia</span>
              <span className='text-sm text-black dark:text-slate-400 font-medium'>Admin</span>
            </Link>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;




{/*
import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
      
    </div>
  )
}

export default AdminLayout;
*/}


{/*
  import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar'; // আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী পাথ ঠিক করে নিন

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      
     
      <Navbar />

    
      <div className="flex-1 flex flex-col">
        
     
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
              Admin Controller
            </h2>
          </div>
          
         
          <div className="flex items-center gap-4">
            <Link 
              to="/admin-dashboard/profile" 
              className="flex items-center gap-2 py-1.5 px-4 bg-slate-850 border border-slate-700 rounded-full text-sm font-medium hover:bg-slate-800 transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold text-slate-900">
                A
              </div>
              <span className="text-slate-200">Profile</span>
            </Link>
          </div>
        </header>

        
        <main className="p-6 flex-1 overflow-y-auto bg-slate-950">
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
*/}