import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Context direct asset synchronization
import { FiLoader, FiCheckCircle, FiAlertTriangle, FiArrowRight, FiRefreshCw } from 'react-icons/fi';

const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  
  // Custom global authentication tracking context
  const { verifyUserEmail, isLoading } = useAuth(); 

  const [status, setStatus] = useState('processing'); // 'processing' | 'success' | 'error'
  const [message, setMessage] = useState('Synchronizing token security parameters...');
  
  // Strict Mode and Double API Call Tracker Ref Grid
  const hasRun = useRef(false);

  // Wrapped inside useCallback to prevent infinite render cycles & maintain stability
  const fetchUser = useCallback(async (isManualRetry = false) => {
    if (hasRun.current && !isManualRetry) return;
    
    hasRun.current = true; // Lock process loop instantly

    if (!token) {
      setStatus('error');
      setMessage('Verification security token node missing from url parameters.');
      return;
    }

    setStatus('processing');
    setMessage('Synchronizing token security parameters...');

    try {
      const response = await verifyUserEmail(token);

      if (response && response.success) {
        setStatus('success');
        setMessage(response.message || 'Identity established successfully! Routing access terminal...');
        
        setTimeout(() => {
          navigate('/login');
        }, 30000);
      } else {
        hasRun.current = false; 
        setStatus('error');
        setMessage(response?.message || 'Token synchronization rejected or expired link.');
      }
    } catch (error) {
      console.error('System validation error:', error);
      hasRun.current = false; 
      setStatus('error');
      setMessage('Network layer disruption or authentication database core offline.');
    }
  }, [token, navigate, verifyUserEmail]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased select-none flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden transition-colors duration-700">
      
      {/* Dynamic Brand Ambient Background Gradients */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Card Structure — Dynamic Border Glow Based on Status */}
      <div className={`w-full max-w-md bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_40px_rgba(0,0,0,0.4)] border p-8 sm:p-12 text-center transition-all duration-500 relative z-10 group ${
        status === 'success' ? 'border-emerald-500/30 dark:border-emerald-500/20' :
        status === 'error' ? 'border-rose-500/30 dark:border-rose-500/20' :
        'border-neutral-200/80 dark:border-neutral-800/60 hover:border-[#C5A059]/30 dark:hover:border-[#C5A059]/20'
      }`}>
        
        {/* ================= IDENTITY HEADER BRAND IDENTITY ================= */}
        <div className="flex items-center justify-center mb-10 group/logo cursor-default">
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-all duration-500 transform group-hover/logo:rotate-12 group-hover/logo:scale-105 bg-[#C5A059] text-neutral-950 shadow-[0_4px_15px_rgba(197,160,89,0.3)]">
              GZ
            </div>
            
            <div className="flex flex-col items-start leading-none text-left">
              <span className="font-black text-xl tracking-tighter text-neutral-900 dark:text-white transition-colors duration-300 group-hover/logo:text-[#C5A059]">
                GEN-Z
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase mt-1 text-[#C5A059] opacity-90">
                Export
              </span>
            </div>
          </div>
        </div>

        {/* ================= DYNAMIC STATUS CORE ANIMATION FRAMEWORKS ================= */}
        <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
          
          {/* Outer Dashed Matrix Spin Ring */}
          <div className={`absolute inset-0 border border-dashed rounded-full scale-100 transition-all duration-700 ${
            status === 'success' ? 'border-emerald-500/50 animate-spin' : 
            status === 'error' ? 'border-rose-500/50 animate-none' : 'border-[#C5A059]/40 animate-spin'
          }`} style={{ animationDuration: '12s' }} />
          
          {/* Status Specific Render States Layer mapping */}
          {status === 'processing' && (
            <div className="w-18 h-18 rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-inner relative animate-pulse">
              <FiLoader className="w-8 h-8 text-[#C5A059] animate-spin" />
            </div>
          )}

          {status === 'success' && (
            <div className="w-18 h-18 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shadow-[0_4px_20px_rgba(16,185,129,0.2)] transform scale-105 transition-all duration-500">
              <FiCheckCircle className="w-9 h-9 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>
          )}

          {status === 'error' && (
            <div className="w-18 h-18 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center shadow-[0_4px_20px_rgba(244,63,94,0.2)] transform scale-105 transition-all duration-500 animate-[shake_0.5s_ease-in-out]">
              <FiAlertTriangle className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* ================= TYPOGRAPHY HEADER TEXTS & DYNAMIC COLORS ================= */}
        <div className="space-y-3 mb-8">
          <h1 className={`text-xl sm:text-2xl font-black uppercase tracking-tight transition-all duration-300 ${
            status === 'success' ? 'text-emerald-600 dark:text-emerald-400' :
            status === 'error' ? 'text-rose-600 dark:text-rose-400' :
            'text-neutral-900 dark:text-white'
          }`}>
            {status === 'processing' && 'Syncing Gateway'}
            {status === 'success' && 'Access Node Verified'}
            {status === 'error' && 'Verification Broken'}
          </h1>
          
          <p className={`text-xs sm:text-sm font-semibold px-4 leading-relaxed min-h-[40px] transition-all duration-300 ${
            status === 'success' ? 'text-emerald-600/90 dark:text-emerald-400/80' :
            status === 'error' ? 'text-rose-600/90 dark:text-rose-400/80' :
            'text-neutral-500 dark:text-neutral-400'
          }`}>
            {message}
          </p>
        </div>

        {/* ================= DYNAMIC CONTEXT ACTION TERMINAL LINKS ================= */}
        {status === 'error' && (
          <div className="pt-2">
            <button 
              onClick={() => fetchUser(true)} 
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all duration-300 active:scale-95 shadow-lg group/btn cursor-pointer disabled:opacity-50"
            >
              <FiRefreshCw size={13} className={`${isLoading ? 'animate-spin' : 'group-hover/btn:rotate-180'} transition-transform duration-500`} />
              Re-initialize Token Gateway
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="pt-2">
            <Link 
              to="/login"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#C5A059]/90 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-[0_4px_20px_rgba(197,160,89,0.2)] transition-all duration-300 active:scale-95 group/link"
            >
              Manual Core Redirect
              <FiArrowRight size={14} className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        )}

        {status === 'processing' && (
          <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 animate-pulse">
            Security Checkpoint Authorization Active
          </div>
        )}

      </div>
    </div>
  );
};

export default Verify;