import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiUser, FiMail, FiLock, FiPhone, FiLoader, 
  FiAlertCircle, FiX, FiEye, FiEyeOff, FiCheckCircle, FiShield 
} from 'react-icons/fi';

const Register = () => {
  const { errorMsg, setErrorMsg, successMsg, setSuccessMsg, registerUser, verifyOtp, isLoading } = useAuth();
  const navigate = useNavigate();

  // Step state: 1 = Registration, 2 = OTP Verification
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(300); // 5 Minutes Timer
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // OTP State (6 Digits)
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Session recovery check on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('activationToken');
    const savedEmail = sessionStorage.getItem('userEmail');
    if (savedToken && savedEmail) {
      setStep(2);
    }
  }, []);

  // OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Step 1: Submit Register Form
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('পাসওয়ার্ড দুটি মিলছে না!');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    const response = await registerUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    if (response.success) {
      setTimer(300); // Reset timer
      setStep(2);
    }
  };

  // Step 2: Handle 6-Digit OTP Focus & Change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input box
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Step 2: Submit OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    
    if (finalOtp.length < 6) {
      setErrorMsg('সম্পূর্ণ ৬ ডিজিটের OTP কোডটি লিখুন!');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    const response = await verifyOtp(finalOtp);

    if (response.success) {
      setTimeout(() => {
        navigate('/login');
        setSuccessMsg('')
      }, 2000);
    }
  };

  // Format Time (MM:SS)
  const formatTime = () => {
    const mins = Math.floor(timer / 60).toString().padStart(2, '0');
    const secs = (timer % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">

      {/* ================= LEFT SIDE COLUMN: BRANDING ================= */}
      <div className="hidden lg:flex lg:col-span-5 bg-neutral-900 dark:bg-neutral-900/40 border-r border-neutral-200/40 dark:border-neutral-800/60 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#C5A059]/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10 transition-transform duration-300 hover:scale-105">
          <div className="w-10 h-10 rounded-xl bg-[#C5A059] text-neutral-950 font-black flex items-center justify-center text-sm tracking-tighter shadow-lg">GZ</div>
          <div className="font-black uppercase tracking-widest text-sm text-white">
            GEN-Z <span className="text-[#C5A059] font-medium text-[11px] block tracking-normal normal-case opacity-80">EXPORT HUB</span>
          </div>
        </div>

        <div className="space-y-6 my-auto relative z-10 max-w-sm">
          <div className="inline-block px-3 py-1 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[#C5A059] text-[9px] font-black tracking-widest uppercase animate-bounce" style={{ animationDuration: '3s' }}>
            Next-Gen Drop Pipeline
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase">
            Redefining <br />Urban Street <span className="text-[#C5A059] transition-colors duration-300 hover:text-white">Culture.</span>
          </h1>
          <p className="text-xs text-neutral-400 font-medium leading-relaxed">
            Gain exclusive priority access to premium structured aesthetics, limited dynamic shock drops, and tactical updates straight into your portal context.
          </p>
        </div>

        <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 relative z-10">
          © 2026 GEN-Z Core Mesh Layer Architecture.
        </div>
      </div>

      {/* ================= RIGHT SIDE COLUMN: FORM CONTENT ================= */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          
          {/* Logo Mobile */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A059] text-neutral-950 font-black flex items-center justify-center text-base shadow-md">GZ</div>
            <h2 className="text-2xl font-black uppercase tracking-wider">GEN-Z EXPORT</h2>
          </div>

          {/* Dynamic Header */}
          <div className="text-left hidden lg:block">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {step === 1 ? 'Create Account' : 'Verify Identity'}
            </h2>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-1">
              {step === 1 
                ? 'Set up your terminal verification access parameters.' 
                : `We sent a 6-digit verification code to ${sessionStorage.getItem('userEmail') || 'your email'}.`}
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 bg-rose-500/10 border-rose-500/20 text-rose-500">
              <FiAlertCircle className="shrink-0 mt-0.5" size={14} />
              <span className="flex-1 text-left">{errorMsg}</span>
              <button type="button" onClick={() => setErrorMsg('')} className="opacity-60 hover:opacity-100"><FiX size={12} /></button>
            </div>
          )}

          {/* Success Message Alert */}
          {successMsg && (
            <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 bg-emerald-500/10 border-emerald-500/20 text-emerald-500">
              <FiCheckCircle className="shrink-0 mt-0.5" size={14} />
              <span className="flex-1 text-left">{successMsg}</span>
              <button type="button" onClick={() => setSuccessMsg('')} className="opacity-60 hover:opacity-100"><FiX size={12} /></button>
            </div>
          )}

          {/* ================= STEP 1: REGISTER FORM ================= */}
          {step === 1 ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
                  <FiUser className="inline mr-1" size={12} /> Full Identity Name
                </label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleInputChange} disabled={isLoading}
                  placeholder="e.g. Asif Rahman"
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
                  <FiMail className="inline mr-1" size={12} /> Communication Email
                </label>
                <input
                  type="email" name="email" required value={formData.email} onChange={handleInputChange} disabled={isLoading}
                  placeholder="crew@example.com"
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
                  <FiPhone className="inline mr-1" size={12} /> Mobile Phone Node
                </label>
                <input
                  type="number" name="phone" required value={formData.phone} onChange={handleInputChange} disabled={isLoading}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
                    <FiLock className="inline mr-1" size={12} /> Secure Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange} disabled={isLoading}
                      placeholder="••••••••"
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] disabled:opacity-50"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059]">
                      {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
                    <FiLock className="inline mr-1" size={12} /> Re-type Verify
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} disabled={isLoading}
                      placeholder="••••••••"
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] disabled:opacity-50"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059]">
                      {showConfirmPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit" disabled={isLoading}
                  className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <><FiLoader className="animate-spin" size={14} /> কোড পাঠানো হচ্ছে...</>
                  ) : (
                    'সাইন আপ করুন'
                  )}
                </button>
              </div>
            </form>
          ) : (

            /* ================= STEP 2: OTP VERIFICATION FORM ================= */
            <form onSubmit={handleOtpSubmit} className="space-y-6 text-center">
              <div className="flex items-center justify-center gap-2 text-[#C5A059]">
                <FiShield size={32} />
              </div>

              {/* 6 Digit Input Box */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all"
                  />
                ))}
              </div>

              {/* Timer UI */}
              <div className={`text-xs font-bold tracking-wider ${timer === 0 ? 'text-rose-500' : 'text-neutral-400'}`}>
                {timer > 0 ? (
                  <>কোডের মেয়াদ শেষ হবে: <span className="text-[#C5A059] font-mono text-sm ml-1">{formatTime()}</span></>
                ) : (
                  'কোডের মেয়াদ শেষ! পুনরায় চেষ্টা করুন।'
                )}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading || timer === 0}
                  className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <><FiLoader className="animate-spin" size={14} /> ভেরিফাই হচ্ছে...</>
                  ) : (
                    'অ্যাকাউন্ট ভেরিফাই করুন'
                  )}
                </button>

                {/* Reset to Step 1 Button */}
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.clear();
                    setStep(1);
                  }}
                  className="w-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all"
                >
                  ইমেল পরিবর্তন / আবার চেষ্টা করুন
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 text-center text-xs font-bold text-neutral-500">
            Already registered as a member?{' '}
            <Link to="/login" className="text-[#C5A059] hover:underline pl-1">Terminal Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;