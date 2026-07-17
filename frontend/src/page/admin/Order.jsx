import React, { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaDollarSign, FaBox } from 'react-icons/fa';

// 📅 ডেট-টাইম ফরম্যাটার ফাংশন
const fullDateTime = (createdAt) => {
  if (!createdAt) return "N/A";
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};

const Order = () => {
  const { allOrder } = useContext(AdminContext);

  // 🔴 🟡 🟢 অর্ডার স্ট্যাটাস অনুযায়ী ডাইনামিক কালার ব্যাজ
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
    }
  };

  return (
    <div className="w-full space-y-5">
      
      {/* 📊 ওপরের ছোট হেডিং পার্ট */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Order Management</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">Total Orders: {allOrder?.length || 0}</p>
        </div>
      </div>

      {/* ❌ ওর্ডার না থাকলে দেখানোর জন্য সেফটি চেক */}
      {!allOrder || allOrder.length === 0 ? (
        <div className="w-full py-12 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 text-slate-400">
          <FaBox className="mx-auto size-8 mb-2 opacity-60" />
          <p className="text-sm font-medium">No orders found</p>
        </div>
      ) : (
        <>
          {/* 💻 ১. ডেস্কটপ ও ট্যাবলেট ভিউ: প্রফেশনাল ডাটা টেবিল (স্মার্টফোনে হাইড থাকবে) */}
          <div className="hidden md:block w-full bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800/80 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-800/50 text-slate-600 dark:text-zinc-400 text-xs font-bold uppercase border-b border-slate-200 dark:border-zinc-800">
                    <th className="px-5 py-3.5">Date & Time</th>
                    <th className="px-5 py-3.5">User ID</th>
                    <th className="px-5 py-3.5">Shipping Address</th>
                    <th className="px-5 py-3.5 text-center">Items</th>
                    <th className="px-5 py-3.5">Payment</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm font-medium text-slate-700 dark:text-zinc-300">
                  {allOrder.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/30 transition-colors duration-200">
                      <td className="px-5 py-4 whitespace-nowrap text-slate-500 dark:text-zinc-400 text-xs">
                        {fullDateTime(order.createdAt)}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs tracking-tight text-slate-900 dark:text-zinc-100">
                        {order.userId}
                      </td>
                      <td className="px-5 py-4 max-w-[200px] truncate text-slate-600 dark:text-zinc-400" title={order.shippingAddress}>
                        {order.shippingAddress}
                      </td>
                      <td className="px-5 py-4 text-center text-slate-900 dark:text-white">
                        <span className="bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md text-xs">
                          {order.products?.length || 0}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-xs uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded-md">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        ৳{order.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📱 ২. মোবাইল ভিউ: রেসপন্সিভ কার্ড লেআউট (মাঝারি ও বড় স্ক্রিনে হাইড থাকবে) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {allOrder.map((order) => (
              <div 
                key={order._id} 
                className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3.5"
              >
                {/* কার্ড হেডার: পেমেন্ট এবং স্ট্যাটাস */}
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-2.5">
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500">ID: {order.userId?.substring(0, 10)}...</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyle(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>

                {/* কার্ড কন্টেন্ট এরিয়া */}
                <div className="space-y-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-slate-400" />
                    <span>{fullDateTime(order.createdAt)}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{order.shippingAddress}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center gap-1.5">
                      <FaBox className="text-slate-400" />
                      <span>Items: <strong className="text-slate-800 dark:text-white">{order.products?.length || 0}</strong></span>
                    </div>
                    <span className="uppercase bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 px-2 py-0.5 rounded">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* কার্ড ফুটার: টোটাল প্রাইস */}
                <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/20 -mx-4 -mb-4 p-3 rounded-b-2xl">
                  <span className="text-xs text-slate-500">Total Price</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">৳{order.totalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default Order;