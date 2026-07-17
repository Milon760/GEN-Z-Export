import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiPackage, 
  FiClock, FiCheckCircle, FiShield, FiCreditCard, 
  FiLoader, FiLogOut, FiShoppingBag, FiTruck, FiAlertCircle 
} from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  // context থেকে নতুন 'loading' স্টেটটি সহ নিয়ে আসা হলো
  const { user, myOrder, isLoading, loading, userLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await userLogout();
    navigate('/login');
  };

  // ================= 1. SAFE LOAD GUARD =================
  // রিফ্রেশ জনিত কারণে সেশন ভেরিফিকেশন পেন্ডিং থাকলে প্রিমিয়াম লোডার দেখাবে
  if (isLoading || loading || !user) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-6 text-neutral-400">
        <FiLoader className="w-8 h-8 text-[#C5A059] animate-spin mb-2" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059]">Synchronizing Secure Profile Node...</span>
      </div>
    );
  }

  // সেফ ফলব্যাক
  const safeOrders = myOrder || [];

  // ================= 2. DYNAMIC ANALYTICS CALCULATIONS =================
  const totalSpent = safeOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const processingOrders = safeOrders.filter(o => o.orderStatus === 'Processing' || o.orderStatus === 'Pending').length;
  const completedOrders = safeOrders.filter(o => o.orderStatus === 'Delivered').length;

  // Order status badge এর জন্য কালার হেল্পার ফাংশন
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500';
      case 'processing':
      case 'pending':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-500';
      case 'cancelled':
        return 'bg-rose-500/10 border-rose-500/20 text-rose-500';
      default:
        return 'bg-neutral-100 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 text-neutral-400';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 pt-32 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ================= HEADER HERO BANNER ================= */}
        <div className="relative rounded-[2rem] bg-neutral-900 border border-neutral-800 p-6 sm:p-10 overflow-hidden shadow-xl">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#C5A059]/30 bg-neutral-800 text-[#C5A059] font-black flex items-center justify-center text-xl tracking-tighter shadow-lg relative">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'GZ'}
                {user?.isVerified && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center text-[10px] border-2 border-neutral-900 shadow">
                    <FiCheckCircle />
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">{user?.name}</h1>
                  {user?.isAdmin && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] text-[9px] font-black tracking-widest uppercase">
                      <FiShield size={10} /> Admin Staff Node
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 font-medium tracking-wide">Identity Node ID: <span className="font-mono text-[11px] text-neutral-500">{user?._id}</span></p>
              </div>
            </div>
            
            {/* লগআউট বাটনকে হিরো ব্যানারের ডান পাশে নিয়ে আসা হলো ক্লিন লুকের জন্য */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border border-neutral-700 text-neutral-300 bg-neutral-800/50 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-900/60 transition-all duration-300 shadow-sm"
            >
              <FiLogOut className="text-sm" />
              <span>Log Out Node</span>
            </button>
          </div>
        </div>

        {/* ================= NEW FEATURE: METRICS SUMMARY CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-5 flex items-center justify-between text-left shadow-sm">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">Total Pipeline Investments</span>
              <span className="text-xl font-black text-[#C5A059]">{totalSpent.toLocaleString()} BDT</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center"><FiCreditCard size={20} /></div>
          </div>
          
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-5 flex items-center justify-between text-left shadow-sm">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">Active Transmissions</span>
              <span className="text-xl font-black text-amber-500">{processingOrders} Orders</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center"><FiTruck size={20} className={processingOrders > 0 ? "animate-bounce" : ""} /></div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-5 flex items-center justify-between text-left shadow-sm">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">Successful Deliveries</span>
              <span className="text-xl font-black text-emerald-500">{completedOrders} Logged</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><FiCheckCircle size={20} /></div>
          </div>
        </div>

        {/* ================= PRIMARY GRID CONTENT SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT COLUMN: PROFILE DETAILS */}
          <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-[2rem] p-6 space-y-6 text-left shadow-sm">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[#C5A059] border-b border-neutral-100 dark:border-neutral-800/60 pb-3">Identity Framework Mappings</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-500 group-hover:text-[#C5A059] flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 transition-colors"><FiUser size={15} /></div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">Full Registered Identity</span>
                  <span className="text-xs font-bold tracking-wide">{user?.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-500 group-hover:text-[#C5A059] flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 transition-colors"><FiMail size={15} /></div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">Secure Account Email</span>
                  <span className="text-xs font-bold tracking-wide break-all">{user?.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-500 group-hover:text-[#C5A059] flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 transition-colors"><FiPhone size={15} /></div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">Communication Mobile Node</span>
                  <span className="text-xs font-bold tracking-wide font-mono">{user?.phone || 'Not Configured'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-950 text-neutral-500 group-hover:text-[#C5A059] flex items-center justify-center border border-neutral-200/40 dark:border-neutral-800/40 transition-colors"><FiMapPin size={15} /></div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-400">Default Drop Destination</span>
                  <span className="text-xs font-bold tracking-wide capitalize">{user?.address || 'No Address Logged'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIVE ORDER TRANSFERS */}
          <div className="lg:col-span-8 space-y-4 text-left">

            <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 pb-3">
              <h3 className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                <FiPackage size={16} className="text-[#C5A059]" /> Transmission Pipeline Tracker
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-400 font-bold text-[10px] border border-neutral-200/40 dark:border-neutral-800/60">
                Total Logs: {safeOrders.length}
              </span>
            </div>

            {/* Empty State Call to Action Link */}
            {safeOrders.length === 0 && (
              <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] space-y-4 flex flex-col items-center justify-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center text-neutral-400"><FiAlertCircle size={22} /></div>
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-wider">No Transaction Logs Registered</p>
                  <p className="text-xs text-neutral-400">You haven't ordered any premium apparel yet.</p>
                </div>
                <Link 
                  to="/shop" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white dark:bg-[#C5A059] dark:text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all hover:opacity-90 shadow-md"
                >
                  <FiShoppingBag /> Teleport To Shop
                </Link>
              </div>
            )}

            {/* Order Loop Card */}
            <div className="space-y-4">
              {safeOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl p-5 space-y-4 hover:border-[#C5A059]/30 transition-all duration-300 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800/60 pb-3">
                    <div className="space-y-0.5">
                      <span className="block text-[9px] font-black uppercase text-neutral-400 tracking-widest">Pipeline Target ID</span>
                      <span className="text-xs font-mono font-bold tracking-tight text-[#C5A059]">{order._id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-wider rounded-lg">
                        <FiCreditCard size={11} /> {order.paymentMethod || 'COD'}
                      </span>

                      {/* Dynamic Color Badge Based on Status */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${getStatusStyles(order.orderStatus)}`}>
                        <FiClock size={11} className={order.orderStatus === 'Processing' ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} /> 
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.products?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/30 dark:border-neutral-800/30 rounded-xl p-3">
                        <div className="flex items-center gap-2.5 text-left">
                          <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-black text-[10px] text-neutral-500">PKG</div>
                          <div>
                            <span className="block text-xs font-black uppercase tracking-tight">Apparel Item Sequence</span>
                            <span className="block text-[10px] font-mono text-neutral-400">ID: {item.productId}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="block text-xs font-black tracking-tight">{item.price} BDT</span>
                          <span className="block text-[10px] font-bold text-neutral-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-black uppercase">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
                      <FiClock size={12} /> Logged:
                      <span className="font-bold tracking-tight text-neutral-500 dark:text-neutral-400 font-mono">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Pending'}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-neutral-400 pr-1 tracking-wider">NET AGGREGATE PAYLOAD:</span>
                      <span className="text-sm text-[#C5A059] tracking-tight">{order.totalPrice} BDT</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;