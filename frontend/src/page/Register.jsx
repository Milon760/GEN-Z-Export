import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiLoader, FiCheckCircle, FiAlertCircle, FiX, FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const { registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  // Core Form Input State Management Configuration
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Password Visibility Control States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Interaction and Process Feedback State Management
  const [status, setStatus] = useState({ type: null, text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, text: '' });

    // Client-side Validation Rules
    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: 'error', text: 'Passwords mapping does not match! Please check carefully.' });
      return;
    }

    if (formData.password.length < 6) {
      setStatus({ type: 'error', text: 'Security matrix requires min 6 character length!' });
      return;
    }

    // Extract dynamic request parameters context
    const { name, email, phone, password } = formData;
    const response = await registerUser({ name, email, phone, password });

    if (response.success) {
      setStatus({ type: 'success', text: 'Crew verification established! Access sequence synchronized.' });
      setTimeout(() => navigate('/shop'), 2000);
    } else {
      setStatus({ type: 'error', text: response.message });
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
            Next-Gen Drop Pipeline
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase">
            Redefining <br/>Urban Street <span className="text-[#C5A059]">Culture.</span>
          </h1>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed">
            Gain exclusive priority access to premium structured aesthetics, limited dynamic shock drops, and tactical updates straight into your portal context.
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
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Create Account</h2>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-1">Set up your terminal verification access parameters.</p>
          </div>

          {/* Context API Action System Feedbacks Notice Boxes */}
          {status.type && (
            <div className={`p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 ${
              status.type === 'success' 
                ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                : 'bg-red-500/5 dark:bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
            }`}>
              {status.type === 'success' ? <FiCheckCircle className="shrink-0 mt-0.5" size={14} /> : <FiAlertCircle className="shrink-0 mt-0.5" size={14} />}
              <span className="flex-1 text-left">{status.text}</span>
              <button type="button" onClick={() => setStatus({ type: null, text: '' })} className="opacity-60 hover:opacity-100"><FiX size={12} /></button>
            </div>
          )}

          {/* Submission Functional Form Elements Canvas */}
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            
            {/* Identity Full Name Input Wrapper */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                <FiUser size={12} /> Full Identity Name
              </label>
              <div className="relative">
                <input
                  type="text" name="name" required value={formData.name} onChange={handleInputChange} disabled={isLoading}
                  placeholder="e.g. Asif Rahman"
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5"
                />
              </div>
            </div>

            {/* Comm Email Input Container */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                <FiMail size={12} /> Communication Email
              </label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleInputChange} disabled={isLoading}
                placeholder="crew@example.com"
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5"
              />
            </div>

            {/* Terminal Phone Component Line */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                <FiPhone size={12} /> Mobile Phone Node
              </label>
              <input
                type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} disabled={isLoading}
                placeholder="017XXXXXXXX"
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5"
              />
            </div>

            {/* Grid Group Layer For Secure Passwords Control Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Password Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                  <FiLock size={12} /> Secure Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange} disabled={isLoading}
                    placeholder="••••••••"
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5"
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                  <FiLock size={12} /> Re-type Verify
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} disabled={isLoading}
                    placeholder="••••••••"
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5"
                  />
                  <button
                    type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Action Trigger Button Submit Option */}
            <div className="pt-3">
              <button
                type="submit" disabled={isLoading}
                className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/95 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-[0_4px_20px_rgba(197,160,89,0.15)] active:scale-98 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" size={14} /> Synchronizing Credentials...
                  </>
                ) : (
                  'Initialize Crew Node Identity'
                )}
              </button>
            </div>
          </form>

          {/* Alternate Screen Navigation Redirection Layer Link */}
          <div className="pt-2 text-center text-xs font-bold text-neutral-500">
            Already registered as a member?{' '}
            <Link to="/signin" className="text-[#C5A059] hover:underline transition-colors pl-1">
              Terminal Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;