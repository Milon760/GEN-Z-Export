import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiLoader, FiCheckCircle, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';

const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Directly destructured token parameters node

  const [status, setStatus] = useState('processing'); // 'processing' | 'success' | 'error'
  const [message, setMessage] = useState('Synchronizing token security parameters...');

  const fetchUser = async () => {
    if (!token) {
      setStatus('error');
      setMessage('Verification security token node missing from url parameters.');
      return;
    }

    try {
      // Fixed: Wrapping token in an object matrix format so backend parses properly
      const res = await fetch('http://localhost:5000/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token }) 
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Identity established successfully! Routing access terminal...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Token synchronization rejected or expired link.');
      }
    } catch (error) {
      console.error('System validation runtime error:', error);
      setStatus('error');
      setMessage('Network layer disruption or authentication database core offline.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased select-none relative overflow-hidden transition-colors duration-500">
      
      {/* Dynamic Brand Ambient Background Gradients */}
      <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Center Structural Blueprint Card Container */}
      <div className="w-full max-w-md bg-white dark:bg-neutral-900/60 backdrop-blur-md rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-neutral-200/80 dark:border-neutral-800/60 p-8 sm:p-12 text-center transition-all duration-500 relative z-10 group">
        
        {/* ================= IDENTITY HEADER BRAND IDENTITY ================= */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl bg-[#C5A059] text-neutral-950 font-black flex items-center justify-center text-xs tracking-tighter shadow-md">
            GZ
          </div>
          <div className="text-left">
            <span className="font-black text-xs uppercase tracking-widest block text-neutral-900 dark:text-white">GEN-Z</span>
            <span className="text-[8px] font-black text-[#C5A059] tracking-wider uppercase block">Export Mesh</span>
          </div>
        </div>

        {/* ================= DYNAMIC STATUS CORE ANIMATION FRAMEWORKS ================= */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          
          {/* Outer Dashed Matrix Spin Ring (Always active to show lifecycle) */}
          <div className="absolute inset-0 border border-dashed border-neutral-300 dark:border-neutral-700/80 rounded-full scale-100 animate-spin" style={{ animationDuration: '16s' }} />
          
          {/* Status Specific Render States Layer mapping */}
          {status === 'processing' && (
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-inner relative">
              <FiLoader className="w-7 h-7 text-[#C5A059] animate-spin" />
            </div>
          )}

          {status === 'success' && (
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shadow-lg transform scale-110 transition-transform duration-500">
              <FiCheckCircle className="w-8 h-8 animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
          )}

          {status === 'error' && (
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shadow-lg transform scale-110 transition-transform duration-500">
              <FiAlertTriangle className="w-7 h-7" />
            </div>
          )}
        </div>

        {/* ================= TYPOGRAPHY HEADER TEXTS ================= */}
        <div className="space-y-3 mb-8">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
            {status === 'processing' && 'Syncing Gateway'}
            {status === 'success' && 'Access Node Verified'}
            {status === 'error' && 'Verification Broken'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold px-2 leading-relaxed min-h-[40px]">
            {message}
          </p>
        </div>

        {/* ================= DYNAMIC CONTEXT ACTION TERMINAL LINKS ================= */}
        {status === 'error' && (
          <div className="pt-2 animate-fade-in">
            <button 
              onClick={() => window.location.reload()}
              className="w-full inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 active:scale-98 cursor-pointer"
            >
              Retry Node Verification
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="pt-2">
            <Link 
              to="/login"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#C5A059]/90 text-neutral-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-[0_4px_20px_rgba(197,160,89,0.15)] dark:shadow-[0_4px_20px_rgba(197,160,89,0.25)] transition-all duration-300 active:scale-98"
            >
              Manual Core Redirect
              <FiArrowRight size={14} />
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