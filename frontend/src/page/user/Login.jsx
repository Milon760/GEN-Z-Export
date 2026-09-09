// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   FiMail,
//   FiLock,
//   FiLoader,
//   FiX,
//   FiEye,
//   FiEyeOff,
//   FiKey,
//   FiCheck,
//   FiAlertCircle,
// } from "react-icons/fi";
// import { FaArrowLeft, FaFacebook, FaGoogle } from "react-icons/fa6";
// import GlobalLoader from "../../components/GlobalLoader";

// const Login = () => {
//   const {
//     successMsg,
//     setSuccessMsg,
//     errorMsg,
//     setErrorMsg,
//     loginUser,
//     isLoading,
//     handleGoogle,
//     handleFacebook,
//   } = useAuth();
//   const navigate = useNavigate();

//   // Core Form Input State Management Configuration
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // Password Visibility Control State
//   const [showPassword, setShowPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Connect to Context Auth Action Trigger API
//     const response = await loginUser(formData);

//     console.log(response, "login res");

//     if (response.success) {
//       setSuccessMsg(response.message || "সফলভাবে লগইন হয়েছে!");
//       setTimeout(() => {
//         navigate("/dashboard");
//         setSuccessMsg("");
//       }, 2000);
//     } else {
//       setErrorMsg(response.message || "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
//       setTimeout(() => {
//         setErrorMsg("");
//       }, 4000);
//     }
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
//       {/* ================= LEFT SIDE COLUMN: PREMIUM BRAND AMBIENT PROFILE ================= */}
//       <div className="hidden lg:flex lg:col-span-5 bg-neutral-900 dark:bg-neutral-900/40 border-r border-neutral-200/40 dark:border-neutral-800/60 p-12 flex-col justify-between relative overflow-hidden">
//         {/* Ambient Gradient Rings */}
//         <div
//           className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none animate-pulse"
//           style={{ animationDuration: "8s" }}
//         />
//         <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#C5A059]/5 rounded-full blur-[90px] pointer-events-none" />

//         <div className=" border border-neutral-900 w-fit px-3 py-1 rounded-2xl mb-5">
//           <Link to={"/"} className="flex items-center gap-2">
//             <FaArrowLeft />
//             <span>Back to Home</span>
//           </Link>
//         </div>

//         {/* Brand Header Identity */}
//         <div className="flex-shrink-0">
//           <Link
//             to="/"
//             className="flex items-center gap-3 group focus:outline-none"
//           >
//             {/* Creative Geometric Badge */}
//             <div className="relative flex items-center justify-center">
//               <div className="w-10 h-10 rotate-45 border-2 border-[#C5A059] group-hover:border-neutral-900 dark:group-hover:border-white transition-all duration-500 rounded-lg flex items-center justify-center bg-neutral-900/5 dark:bg-white/5">
//                 <span className="-rotate-45 font-black text-base text-[#C5A059] group-hover:scale-110 transition-transform duration-300">
//                   GZ
//                 </span>
//               </div>
//             </div>

//             {/* Typography */}
//             <div className="flex flex-col ml-1">
//               <span className="font-extrabold text-xl tracking-wider text-neutral-900 dark:text-white group-hover:tracking-widest transition-all duration-300">
//                 GEN-Z
//               </span>
//               <div className="flex items-center gap-1 -mt-1">
//                 <span className="text-[9px] font-bold tracking-[0.3em] text-[#C5A059] uppercase">
//                   EXPORT
//                 </span>
//                 <span className="w-2 h-[2px] bg-[#C5A059]" />
//               </div>
//             </div>
//           </Link>
//         </div>

//         {/* Cinematic Visual Messaging Layer */}
//         <div className="space-y-6 my-auto relative z-10 max-w-sm">
//           <div className="inline-block px-3 py-1 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[#C5A059] text-[9px] font-black tracking-widest uppercase">
//             Portal Control Center
//           </div>
//           <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase">
//             Welcome <br />
//             Back To The <span className="text-[#C5A059]">Core.</span>
//           </h1>
//           <p className="text-xs text-neutral-400 font-medium leading-relaxed">
//             Re-authenticate your synchronization terminal nodes to manage
//             exclusive orders tracker metrics dashboard panel.
//           </p>
//         </div>

//         {/* Footer Meta Statement Info */}
//         <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 relative z-10">
//           © 2026 GEN-Z Core Mesh Layer Architecture.
//         </div>
//       </div>

//       {/* ================= RIGHT SIDE COLUMN: RESPONSIBLE INPUT FORM DATA ================= */}
//       <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
//         {/* Mobile View Ambient Circle Layer */}
//         <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

