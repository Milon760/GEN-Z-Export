import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiAlertTriangle, FiCompass } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500 antialiased font-sans select-none overflow-hidden relative">

      {/* ================= DYNAMIC BACKGROUND FLOATING MATRIX COLUMNS ================= */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#C5A059]/10 rounded-full blur-[130px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-neutral-400/5 dark:bg-neutral-800/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Wrapper Container Card */}
      <div className="w-full max-w-lg bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.04)] dark:shadow-[0_40px_90px_rgba(0,0,0,0.5)] border border-neutral-200/80 dark:border-neutral-800/60 p-8 sm:p-12 text-center transition-all duration-500 relative z-10 hover:shadow-[0_30px_80px_rgba(197,160,89,0.05)] dark:hover:shadow-[0_40px_90px_rgba(197,160,89,0.08)] transform group">

        {/* ================= BRAND LOGO ADVANCED CORE CONTAINER ================= */}
        <div className="relative w-40 h-24 mx-auto mb-6 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-2xl p-3 transition-all duration-500 group/logo hover:border-[#C5A059]/60 cursor-default overflow-hidden">
          
          {/* Orbital Motion Ring Lines inside the logo container */}
          <div className="absolute inset-0 border border-dashed border-neutral-800 rounded-2xl scale-95" />
          <div className="absolute -inset-1 border-t-2 border-dashed border-[#C5A059]/20 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '24s' }} />
          
          <div className="flex items-center gap-2.5 relative z-10">
            {/* Box Dynamic Badge Rotation Accent */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-tighter transition-all duration-500 transform group-hover/logo:rotate-12 group-hover/logo:scale-105 bg-[#C5A059] text-neutral-950 shadow-[0_4px_15px_rgba(197,160,89,0.3)]">
              GZ
            </div>
            
            {/* Text Components Profile Layout */}
            <div className="flex flex-col items-start leading-none text-left">
              <span className="font-black text-xl tracking-tighter text-white transition-colors duration-300 group-hover/logo:text-[#C5A059]">
                GEN-Z
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase mt-1 text-[#C5A059] opacity-90">
                Export
              </span>
            </div>
          </div>
          
          {/* Background matrix scanline simulation overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-10 pointer-events-none animate-pulse" />
        </div>

        {/* ================= CYBER CORE GLITCH HEADER LAYOUT ================= */}
        <div className="relative inline-block mb-2">
          <h1 className="text-8xl sm:text-9xl font-black text-neutral-950 dark:text-white tracking-tighter leading-none select-none uppercase relative transition-transform duration-300 group-hover:scale-[1.02]">
            4<span className="text-[#C5A059] relative inline-block animate-bounce" style={{ animationDuration: '4s' }}>0</span>4
          </h1>
          {/* Absolute Background Ghost Text Tracker */}
          <span className="absolute inset-0 text-red-500/10 dark:text-[#C5A059]/5 text-8xl sm:text-9xl font-black tracking-tighter leading-none blur-[2px] translate-x-1 translate-y-0.5 select-none pointer-events-none">
            404
          </span>
        </div>

        {/* Structural Subtitle Typography Descriptions */}
        <div className="space-y-3 max-w-sm mx-auto mb-8">
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5">
            <FiCompass className="text-[#C5A059] animate-spin" style={{ animationDuration: '8s' }} /> 
            Routing Target Staged / Void Code
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 font-medium leading-relaxed">
            The database coordinate index node you are attempting to synchronize does not exist or has been permanently archived from the core system.
          </p>
        </div>

        {/* ================= DYNAMIC ACTION TRIGGER BUTTONS GRID LAYOUT ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full relative z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 border border-neutral-200/60 dark:border-neutral-700/40 text-neutral-800 dark:text-neutral-200 font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl active:scale-95 transition-all duration-300 cursor-pointer group/btn"
          >
            <FiArrowLeft size={14} className="transform transition-transform duration-300 group-hover/btn:-translate-x-1" />
            Reverse Route
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/90 text-white dark:text-neutral-950 font-black text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-[0_4px_25px_rgba(197,160,89,0.15)] dark:shadow-[0_6px_30px_rgba(197,160,89,0.25)] active:scale-95 transition-all duration-300 cursor-pointer group/home"
          >
            <FiHome size={14} className="transform transition-transform duration-300 group-hover/home:scale-110" />
            HQ Dashboard
          </button>
        </div>

        {/* ================= SECURITY FOOTER IDENTIFIER META ================= */}
        <div className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          <FiAlertTriangle className="text-amber-500 animate-pulse" size={12} /> 
          System Link Status: TERMINATED_CORE_404
        </div>

      </div>
    </div>
  );
};

export default NotFound;