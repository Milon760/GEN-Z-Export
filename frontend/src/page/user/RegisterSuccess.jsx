import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiMail, FiCheckCircle, FiRefreshCw, FiArrowRight, FiLock, FiAlertCircle } from 'react-icons/fi';

const RegisterSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Register page থেকে আসা ইউজার ডাটা রিসিভ করা হচ্ছে
  const { name, email } = location.state || { name: 'GZ Crew', email: 'your email' };

  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const timerRef = useRef(null);

  // অটোম্যাটিক টাইমার রান করার লজিক
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);
    setNotifyMsg('');
    setErrorMsg('');

    try {
      // e.g., await fetch('http://localhost:5000/auth/resend', { method: 'POST', ... })
      // এখানে আপনার ব্যাকএন্ডের রিসেন্ড ইমেইল এপিআই যুক্ত করবেন।
      
      setNotifyMsg('একটি নতুন সিকিউরিটি ভেরিফিকেশন লিঙ্ক পাঠানো হয়েছে!');
      setCountdown(60); // পুনরায় ৬০ সেকেন্ড লক করা হলো
    } catch (error) {
      setErrorMsg('ইমেইল পুনরায় পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
      
      {/* ================= LEFT SIDE COLUMN: PREMIUM BRAND AMBIENT PROFILE ================= */}
      <div className="hidden lg:flex lg:col-span-5 bg-neutral-900 dark:bg-neutral-900/40 border-r border-neutral-200/40 dark:border-neutral-800/60 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#C5A059]/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059] text-neutral-950 font-black flex items-center justify-center text-sm tracking-tighter shadow-lg">GZ</div>
          <div className="font-black uppercase tracking-widest text-sm text-white">
            GEN-Z <span className="text-[#C5A059] font-medium text-[11px] block tracking-normal normal-case opacity-80">EXPORT HUB</span>
          </div>
        </div>

        <div className="space-y-6 my-auto relative z-10 max-w-sm">
          <div className="inline-block px-3 py-1 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[#C5A059] text-[9px] font-black tracking-widest uppercase">
            Security Gate Active
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase">
            Verify Your <br />Access <span className="text-[#C5A059]">Identity.</span>
          </h1>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed">
            Your profile validation node is currently staged. Follow the core transmission link delivered to your mailbox to clear gateway access protocols.
          </p>
        </div>

        <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 relative z-10">
          © 2026 GEN-Z Core Mesh Layer Architecture.
        </div>
      </div>

      {/* ================= RIGHT SIDE COLUMN: DEDICATED SUCCESS MANAGEMENT CANVAS ================= */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-md text-center space-y-8 relative z-10 animate-[fadeIn_0.4s_ease-out]">
          
          {/* Exact Brand Logo Design */}
          <div className="flex items-center justify-center group/logo cursor-default mb-2">
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-all duration-500 transform group-hover/logo:rotate-12 bg-[#C5A059] text-neutral-950 shadow-[0_4px_15px_rgba(197,160,89,0.3)]">
                GZ
              </div>
              <div className="flex flex-col items-start leading-none text-left">
                <span className="font-black text-xl tracking-tighter text-neutral-900 dark:text-white">GEN-Z</span>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase mt-1 text-[#C5A059] opacity-90">Export</span>
              </div>
            </div>
          </div>

          {/* Verification Status Icon with Wave Animation */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 border border-dashed border-[#C5A059]/40 rounded-full animate-spin" style={{ animationDuration: '12s' }} />
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shadow-lg">
              <FiMail size={28} className="animate-pulse" />
            </div>
          </div>

          {/* Dynamic Greeting Text Group */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">অভিনন্দন, {name}!</h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-sm mx-auto leading-relaxed">
              আপনার অ্যাকাউন্টটি সফলভাবে নথিভুক্ত করা হয়েছে। আমরা একটি অ্যাক্টিভেশন লিঙ্ক <span className="text-[#C5A059] font-bold break-all">{email}</span> ঠিকানায় পাঠিয়েছি।
            </p>
          </div>

          {/* Success / Error Feedbacks Alerts */}
          {notifyMsg && (
            <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 animate-[fadeIn_0.2s_ease-out]">
              <FiCheckCircle className="shrink-0 mt-0.5" size={14} />
              <span className="flex-1 text-left">{notifyMsg}</span>
            </div>
          )}
          {errorMsg && (
            <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 animate-[fadeIn_0.2s_ease-out]">
              <FiAlertCircle className="shrink-0 mt-0.5" size={14} />
              <span className="flex-1 text-left">{errorMsg}</span>
            </div>
          )}

          {/* Dynamic Resend Countdown Controller Box */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm space-y-3 text-sm">
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold">
              ইমেইলটি খুঁজে পাচ্ছেন না? অনুগ্রহ করে স্প্যাম (Spam) ফোল্ডারটি চেক করুন।
            </p>
            
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-center">
              {countdown > 0 ? (
                <div className="text-xs font-bold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider">
                  লিঙ্ক পুনরায় পাঠান: <span className="text-[#C5A059] font-black text-sm bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">{countdown}s</span>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={isResending}
                  onClick={handleResendEmail}
                  className="inline-flex items-center gap-2 text-xs font-black text-[#C5A059] hover:text-[#C5A059]/80 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
                >
                  {isResending ? (
                    <><FiRefreshCw className="animate-spin" size={12} /> রি-ট্রান্সমিট হচ্ছে...</>
                  ) : (
                    <><FiRefreshCw size={12} /> মেইল পুনরায় পাঠান (Resend Code)</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Core Redirect Action Link Target */}
          <div className="pt-2">
            <Link
              to="/login"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#C5A059]/90 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-md active:scale-98 transition-all duration-300"
            >
              লগইন টার্মিনালে যান
              <FiArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;