//         <div className="w-full max-w-md space-y-8 relative z-10">
//           <div className="sm:hidden border border-neutral-900 w-fit px-3 py-1 rounded-2xl">
//             <Link to={"/"} className="flex items-center gap-2">
//               <FaArrowLeft />
//               <span>Back to Home</span>
//             </Link>
//           </div>

//           {/* Mobile Only Header Logo Asset Indicator */}
//           <div className="lg:hidden flex flex-col items-center text-center space-y-3">
//             <div className="flex-shrink-0">
//               <Link
//                 to="/"
//                 className="flex items-center gap-3 group focus:outline-none"
//               >
//                 {/* Creative Geometric Badge */}
//                 <div className="relative flex items-center justify-center">
//                   <div className="w-10 h-10 rotate-45 border-2 border-[#C5A059] group-hover:border-neutral-900 dark:group-hover:border-white transition-all duration-500 rounded-lg flex items-center justify-center bg-neutral-900/5 dark:bg-white/5">
//                     <span className="-rotate-45 font-black text-base text-[#C5A059] group-hover:scale-110 transition-transform duration-300">
//                       GZ
//                     </span>
//                   </div>
//                 </div>

//                 {/* Typography */}
//                 <div className="flex flex-col ml-1">
//                   <span className="font-extrabold text-xl tracking-wider text-neutral-900 dark:text-white group-hover:tracking-widest transition-all duration-300">
//                     GEN-Z
//                   </span>
//                   <div className="flex items-center gap-1 -mt-1">
//                     <span className="text-[9px] font-bold tracking-[0.3em] text-[#C5A059] uppercase">
//                       EXPORT
//                     </span>
//                     <span className="w-2 h-[2px] bg-[#C5A059]" />
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>

//           {/* Form Context Info Header */}
//           <div className="text-left hidden lg:block">
//             <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
//               Terminal Sign In
//             </h2>
//             <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-1">
//               Initialize identity credential node framework mappings.
//             </p>
//           </div>

//           {/* Context API Action System Feedbacks Notice Boxes */}
//           {successMsg && (
//             <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
//               <FiCheck className="shrink-0 mt-0.5" size={14} />
//               <span className="flex-1 text-left">{successMsg}</span>
//               <button
//                 type="button"
//                 onClick={() => setSuccessMsg("")}
//                 className="opacity-60 hover:opacity-100"
//               >
//                 <FiX size={12} />
//               </button>
//             </div>
//           )}

//           {errorMsg && (
//             <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400">
//               <FiAlertCircle
//                 className="shrink-0 mt-0.5 text-rose-500"
//                 size={14}
//               />
//               <span className="flex-1 text-left">{errorMsg}</span>
//               <button
//                 type="button"
//                 onClick={() => setErrorMsg("")}
//                 className="opacity-60 hover:opacity-100"
//               >
//                 <FiX size={12} />
//               </button>
//             </div>
//           )}

//           {/* Submission Functional Form Elements Canvas */}
//           <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
//             {/* Comm Email Input Container */}
//             <div className="space-y-1.5">
//               <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
//                 <FiMail size={12} /> Communication Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 disabled={isLoading}
//                 placeholder="crew@example.com"
//                 className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
//               />
//             </div>

//             {/* Primary Password Field */}
//             <div className="space-y-1.5">
//               <div className="flex items-center justify-between">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
//                   <FiLock size={12} /> Secure Account Password
//                 </label>
//                 <Link
//                   to="/forgot-password"
//                   className="text-[10px] font-black text-[#C5A059] hover:underline uppercase tracking-wider"
//                 >
//                   Forgot-Password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   required
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   disabled={isLoading}
//                   placeholder="••••••••"
//                   className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
//                 >
//                   {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
//                 </button>
//               </div>
//             </div>

