import React, { useContext, useState } from 'react';
import {
  FiGrid,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiEye
} from 'react-icons/fi';
import { AdminContext } from '../../context/AdminContext';

const AdminDashboard = () => {
  const { allUser, allProduct, allOrder } = useContext(AdminContext);

  // Total revenue dynamic calculation setup
  const totalRevenue = allOrder?.reduce((acc, order) => acc + (order.totalAmount || 0), 0) || 125400;

  // Stats cards dynamic array layout configuration
  const stats = [
    {
      title: 'Total Users',
      value: allUser?.length || 0,
      icon: <FiUsers className="w-6 h-6 text-blue-500" />,
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-950/20',
      trend: '+12% this month'
    },
    {
      title: 'Active Products',
      value: allProduct?.length || 0,
      icon: <FiBox className="w-6 h-6 text-emerald-500" />,
      bgLight: 'bg-emerald-50',
      bgDark: 'dark:bg-emerald-950/20',
      trend: '+4 new items'
    },
    {
      title: 'Total Orders',
      value: allOrder?.length || 0,
      icon: <FiShoppingBag className="w-6 h-6 text-violet-500" />,
      bgLight: 'bg-violet-50',
      bgDark: 'dark:bg-violet-950/20',
      trend: '25 pending approval'
    },
    {
      title: 'Total Earnings',
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: <FiDollarSign className="w-6 h-6 text-amber-500" />,
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amber-950/20',
      trend: 'Live updates'
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50">
      
      {/* 🌟 Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <FiGrid className="text-blue-500 animate-pulse" /> Overview Dashboard
          </h1>
          <p className="text-sm mt-1 text-slate-500 dark:text-zinc-400">
            Welcome back! Here is what's happening with your store today.
          </p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20">
          <FiPlus className="w-4 h-4" /> <span>Add New Product</span>
        </button>
      </div>

      {/* 📊 Overview Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl border backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group bg-white border-slate-200/80 dark:bg-zinc-900 dark:border-zinc-800/80"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                {stat.title}
              </span>
              <div className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${stat.bgLight} ${stat.bgDark}`}>
                {stat.icon}
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-medium flex items-center gap-1 text-slate-400 dark:text-zinc-500">
                <FiTrendingUp className="text-emerald-500" /> {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 🛠️ Management & Tables Layout Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Area */}
        <div className="lg:col-span-2 p-6 rounded-2xl border bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FiShoppingBag className="text-violet-500" /> Recent Orders Management
            </h2>
            <button className="text-xs font-semibold text-blue-500 hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm">
                {allOrder && allOrder.length > 0 ? (
                  allOrder.slice(0, 5).map((order, i) => (
                    <tr key={order._id || i} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3.5 font-semibold text-blue-500">#{order._id?.slice(-6) || `00${i}`}</td>
                      <td className="py-3.5 font-medium">{order.user?.name || 'Guest User'}</td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                          Pending
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {/* 🟢 FIXED: Tag correctly closed with dynamic layouts inside table row path */}
                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button title="View Details" className="p-1 rounded hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400">
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button title="Approve" className="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                            <FiCheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400 dark:text-zinc-500">
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stock Info Widget */}
        <div className="p-6 rounded-2xl border bg-white border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FiBox className="text-emerald-500" /> Quick Management
            </h2>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mb-6">
              Monitor inventory status and user control triggers swiftly.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                <span className="text-sm font-medium">Total Products Listed</span>
                <span className="text-sm font-bold bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">{allProduct?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                <span className="text-sm font-medium">Registered Clients</span>
                <span className="text-sm font-bold bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-sm">{allUser?.length || 0}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex flex-col gap-2">
            <button className="w-full py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
              Manage Inventory Stock
            </button>
            <button className="w-full py-2.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors">
              System Emergency Reset
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;