// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FiHome,
//   FiArrowLeft,
//   FiAlertTriangle,
//   FiCompass,
// } from "react-icons/fi";

// const NotFound = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500 antialiased font-sans select-none overflow-hidden relative">
//       {/* ================= DYNAMIC BACKGROUND FLOATING MATRIX COLUMNS ================= */}
//       <div
//         className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#C5A059]/10 rounded-full blur-[130px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
//         style={{ animationDuration: "8s" }}
//       />
//       <div
//         className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse"
//         style={{ animationDuration: "5s" }}
//       />
//       <div className="absolute top-10 right-1/4 w-80 h-80 bg-neutral-400/5 dark:bg-neutral-800/5 rounded-full blur-[100px] pointer-events-none" />

//       {/* Main Glassmorphic Wrapper Container Card */}
//       <div className="w-full max-w-lg bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.04)] dark:shadow-[0_40px_90px_rgba(0,0,0,0.5)] border border-neutral-200/80 dark:border-neutral-800/60 p-8 sm:p-12 text-center transition-all duration-500 relative z-10 hover:shadow-[0_30px_80px_rgba(197,160,89,0.05)] dark:hover:shadow-[0_40px_90px_rgba(197,160,89,0.08)] transform group">
//         {/* ================= BRAND LOGO ADVANCED CORE CONTAINER ================= */}
//         <div className="relative w-40 h-24 mx-auto mb-6 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-2xl p-3 transition-all duration-500 group/logo hover:border-[#C5A059]/60 cursor-default overflow-hidden">
//           <div className="w-fit ">
//             <div className="flex items-center gap-3 group focus:outline-none">
//               {/* Creative Geometric Diamond Badge */}
//               <div className="relative flex items-center justify-center ">
//                 {/* Background Subtle Glow on Hover */}
//                 <div className="absolute inset-0 rotate-45 bg-[#C5A059]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                 {/* Diamond Shape Box */}
//                 <div
//                   className="relative w-10 h-10 rotate-45 border-2 border-[#C5A059]
//                         bg-slate-100/80 dark:bg-neutral-900/80 backdrop-blur-sm
//                         group-hover:border-neutral-900 dark:group-hover:border-white
//                         shadow-sm group-hover:shadow-lg group-hover:shadow-[#C5A059]/20
//                         transition-all duration-500 rounded-lg flex items-center justify-center"
//                 >
//                   {/* Inner GZ Text */}
//                   <span
//                     className="-rotate-45 font-black text-base text-[#C5A059]
//                     dark:text-[#E6C687] group-hover:scale-110 transition-all duration-300 select-none"
//                   >
//                     GZ
//                   </span>
//                 </div>
//               </div>

//               {/* Brand Identity Typography */}
//               <div className="flex flex-col">
//                 <div className="flex items-center gap-1.5 leading-none">
//                   {/* High-Contrast Dynamic Title */}
//                   <span
//                     className="font-black text-xl tracking-wide
//                     text-neutral-900 dark:text-neutral-100
//                     group-hover:text-[#C5A059] dark:group-hover:text-[#E6C687]
//                     transition-colors duration-300 drop-shadow-xs"
//                   >
//                     GEN
//                     <span className="text-[#C5A059] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
//                       -
//                     </span>
//                     Z
//                   </span>

//                   {/* Eye-Catching Rotating Diamond Accent */}
//                   <span className="w-2 h-2 rotate-45 bg-[#C5A059] shadow-md transition-all duration-500 group-hover:scale-125 group-hover:rotate-[225deg]" />
//                 </div>

//                 {/* EXPORT Subtitle */}
//                 <div className="flex items-center ml-0.5">
//                   <span
//                     className="text-[9px] font-extrabold tracking-[0.35em] uppercase
//                     text-neutral-700 dark:text-[#C5A059]
//                     group-hover:text-neutral-950 dark:group-hover:text-white
//                     transition-colors duration-300"
//                   >
//                     EXPORT
//                   </span>