//             {/* Dynamic Action Trigger Button Submit Option */}
//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/95 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-[0_4px_20px_rgba(197,160,89,0.15)] active:scale-98 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//               >
//                 {isLoading ? (
//                   <>
//                     <FiLoader className="animate-spin" size={14} /> Resolving
//                     Token Node...
//                   </>
//                 ) : (
//                   <>
//                     <FiKey size={13} /> Synchronize Access Terminal
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* register with google and facebook  */}
//           <div className="flex items-center w-full my-5 before:flex-1 before:border-t before:border-gray-200 before:dark:border-zinc-800 after:flex-1 after:border-t after:border-gray-200 after:dark:border-zinc-800 transition-colors duration-300">
//             <span className="px-3 text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-bold">
//               Or continue with
//             </span>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center">
//             {/* গুগল বাটন */}
//             <button
//               onClick={handleGoogle}
//               className="flex items-center justify-center gap-2.5 w-full sm:w-1/2 px-3 py-3 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-700 dark:text-zinc-300 bg-white dark:bg-[#121214] font-bold text-[11px] uppercase tracking-wider transition-all duration-300  hover:-translate-y-0.5 hover:bg-gray-50 hover:dark:bg-[#161619] hover:border-gray-400 hover:dark:border-zinc-500 hover:text-gray-900 hover:dark:text-white active:scale-[0.97]"
//             >
//               <FaGoogle size={16} color="#EA4335" />
//               Sign in with Google
//             </button>

//             {/* ফেসবুক বাটন */}
//             <button
//               onClick={handleFacebook}
//               className="flex items-center justify-center gap-2.5 w-full sm:w-1/2 px-3 py-3 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-700 dark:text-zinc-300 bg-white dark:bg-[#121214] font-bold text-[11px] uppercase tracking-wider transition-all duration-300  hover:-translate-y-0.5 hover:bg-gray-50 hover:dark:bg-[#161619] hover:border-[#1877F2] hover:dark:border-[#1877F2] hover:text-gray-900 hover:dark:text-white hover:shadow-[0_0_15px_rgba(24,119,242,0.15)] hover:dark:shadow-[0_0_15px_rgba(24,119,242,0.25)] active:scale-[0.97]"
//             >
//               <FaFacebook size={16} color="#1877F2" />
//               Sign in with Facebook
//             </button>
//           </div>
//           {/* Alternate Screen Navigation Redirection Layer Link */}
//           <div className="pt-2 text-center text-xs font-bold text-neutral-500">
//             New node request asset initialization?{" "}
//             <Link
//               to="/register"
//               className="text-[#C5A059] hover:underline transition-colors pl-1"
//             >
//               Create Crew Identity
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// ///  2

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiLoader,
  FiX,
  FiEye,
  FiEyeOff,
  FiKey,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { FaFacebook, FaGoogle } from "react-icons/fa6";

