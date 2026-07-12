// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { IoIosSettings, IoMdHome, IoMdLogOut } from 'react-icons/io';
// import { FaBoxOpen, FaTruck } from 'react-icons/fa';
// import { HiUsers } from 'react-icons/hi';

// const Navbar = () => {
//   const location = useLocation();

//   // মেনু আইটেমগুলোর লিস্ট (সহজে মেইনটেইন করার জন্য)
//   const menuItems = [
//     { path: '/admin-dashboard', label: 'Dashboard', icon: <IoMdHome size={20} /> },
//     { path: '/admin-dashboard/products', label: 'Products', icon: <FaBoxOpen size={20} /> },
//     { path: '/admin-dashboard/users', label: 'Users', icon: <HiUsers size={20} /> },
//     { path: '/admin-dashboard/order', label: 'Orders', icon: <FaTruck size={20} /> },
//     { path: '/admin-dashboard/setting', label: 'Setting', icon: <IoIosSettings size={20} /> },
//   ];

//   return (
//     <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between hidden md:flex">
//       <div>
//         {/* ড্যাশবোর্ড ব্র্যান্ড নেম */}
//         <div className="mb-8 px-3 py-2">
//           <h1 className="text-xl font-black tracking-wider text-cyan-400 uppercase">
//             Admin Panel
//           </h1>
//         </div>

//         {/* ডাইনামিক মেনু লিস্ট */}
//         <ul className="space-y-1.5">
//           {menuItems.map((item) => {
//             // বর্তমান পেজের পাথের সাথে মিললে active ট্রু হবে
//             const isActive = location.pathname === item.path;

//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center gap-3.5 py-3 px-4 rounded-xl font-medium tracking-wide transition-all duration-200 ${
//                     isActive
//                       ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
//                       : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
//                   }`}
//                 >
//                   {item.icon}
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* লগআউট বাটন */}
//       <div className="border-t border-slate-800 pt-4">
//         <button className="flex items-center gap-3.5 py-3 px-4 rounded-xl font-medium tracking-wide w-full text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200">
//           <IoMdLogOut size={20} className="text-rose-500" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Navbar;



import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { IoIosSettings, IoMdHome, IoMdLogOut } from 'react-icons/io'
import { FaBoxOpen, FaTruck } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi'

const Navbar = () => {

  const location = useLocation();

  const menuItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: <IoMdHome size={19} /> },
    { path: '/admin-dashboard/users', label: 'Usrs', icon: <HiUsers size={19} /> },
    { path: '/admin-dashboard/products', label: 'Products', icon: <FaBoxOpen size={19} /> },
    { path: '/admin-dashboard/product-create', label: 'Product Create', icon: <FaBoxOpen size={19} /> },
    { path: '/admin-dashboard/orders', label: 'Orders', icon: <FaTruck size={19} /> },
    { path: '/admin-dashboard/setting', label: 'Setting', icon: <IoIosSettings size={19} /> },
  ];


  return (
      <div className='hidden sm:flex flex-col justify-between w-64 bg-slate-200 dark:bg-slate-900 border-r border-slate-800 p-5'>

        <div>
          <div className='mb-8 px-3 py-2'>
            <h1 className='dark:text-slate-200 text-xl sm:text-2xl font-black tracking-wider uppercase'> Admin Panel</h1>
          </div>

          <ul className='space-y-1.5'>
            {
              menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return <li>
                  <Link to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all duration-200 
                ${isActive ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 '}`}>
                    {item.icon} {item.label}
                  </Link>
                </li>
              })
            }
          </ul>
        </div>

        <div className='border-t border-slate-800 pt-4'>
          <button className='flex items-center gap-3 px-3 py-2 w-full rounded-xl text-slate-400 font-medium tracking-wide transition-all duration-200 hover:text-rose-400 hover:bg-rose-500/10'>
            <IoMdLogOut size={19} /> Logout
          </button>
        </div>

      </div>
  )
}

export default Navbar;