//                   {/* Expanding Decorative Glow Line */}
//                   <span className="h-[2px] w-3 bg-[#C5A059] opacity-80 group-hover:w-5 transition-all duration-300 shadow-[0_0_6px_#C5A059]" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= CYBER CORE GLITCH HEADER LAYOUT ================= */}
//         <div className="relative inline-block mb-2">
//           <h1 className="text-8xl sm:text-9xl font-black text-neutral-950 dark:text-white tracking-wide leading-none select-none uppercase relative transition-transform duration-300 group-hover:scale-[1.02]">
//             4
//             <span
//               className="text-[#C5A059] relative inline-block animate-bounce"
//               style={{ animationDuration: "4s" }}
//             >
//               0
//             </span>
//             4
//           </h1>
//           {/* Absolute Background Ghost Text Tracker */}
//           <span className="absolute inset-0 text-red-500/10 dark:text-[#C5A059]/5 text-8xl sm:text-9xl font-black tracking-tighter leading-none blur-[2px] translate-x-1 translate-y-0.5 select-none pointer-events-none">
//             404
//           </span>
//         </div>

//         {/* Structural Subtitle Typography Descriptions */}
//         <div className="space-y-3 max-w-sm mx-auto mb-8">
//           <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5">
//             <FiCompass
//               className="text-[#C5A059] animate-spin"
//               style={{ animationDuration: "8s" }}
//             />
//             Routing Target Staged / Void Code
//           </h2>
//           <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 font-medium leading-relaxed">
//             The database coordinate index node you are attempting to synchronize
//             does not exist or has been permanently archived from the core
//             system.
//           </p>
//         </div>

//         {/* ================= DYNAMIC ACTION TRIGGER BUTTONS GRID LAYOUT ================= */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full relative z-20">
//           <button
//             onClick={() => navigate(-1)}
//             className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 border border-neutral-200/60 dark:border-neutral-700/40 text-neutral-800 dark:text-neutral-200 font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl active:scale-95 transition-all duration-300 cursor-pointer group/btn"
//           >
//             <FiArrowLeft
//               size={14}
//               className="transform transition-transform duration-300 group-hover/btn:-translate-x-1"
//             />
//             Reverse Route
//           </button>

//           <button
//             onClick={() => navigate("/")}
//             className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/90 text-white dark:text-neutral-950 font-black text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-[0_4px_25px_rgba(197,160,89,0.15)] dark:shadow-[0_6px_30px_rgba(197,160,89,0.25)] active:scale-95 transition-all duration-300 cursor-pointer group/home"
//           >
//             <FiHome
//               size={14}
//               className="transform transition-transform duration-300 group-hover/home:scale-110"
//             />
//             HQ Dashboard
//           </button>
//         </div>

