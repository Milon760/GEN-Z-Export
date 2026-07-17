import React from 'react';

const GlobalLoader = ({ message = "Synchronizing security parameters..." }) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-6 font-sans antialiased select-none relative overflow-hidden transition-colors duration-700">
      
      {/* Immersive Cyber Ambient Glow System */}
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] bg-neutral-900/0 dark:bg-white/5 rounded-full blur-[80px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />

      {/* ================= PREMIUM INTERACTIVE BRAND CORE LINK ================= */}
      <div className="relative flex flex-col items-center justify-center z-10 group cursor-pointer">
        
        {/* Multi-Layer Rotation Framework */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
          
          {/* Outer Ring: Premium Orbit Spin */}
          <div className="absolute inset-0 border border-dashed border-[#C5A059]/40 dark:border-[#C5A059]/30 rounded-[2.5rem] animate-spin" style={{ animationDuration: '14s' }} />
          
          {/* Middle Ring: Reverse Solid Pulse Accent */}
          <div className="absolute inset-3 border-2 border-dotted border-neutral-300 dark:border-neutral-800 rounded-[2rem] animate-spin group-hover:border-[#C5A059]/40 transition-colors duration-500" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
          
          {/* Glow Engine Layer on Hover */}
          <div className="absolute inset-6 bg-[#C5A059]/0 group-hover:bg-[#C5A059]/10 rounded-2xl blur-xl transition-all duration-500" />

          {/* Central Logo Terminal Base */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[1.25rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] relative z-10 transition-all duration-500 transform group-hover:rotate-12 group-hover:border-[#C5A059]/60">
            
            {/* Spinning Neon Core Dot */}
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-ping" />
            
            {/* Main Brand Initial */}
            <span className="font-black text-xl sm:text-2xl tracking-tighter text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-[#C5A059]">
              GZ
            </span>
          </div>

        </div>

        {/* ================= PREMIUM METRIC TYPOGRAPHY ================= */}
        <div className="mt-8 text-center space-y-2 max-w-xs px-4">
          
          {/* Dynamic Sub-Header with Tracking Animation */}
          <h2 className="font-black text-sm sm:text-base tracking-[0.3em] uppercase text-neutral-900 dark:text-white transition-colors duration-500 group-hover:text-[#C5A059]">
            GEN-Z <span className="text-[#C5A059] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-500">EXPORT</span>
          </h2>
          
          {/* Micro-Bar Loader Interface */}
          <div className="w-20 h-[2px] bg-neutral-200 dark:bg-neutral-800 mx-auto rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-[#C5A059] rounded-full animate-[loading-bar_1.5s_infinite_ease-in-out]" />
          </div>

          {/* Status Message Text */}
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold tracking-wide pt-1 animate-pulse leading-relaxed">
            {message}
          </p>
        </div>

      </div>

      {/* Embedded Tailwind Keyframes Animation directly via CSS style block for absolute safety */}
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

    </div>
  );
};

export default GlobalLoader;