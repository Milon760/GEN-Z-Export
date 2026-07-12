import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500 antialiased font-sans select-none overflow-hidden relative">
      
      {/* Decorative Matrix Ambient Background Gradients */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg bg-white dark:bg-neutral-950 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.02)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.25)] border border-neutral-200/60 dark:border-neutral-800/60 p-8 sm:p-12 text-center transition-all duration-500 relative z-10 group">
        
        {/* ================= BRAND LOGO CORE CONTAINER ================= */}
        <div className="relative w-24 h-24 mx-auto mb-8 bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 rounded-3xl flex items-center justify-center shadow-lg group-hover:border-[#C5A059]/40 transition-colors duration-500 p-3">
          {/* Rotating Decorative Outer Ring */}
          <div className="absolute inset-0 border border-dashed border-neutral-700/50 rounded-3xl scale-95 animate-spin" style={{ animationDuration: '16s' }} />
          
          {/* Tomar Integrated Brand Logo (Fallback system image matching grid) */}
          <img 
            src="/logo.png" // <--- Ekhane tomar asset public directory folder profile image node path boshabe
            alt="Brand HQ Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(197,160,89,0.2)] transform transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // Image source file tracking node miss hole alternative text layer component mapping text
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          
          {/* Fallback Backup Core Node Text Matrix Component */}
          <div className="hidden absolute inset-0 text-[#C5A059] font-black text-5xl items-center justify-center tracking-tighter uppercase select-none animate-pulse">
            GZ
          </div>
        </div>

        {/* Big Code Text Header */}
        <h1 className="text-7xl sm:text-8xl font-black text-neutral-950 dark:text-white tracking-tighter leading-none mb-2 select-none uppercase">
          4<span className="text-[#C5A059]">0</span>4
        </h1>

        {/* Structural Subtitle Typography Descriptions */}
        <h2 className="text-sm sm:text-base font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 mb-4">
          Drop Not Staged / Void Link
        </h2>
        
        <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 font-medium leading-relaxed max-w-sm mx-auto mb-8">
          The routing coordinate index node you are attempting to synchronize does not exist or has been archived permanently from our system core.
        </p>

        {/* Dynamic Action Trigger Buttons Grid Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white font-black text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl active:scale-95 transition-all duration-300"
          >
            <FiArrowLeft size={14} />
            Reverse Route
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/90 text-white dark:text-neutral-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(197,160,89,0.15)] dark:shadow-[0_4px_20px_rgba(197,160,89,0.25)] active:scale-95 transition-all duration-300"
          >
            <FiHome size={14} />
            HQ Dashboard
          </button>
        </div>

        {/* Absolute Security Verification Identifier Meta Footer */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-400">
          <FiAlertTriangle className="text-amber-500" size={12} /> System Status Code: TERMINATED_404
        </div>

      </div>
    </div>
  );
};

export default NotFound;