//         {/* ================= SECURITY FOOTER IDENTIFIER META ================= */}
//         <div className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
//           <FiAlertTriangle className="text-amber-500 animate-pulse" size={12} />
//           System Link Status: TERMINATED_CORE_404
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotFound;

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiHome,
  FiArrowLeft,
  FiAlertTriangle,
  FiCompass,
  FiShoppingBag,
  FiTruck,
  FiPhone,
  FiGrid,
} from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  // E-commerce Quick Access Links
  const quickLinks = [
    { name: "All Drops", path: "/", icon: <FiGrid size={13} /> },
    {
      name: "Panjabi",
      path: "/shop/category/panjabi",
      icon: <FiShoppingBag size={13} />,
    },
    {
      name: "Shirts",
      path: "/shop/category/shirt",
      icon: <FiShoppingBag size={13} />,
    },
    { name: "Track Order", path: "/track", icon: <FiTruck size={13} /> },
    { name: "Contact", path: "/contactus", icon: <FiPhone size={13} /> },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500 antialiased font-sans select-none overflow-hidden relative">
      {/* Background Glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#C5A059]/10 rounded-full blur-[130px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse"
        style={{ animationDuration: "5s" }}
      />

      {/* Main Container Card */}
      <div className="w-full max-w-lg bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.04)] dark:shadow-[0_40px_90px_rgba(0,0,0,0.5)] border border-neutral-200/80 dark:border-neutral-800/60 p-6 sm:p-10 text-center transition-all duration-500 relative z-10 hover:shadow-[0_30px_80px_rgba(197,160,89,0.05)] dark:hover:shadow-[0_40px_90px_rgba(197,160,89,0.08)]">
        {/* ================= BRAND LOGO CONTAINER ================= */}
        <div className="flex justify-center mb-6">
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none cursor-pointer"
          >
            {/* Creative Geometric Diamond Badge */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rotate-45 bg-[#C5A059]/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-11 h-11 rotate-45 border-2 border-[#C5A059] bg-slate-100/80 dark:bg-neutral-900/80 backdrop-blur-sm group-hover:border-neutral-900 dark:group-hover:border-white shadow-sm group-hover:shadow-lg group-hover:shadow-[#C5A059]/20 transition-all duration-500 rounded-lg flex items-center justify-center">
                <span className="-rotate-45 font-black text-base text-[#C5A059] dark:text-[#E6C687] group-hover:scale-110 transition-all duration-300 select-none">
                  GZ
                </span>
              </div>
            </div>

            {/* Brand Identity Typography */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-xl tracking-wide text-neutral-900 dark:text-neutral-100 group-hover:text-[#C5A059] dark:group-hover:text-[#E6C687] transition-colors duration-300 drop-shadow-xs">
                  GEN
                  <span className="text-[#C5A059] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                    -
                  </span>
                  Z
                </span>
                <span className="w-2 h-2 rotate-45 bg-[#C5A059] shadow-md transition-all duration-500 group-hover:scale-125 group-hover:rotate-[225deg]" />
              </div>

              <div className="flex items-center ml-0.5 mt-1">
                <span className="text-[9px] font-extrabold tracking-[0.35em] uppercase text-neutral-700 dark:text-[#C5A059] group-hover:text-neutral-950 dark:group-hover:text-white transition-colors duration-300">
                  EXPORT
                </span>
                <span className="h-[2px] w-3 bg-[#C5A059] opacity-80 group-hover:w-5 transition-all duration-300 shadow-[0_0_6px_#C5A059]" />
              </div>
            </div>
          </Link>
        </div>

        {/* 404 HEADER LAYOUT */}
        <div className="relative inline-block mb-1">
          <h1 className="text-7xl sm:text-8xl font-black text-neutral-950 dark:text-white tracking-wide leading-none select-none uppercase relative">
            4
            <span
              className="text-[#C5A059] relative inline-block animate-bounce"
              style={{ animationDuration: "4s" }}
            >
              0
            </span>
            4
          </h1>
          <span className="absolute inset-0 text-red-500/10 dark:text-[#C5A059]/5 text-7xl sm:text-8xl font-black tracking-tighter leading-none blur-[2px] translate-x-1 translate-y-0.5 select-none pointer-events-none">
            404
          </span>
        </div>

        {/* Descriptions */}
        <div className="space-y-2 max-w-sm mx-auto mb-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1.5">
            <FiCompass
              className="text-[#C5A059] animate-spin"
              style={{ animationDuration: "8s" }}
            />
            Page Not Found
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            The page you are looking for doesn't exist or has been moved.
            Explore our popular collections below.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mb-8 relative z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 border border-neutral-200/60 dark:border-neutral-700/40 text-neutral-800 dark:text-neutral-200 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl active:scale-95 transition-all duration-300 cursor-pointer group/btn"
          >
            <FiArrowLeft
              size={14}
              className="transform transition-transform duration-300 group-hover/btn:-translate-x-1"
            />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-900 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/90 text-white dark:text-neutral-950 font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md active:scale-95 transition-all duration-300 cursor-pointer group/home"
          >
            <FiHome
              size={14}
              className="transform transition-transform duration-300 group-hover/home:scale-110"
            />
            Back To Store
          </button>
        </div>

        {/* ================= E-COMMERCE QUICK LINKS ================= */}
        <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/80 text-left">
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 text-center">
            Or Explore Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100/80 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-all duration-300"
              >
                <span className="text-[#C5A059]">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* SECURITY FOOTER */}
        <div className="mt-6 pt-4 border-t border-neutral-200/40 dark:border-neutral-800/40 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          <FiAlertTriangle className="text-amber-500 animate-pulse" size={12} />
          System Link Status: TERMINATED_CORE_404
        </div>
      </div>
    </div>
  );
};

export default NotFound;
