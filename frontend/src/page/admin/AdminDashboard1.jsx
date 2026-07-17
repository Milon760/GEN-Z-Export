import React, { useState } from 'react';
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
    FiMenu, 
    FiX, 
    FiEye 
} from 'react-icons/fi';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, users
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Mock Database Arrays
    const stats = [
        { label: 'Total Revenue', value: '৳2,48,500', icon: <FiDollarSign size={20} />, trend: '+12.5%', color: 'text-emerald-500 bg-emerald-500/10' },
        { label: 'Active Orders', value: '142', icon: <FiShoppingBag size={20} />, trend: '+8.2%', color: 'text-blue-500 bg-blue-500/10' },
        { label: 'Total Products', value: '84', icon: <FiBox size={20} />, trend: '4 Drops active', color: 'text-[#C5A059] bg-[#C5A059]/10' },
        { label: 'Registered Users', value: '1,240', icon: <FiUsers size={20} />, trend: '+24% this month', color: 'text-purple-500 bg-purple-500/10' }
    ];

    const mockProducts = [
        { id: 'GZ-001', name: 'Elite Premium Eid Panjabi', category: 'Panjabi', price: 3450, stock: 45, status: 'In Stock' },
        { id: 'GZ-002', name: 'Cyber Cyberware Tee V1', category: 'T-Shirt', price: 1250, stock: 12, status: 'Low Stock' },
        { id: 'GZ-003', name: 'Relaxed Fit Resort Shirt', category: 'Shirt', price: 1850, stock: 88, status: 'In Stock' },
        { id: 'GZ-004', name: 'Multi-Pocket Urban Cargo', category: 'Pant', price: 2400, stock: 0, status: 'Out of Stock' }
    ];

    const mockOrders = [
        { id: 'ORD-8942', user: 'Asif Rahman', items: 'Panjabi (1), Pant (1)', total: 5850, status: 'Processing', date: '11 July 2026' },
        { id: 'ORD-8941', user: 'Naimul Islam', items: 'T-Shirt (2)', total: 2500, status: 'Delivered', date: '10 July 2026' },
        { id: 'ORD-8940', user: 'Tariqul Sifat', items: 'Shirt (1)', total: 1850, status: 'Pending', date: '10 July 2026' }
    ];

    const mockUsers = [
        { id: 'USR-201', name: 'Tanvir Ahmed', email: 'tanvir@genz.com', role: 'Customer', joinDate: 'Jan 2026' },
        { id: 'USR-102', name: 'Mahdi Hasan', email: 'mahdi@genz.com', role: 'Admin', joinDate: 'Aug 2025' },
        { id: 'USR-305', name: 'Sabbir Hossain', email: 'sabbir@gmail.com', role: 'Customer', joinDate: 'June 2026' }
    ];

    const menuItems = [
        { id: 'overview', label: 'Dashboard Overview', icon: <FiGrid size={18} /> },
        { id: 'products', label: 'Products Management', icon: <FiBox size={18} /> },
        { id: 'orders', label: 'Orders Registry', icon: <FiShoppingBag size={18} /> },
        { id: 'users', label: 'User Directory', icon: <FiUsers size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 font-sans transition-colors duration-500 flex antialiased select-none">
            
            {/* MOBILE SIDEBAR TRIGGER NAVIGATION TOP HEADER */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-neutral-950 border-b border-gray-200/80 dark:border-neutral-800/60 z-40 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <span className="font-black text-lg tracking-wider text-neutral-950 dark:text-white">GZ CONTROL</span>
                    <span className="text-[9px] font-black bg-[#C5A059] text-neutral-950 px-1.5 py-0.5 rounded">HQ</span>
                </div>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50"
                >
                    {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
            </div>

            {/* SIDEBAR NAVIGATION GRID DRAWER CONTAINER */}
            <aside className={`fixed inset-y-0 left-0 lg:sticky lg:top-0 w-64 bg-white dark:bg-neutral-950 border-r border-gray-200/80 dark:border-neutral-800/60 z-50 flex flex-col justify-between p-6 transition-transform duration-500 ease-out lg:translate-x-0 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="space-y-8">
                    {/* Brand Meta Identifier Header */}
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm bg-neutral-950 dark:bg-[#C5A059] text-white dark:text-neutral-950">
                            GZ
                        </div>
                        <div className="flex flex-col text-left leading-none">
                            <span className="font-black text-md tracking-tight text-neutral-900 dark:text-white">GEN-Z HUB</span>
                            <span className="text-[8px] font-bold tracking-widest text-neutral-400 uppercase mt-0.5">Control Center</span>
                        </div>
                    </div>

                    {/* Sidebar Dynamic Links */}
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-98 ${
                                        isActive
                                            ? 'bg-neutral-950 text-white dark:bg-[#C5A059] dark:text-neutral-950 shadow-md font-black'
                                            : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 hover:text-neutral-900 dark:hover:text-white'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
                
                {/* System Deployment Tag */}
                <div className="text-[10px] text-neutral-400 font-semibold border-t border-neutral-100 dark:border-neutral-900 pt-4 text-left">
                    System Ver: <span className="text-neutral-600 dark:text-neutral-200">v4.2.0-prod</span>
                </div>
            </aside>

            {/* PRIMARY DASHBOARD SCROLL GRID FRAMEWORK */}
            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pt-24 lg:pt-8 overflow-y-auto max-w-7xl mx-auto w-full">
                
                {/* TABS CONTAINER 1: OVERVIEW PANELS MAP */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-fadeIn text-left">
                        {/* Title Block Banner */}
                        <div>
                            <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">System Analytics Overview</h1>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-medium">Real-time storefront metric monitors.</p>
                        </div>

                        {/* Stats Dashboard Grid layout metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-neutral-800/60 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-colors duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className={`p-2.5 rounded-xl ${stat.color}`}>{stat.icon}</div>
                                        <span className="text-[10px] font-black tracking-wide text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                            <FiTrendingUp size={10} /> {stat.trend}
                                        </span>
                                    </div>
                                    <div className="mt-4 space-y-0.5">
                                        <span className="text-neutral-400 dark:text-neutral-500 text-xs font-medium">{stat.label}</span>
                                        <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">{stat.value}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Order Micro-Panel Component layout */}
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-neutral-800/60 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-wider">Live System Stream</h3>
                                <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black text-[#C5A059] uppercase tracking-wider hover:underline">View All Registry</button>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-neutral-100 dark:border-neutral-900">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-400 uppercase tracking-widest font-black text-[10px]">
                                        <tr>
                                            <th className="p-4">Track ID</th>
                                            <th className="p-4">Customer Name</th>
                                            <th className="p-4">Status Tag</th>
                                            <th className="p-4 text-right">Settlement Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-semibold text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-100 dark:divide-neutral-900">
                                        {mockOrders.map((o) => (
                                            <tr key={o.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                                                <td className="p-4 font-bold text-neutral-900 dark:text-white">{o.id}</td>
                                                <td className="p-4">{o.user}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                                        o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                                    }`}>{o.status}</span>
                                                </td>
                                                <td className="p-4 text-right font-black text-neutral-900 dark:text-white">৳{o.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TABS CONTAINER 2: PRODUCTS MATRIX CONTROLLER */}
                {activeTab === 'products' && (
                    <div className="space-y-6 animate-fadeIn text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Products Catalog Engine</h1>
                                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-medium">Create, update, or delete premium drop metrics.</p>
                            </div>
                            <button className="inline-flex items-center justify-center gap-2 bg-[#C5A059] text-neutral-950 font-black text-xs uppercase tracking-wider px-4 py-3 rounded-xl hover:bg-[#C5A059]/90 active:scale-95 transition-all duration-300 shadow-sm self-start sm:self-auto">
                                <FiPlus size={16} /> Deploy New Drop
                            </button>
                        </div>

                        {/* Core Dynamic Content Table Map block view */}
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-neutral-800/60 rounded-2xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-400 uppercase tracking-widest font-black text-[10px]">
                                        <tr>
                                            <th className="p-4">SKU Code</th>
                                            <th className="p-4">Item Name</th>
                                            <th className="p-4">Type</th>
                                            <th className="p-4">Price Matrix</th>
                                            <th className="p-4">Stock Levels</th>
                                            <th className="p-4 text-center">Action Nodes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-semibold text-neutral-600 dark:text-neutral-400 divide-y divide-neutral-100 dark:divide-neutral-900">
                                        {mockProducts.map((p) => (
                                            <tr key={p.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                                                <td className="p-4 font-bold text-neutral-900 dark:text-white">{p.id}</td>
                                                <td className="p-4 font-bold text-neutral-800 dark:text-neutral-200">{p.name}</td>
                                                <td className="p-4">{p.category}</td>
                                                <td className="p-4 font-black text-neutral-900 dark:text-white">৳{p.price}</td>
                                                <td className="p-4">
                                                    <div className="space-y-1">
                                                        <span className="font-bold text-neutral-800 dark:text-neutral-200">{p.stock} units</span>
                                                        <div className="w-24 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${p.stock > 20 ? 'bg-[#C5A059]' : p.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min((p.stock/100)*100, 100)}%` }} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 flex items-center justify-center gap-2">
                                                    <button className="p-2 hover:text-[#C5A059] bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200/50 dark:border-neutral-800/50 transition-colors"><FiEdit2 size={12} /></button>
                                                    <button className="p-2 hover:text-red-500 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200/50 dark:border-neutral-800/50 transition-colors"><FiTrash2 size={12} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TABS CONTAINER 3: ORDERS ARCHITECT REGISTRY */}
                {activeTab === 'orders' && (
                    <div className="space-y-6 animate-fadeIn text-left">
                        <div>
                            <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Active Fulfillment Registry</h1>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-medium">Verify execution pipelines, modify statuses, monitor payouts.</p>
                        </div>

                        <div className="bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-neutral-800/60 rounded-2xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-400 uppercase tracking-widest font-black text-[10px]">
                                        <tr>
                                            <th className="p-4">OrderID</th>
                                            <th className="p-4">Client Ident</th>
                                            <th className="p-4">Manifest Bundle</th>
                                            <th className="p-4">Timestamp</th>
                                            <th className="p-4">Gross Total</th>
                                            <th className="p-4">Fulfillment State</th>
                                            <th className="p-4 text-center">Operation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-semibold text-neutral-600 dark:text-neutral-400 divide-y divide-neutral-100 dark:divide-neutral-900">
                                        {mockOrders.map((o) => (
                                            <tr key={o.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                                                <td className="p-4 font-bold text-neutral-900 dark:text-white">{o.id}</td>
                                                <td className="p-4 font-bold text-neutral-800 dark:text-neutral-200">{o.user}</td>
                                                <td className="p-4 max-w-[150px] truncate">{o.items}</td>
                                                <td className="p-4 text-neutral-400">{o.date}</td>
                                                <td className="p-4 font-black text-neutral-900 dark:text-white">৳{o.total}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                                        o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' : o.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                                                    }`}>{o.status}</span>
                                                </td>
                                                <td className="p-4 flex items-center justify-center gap-1.5">
                                                    <button className="p-2 hover:text-emerald-500 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200/50 dark:border-neutral-800/50 transition-colors"><FiCheckCircle size={12} /></button>
                                                    <button className="p-2 hover:text-[#C5A059] bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200/50 dark:border-neutral-800/50 transition-colors"><FiEye size={12} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TABS CONTAINER 4: USER CONTROL DIRECTORY */}
                {activeTab === 'users' && (
                    <div className="space-y-6 animate-fadeIn text-left">
                        <div>
                            <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">User Directory Matrices</h1>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-medium">Verify registered customer logs and administrative privilege ranks.</p>
                        </div>

                        <div className="bg-white dark:bg-neutral-950 border border-gray-200/60 dark:border-neutral-800/60 rounded-2xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-neutral-50 dark:bg-neutral-900 text-neutral-400 uppercase tracking-widest font-black text-[10px]">
                                        <tr>
                                            <th className="p-4">User Identifier</th>
                                            <th className="p-4">Legal Name</th>
                                            <th className="p-4">Communication Mail</th>
                                            <th className="p-4">Privilege Rank</th>
                                            <th className="p-4">Join Timeline</th>
                                            <th className="p-4 text-center">Security Nodes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-semibold text-neutral-600 dark:text-neutral-400 divide-y divide-neutral-100 dark:divide-neutral-900">
                                        {mockUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                                                <td className="p-4 font-bold text-neutral-900 dark:text-white">{u.id}</td>
                                                <td className="p-4 font-bold text-neutral-800 dark:text-neutral-200">{u.name}</td>
                                                <td className="p-4 font-mono text-neutral-400">{u.email}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                                        u.role === 'Admin' ? 'bg-purple-500 text-white' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300'
                                                    }`}>{u.role}</span>
                                                </td>
                                                <td className="p-4 text-neutral-400">{u.joinDate}</td>
                                                <td className="p-4 flex items-center justify-center gap-2">
                                                    <button className="p-2 text-xs font-black uppercase tracking-wider text-red-500 bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-colors">Revoke Access</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}