const Login = () => {
  const {
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    loginUser,
    isLoading,
    handleGoogle,
    handleFacebook,
  } = useAuth();
  const navigate = useNavigate();

  // Core Form Input State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Password Visibility State
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await loginUser(formData);

    if (response?.success) {
      setSuccessMsg(
        response.message || "Authentication successful! Redirecting...",
      );
      setTimeout(() => {
        navigate("/dashboard");
        setSuccessMsg("");
      }, 2000);
    } else {
      setErrorMsg(
        response?.message ||
          "Authentication failed! Please check your credentials.",
      );
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
      {/* ================= LEFT SIDE COLUMN: BRANDING & AMBIENT PROFILE ================= */}
      <div className="hidden lg:flex lg:col-span-5 bg-neutral-100 dark:bg-neutral-900/60 border-r border-neutral-200 dark:border-neutral-800/80 p-8 xl:p-12 flex-col justify-between relative overflow-hidden transition-colors duration-500">
        {/* Glow Effects */}
        <div
          className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C5A059]/15 dark:bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#C5A059]/10 dark:bg-[#C5A059]/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Back Button (Desktop) */}
        <div className="relative z-10 w-fit">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700/80 bg-white/70 dark:bg-neutral-800/50 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#C5A059] dark:hover:border-[#C5A059] hover:-translate-x-1 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300 text-[#C5A059]" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Logo Section */}
        <div className="flex-shrink-0 my-6 relative z-10">
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none w-fit"
          >
            {/* Geometric Badge */}
            <div className="relative flex items-center justify-center">
              <div className="w-11 h-11 rotate-45 border-2 border-[#C5A059] group-hover:border-neutral-900 dark:group-hover:border-white transition-all duration-500 rounded-lg flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 shadow-sm">
                <span className="-rotate-45 font-black text-lg text-[#C5A059] group-hover:scale-110 transition-transform duration-300">
                  GZ
                </span>
              </div>
            </div>

            {/* Typography */}
            <div className="flex flex-col ml-1">
              <span className="font-black text-2xl tracking-wider text-neutral-900 dark:text-white group-hover:tracking-widest transition-all duration-300">
                GEN-Z
              </span>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#C5A059] uppercase">
                  EXPORT
                </span>
                <span className="w-3 h-[2px] bg-[#C5A059] rounded-full" />
              </div>
            </div>
          </Link>
        </div>

        {/* Hero Copy */}
        <div className="space-y-6 my-auto relative z-10 max-w-md">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black tracking-widest uppercase backdrop-blur-sm animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <FiArrowLeft size={12} />
            Portal Control Center
          </div>
          <h1 className="text-3xl xl:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.1] uppercase">
            Welcome <br />
            Back To The{" "}
            <span className="text-[#C5A059] transition-colors duration-300 hover:text-neutral-800 dark:hover:text-white">
              Core.
            </span>
          </h1>
          <p className="text-xs xl:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Re-authenticate your terminal session to manage exclusive streetwear
            drops, track active dispatch orders, and sync network preferences.
          </p>
        </div>

        {/* Footer info */}
        <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 relative z-10">
          © 2026 GEN-Z Core Mesh Layer Architecture.
        </div>
      </div>

      {/* ================= RIGHT SIDE COLUMN: FORM CONTENT ================= */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 dark:bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Mobile Back Button & Header */}
          <div className="lg:hidden flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#C5A059] active:scale-95 transition-all"
            >
              <FiArrowLeft className="text-[#C5A059]" />
              <span>Back</span>
            </Link>

            <Link to="/" className="flex items-center gap-2">
              <span className="font-black text-lg text-neutral-900 dark:text-white">
                GEN-Z <span className="text-[#C5A059]">EXPORT</span>
              </span>
            </Link>
          </div>

          {/* Dynamic Section Header */}
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black uppercase tracking-widest">
              <FiKey size={12} /> Secure Authentication Node
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              Terminal Sign In
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              Initialize identity credential node framework mappings to access
              your portal.
            </p>
          </div>

          {/* Success Alert */}
          {successMsg && (
            <div className="p-4 rounded-xl flex items-start gap-2.5 text-xs font-bold border transition-all duration-300 bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <FiCheckCircle className="shrink-0 mt-0.5" size={16} />
              <span className="flex-1 text-left">{successMsg}</span>
              <button
                type="button"
                onClick={() => setSuccessMsg("")}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <FiX size={14} />
              </button>
            </div>
          )}

          {/* Error Alert */}
          {errorMsg && (
            <div className="p-4 rounded-xl flex items-start gap-2.5 text-xs font-bold border transition-all duration-300 bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400">
              <FiAlertCircle className="shrink-0 mt-0.5" size={16} />
              <span className="flex-1 text-left">{errorMsg}</span>
              <button
                type="button"
                onClick={() => setErrorMsg("")}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <FiX size={14} />
              </button>
            </div>
          )}

          {/* ================= FORM ELEMENTS ================= */}
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            {/* Communication Email Input */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                <FiMail size={13} /> Communication Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="crew@example.com"
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 group">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                  <FiLock size={13} /> Secure Account Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-black text-[#C5A059] hover:underline uppercase tracking-wider"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" size={16} /> Resolving
                    Token Node...
                  </>
                ) : (
                  <>
                    <FiKey size={14} /> Synchronize Access Terminal
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Divider */}
          <div className="flex items-center w-full my-5 before:flex-1 before:border-t before:border-neutral-300 dark:before:border-neutral-800 after:flex-1 after:border-t after:border-neutral-300 dark:after:border-neutral-800 transition-colors duration-300">
            <span className="px-3 text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-extrabold">
              Or continue with
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center">
            <button
              type="button"
              onClick={handleGoogle}
              className="flex items-center justify-center gap-2.5 w-full sm:w-1/2 px-3 py-3 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 font-bold text-[11px] uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:dark:bg-neutral-800/60 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white shadow-sm active:scale-[0.97]"
            >
              <FaGoogle size={15} className="text-[#EA4335]" />
              Sign in with Google
            </button>

            <button
              type="button"
              onClick={handleFacebook}
              className="flex items-center justify-center gap-2.5 w-full sm:w-1/2 px-3 py-3 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 font-bold text-[11px] uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:dark:bg-neutral-800/60 hover:border-[#1877F2] dark:hover:border-[#1877F2] hover:text-neutral-900 dark:hover:text-white shadow-sm active:scale-[0.97]"
            >
              <FaFacebook size={15} className="text-[#1877F2]" />
              Sign in with Facebook
            </button>
          </div>

          {/* Alternate Register Navigation Link */}
          <div className="pt-2 text-center text-xs font-bold text-neutral-500 dark:text-neutral-400">
            New node request asset initialization?{" "}
            <Link
              to="/register"
              className="text-[#C5A059] hover:underline font-extrabold pl-1 transition-all"
            >
              Create Crew Identity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
