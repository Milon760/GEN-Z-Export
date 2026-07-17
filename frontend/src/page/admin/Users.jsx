import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUsers, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    totalUser: 0,
    currentPage: 1,
    totalPages: 1
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔄 ব্যাকএন্ড থেকে ইউজার ডেটা ফেচ করার ফাংশন (পেজ নম্বর সাপোর্ট সহ)
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      // আপনার ব্যাকএন্ডে পেজিনেশন থাকলে কুয়েরি প্যারাম পাস করতে পারেন, যেমন: ?page=${page}
      const res = await fetch(`http://localhost:5000/auth/users?page=${page}`);
      const data = await res.json();
      
      if (data.success) {
        setUsers(data.payload.users || []);
        setPagination(data.payload.pagination || { totalUser: 0, currentPage: page, totalPages: 1 });
      } else {
        console.log('User fetch failed');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔍 ক্লায়েন্ট-সাইড সার্চ ফিল্টারিং (নাম বা ইমেইল দিয়ে)
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 পেজ পরিবর্তনের হ্যান্ডলার
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination.totalPages || 1)) {
      fetchUsers(newPage);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* 📊 হেডার ও স্ট্যাটাস সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <FaUsers className="text-[#C5A059]" /> User Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Total Active Registered Users: <strong className="text-slate-800 dark:text-zinc-200">{pagination.totalUser || 0}</strong>
          </p>
        </div>

        {/* 🔍 ইনস্ট্যান্ট সার্চ ফিল্টার বক্স */}
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FaSearch size={14} />
          </span>
          <input 
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] text-slate-800 dark:text-zinc-100 placeholder-slate-400 transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      {/* ⏳ লোডিং স্টেট */}
      {loading ? (
        <div className="w-full py-20 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <div className="w-8 h-8 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-slate-400">Loading user database...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        /* ❌ কোনো ইউজার না থাকলে */
        <div className="w-full py-16 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 text-slate-400">
          <FaUser className="mx-auto size-8 mb-2 opacity-50 text-slate-400" />
          <p className="text-sm font-medium">No users found</p>
        </div>
      ) : (
        <>
          {/* 💻 ১. ডেস্কটপ ভিউ: প্রিমিয়াম ডেটা টেবিল (মোবাইলে অটো হাইড হবে) */}
          <div className="hidden md:block w-full bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800/80 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-800/50 text-slate-600 dark:text-zinc-400 text-xs font-bold uppercase border-b border-slate-200 dark:border-zinc-800下">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Phone Number</th>
                    <th className="px-6 py-4">Location / Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm font-medium text-slate-700 dark:text-zinc-300">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center font-bold text-xs uppercase">
                            {user.name ? user.name.substring(0, 2) : 'US'}
                          </div>
                          <span className="text-slate-900 dark:text-white font-semibold">{user.name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-zinc-400">{user.email || 'N/A'}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-zinc-400 font-mono text-xs">{user.phone || 'N/A'}</td>
                      <td className="px-6 py-4 max-w-[240px] truncate text-slate-500 dark:text-zinc-400" title={user.address}>
                        {user.address || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📱 ২. মোবাইল ভিউ: রেসপন্সিভ কার্ড গ্রিড লেআউট (মাঝারি ও বড় স্ক্রিনে হাইড থাকবে) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredUsers.map((user) => (
              <div 
                key={user._id} 
                className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3"
              >
                {/* কার্ড হেডার: নাম ও অ্যাভাটার */}
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-zinc-800 pb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#C5A059] text-zinc-950 flex items-center justify-center font-black text-sm uppercase">
                    {user.name ? user.name.substring(0, 2) : 'US'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{user.name || 'N/A'}</h3>
                    <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 text-slate-500 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">User</span>
                  </div>
                </div>

                {/* কার্ড বডি ইনফরমেশন */}
                <div className="space-y-2 text-xs font-medium text-slate-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2.5">
                    <FaEnvelope className="text-slate-400 size-3.5 flex-shrink-0" />
                    <span className="truncate">{user.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FaPhone className="text-slate-400 size-3.5 flex-shrink-0" />
                    <span className="font-mono">{user.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <FaMapMarkerAlt className="text-slate-400 size-3.5 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{user.address || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 📄 ৩. রেসপন্সিভ পেজিনেশন কন্ট্রোলার (Pagination UI) */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-800">
              <span className="text-xs text-slate-500 dark:text-zinc-400">
                Page <strong className="text-slate-800 dark:text-zinc-200">{pagination.currentPage}</strong> of {pagination.totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-zinc-900 transition-all"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-zinc-900 transition-all"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default Users;