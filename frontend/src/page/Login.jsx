import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiLoader, FiX, FiEye, FiEyeOff, FiKey, FiCheck, FiAlertCircle } from 'react-icons/fi';
import GlobalLoader from '../components/GlobalLoader';

const Login = () => {
  const { successMsg, setSuccessMsg, errorMsg, setErrorMsg, loginUser, isLoading } = useAuth();
  const navigate = useNavigate();

  // Core Form Input State Management Configuration
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Password Visibility Control State
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Connect to Context Auth Action Trigger API
    const response = await loginUser(formData);

    console.log(response, 'login res');

    if (response.success) {
      setSuccessMsg(response.message || 'সফলভাবে লগইন হয়েছে!');
      setTimeout(() => {
        navigate('/');
        setSuccessMsg('');
      }, 2000);
    } else {
      setErrorMsg(response.message || 'লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
      setTimeout(() => {
        setErrorMsg('');
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">

      {/* ================= LEFT SIDE COLUMN: PREMIUM BRAND AMBIENT PROFILE ================= */}
      <div className="hidden lg:flex lg:col-span-5 bg-neutral-900 dark:bg-neutral-900/40 border-r border-neutral-200/40 dark:border-neutral-800/60 p-12 flex-col justify-between relative overflow-hidden">
        {/* Ambient Gradient Rings */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#C5A059]/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Brand Header Identity */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059] text-neutral-950 font-black flex items-center justify-center text-sm tracking-tighter shadow-lg">
            GZ
          </div>
          <div className="font-black uppercase tracking-widest text-sm text-white">
            GEN-Z <span className="text-[#C5A059] font-medium text-[11px] block tracking-normal normal-case opacity-80">EXPORT HUB</span>
          </div>
        </div>

        {/* Cinematic Visual Messaging Layer */}
        <div className="space-y-6 my-auto relative z-10 max-w-sm">
          <div className="inline-block px-3 py-1 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[#C5A059] text-[9px] font-black tracking-widest uppercase">
            Portal Control Center
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase">
            Welcome <br />Back To The <span className="text-[#C5A059]">Core.</span>
          </h1>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed">
            Re-authenticate your synchronization terminal nodes to manage exclusive orders tracker metrics dashboard panel.
          </p>
        </div>

        {/* Footer Meta Statement Info */}
        <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 relative z-10">
          © 2026 GEN-Z Core Mesh Layer Architecture.
        </div>
      </div>

      {/* ================= RIGHT SIDE COLUMN: RESPONSIBLE INPUT FORM DATA ================= */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        {/* Mobile View Ambient Circle Layer */}
        <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">

          {/* Mobile Only Header Logo Asset Indicator */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A059] text-neutral-950 font-black flex items-center justify-center text-base shadow-md">GZ</div>
            <h2 className="text-2xl font-black uppercase tracking-wider">GEN-Z EXPORT</h2>
          </div>

          {/* Form Context Info Header */}
          <div className="text-left hidden lg:block">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Terminal Sign In</h2>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-1">Initialize identity credential node framework mappings.</p>
          </div>

          {/* Context API Action System Feedbacks Notice Boxes */}
          {successMsg && (
            <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <FiCheck className="shrink-0 mt-0.5" size={14} />
              <span className="flex-1 text-left">{successMsg}</span>
              <button type="button" onClick={() => setSuccessMsg('')} className="opacity-60 hover:opacity-100"><FiX size={12} /></button>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400">
              <FiAlertCircle className="shrink-0 mt-0.5 text-rose-500" size={14} />
              <span className="flex-1 text-left">{errorMsg}</span>
              <button type="button" onClick={() => setErrorMsg('')} className="opacity-60 hover:opacity-100"><FiX size={12} /></button>
            </div>
          )}

          {/* Submission Functional Form Elements Canvas */}
          <form onSubmit={handleFormSubmit} className="space-y-5 text-left">

            {/* Comm Email Input Container */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                <FiMail size={12} /> Communication Email
              </label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleInputChange} disabled={isLoading}
                placeholder="crew@example.com"
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
              />
            </div>

            {/* Primary Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                  <FiLock size={12} /> Secure Account Password
                </label>
                <Link to="/forgot-password" className="text-[10px] font-black text-[#C5A059] hover:underline uppercase tracking-wider">
                  Reset Token?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange} disabled={isLoading}
                  placeholder="••••••••"
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Dynamic Action Trigger Button Submit Option */}
            <div className="pt-2">
              <button
                type="submit" disabled={isLoading}
                className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/95 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-[0_4px_20px_rgba(197,160,89,0.15)] active:scale-98 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" size={14} /> Resolving Token Node...
                  </>
                ) : (
                  <>
                    <FiKey size={13} /> Synchronize Access Terminal
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Alternate Screen Navigation Redirection Layer Link */}
          <div className="pt-2 text-center text-xs font-bold text-neutral-500">
            New node request asset initialization?{' '}
            <Link to="/register" className="text-[#C5A059] hover:underline transition-colors pl-1">
              Create Crew Identity
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;