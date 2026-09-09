// import { useState, useEffect, useRef } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   FiUser,
//   FiMail,
//   FiLock,
//   FiPhone,
//   FiLoader,
//   FiAlertCircle,
//   FiX,
//   FiEye,
//   FiEyeOff,
//   FiCheckCircle,
//   FiShield,
// } from "react-icons/fi";
// import { FaGoogle, FaFacebook, FaArrowLeft } from "react-icons/fa6";

// const Register = () => {
//   const {
//     errorMsg,
//     setErrorMsg,
//     successMsg,
//     setSuccessMsg,
//     registerUser,
//     verifyOtp,
//     isLoading,
//     handleGoogle,
//     handleFacebook,
//   } = useAuth();
//   const navigate = useNavigate();

//   // Step state: 1 = Registration, 2 = OTP Verification
//   const [step, setStep] = useState(1);
//   const [timer, setTimer] = useState(180); // 3 Minutes Timer
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Form Data State
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // OTP State (6 Digits)
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const inputRefs = useRef([]);

//   // Session recovery check on mount
//   useEffect(() => {
//     const savedToken = sessionStorage.getItem("activationToken");
//     const savedEmail = sessionStorage.getItem("userEmail");
//     if (savedToken && savedEmail) {
//       setStep(2);
//     }
//   }, []);

//   // OTP Countdown Timer
//   useEffect(() => {
//     let interval = null;
//     if (step === 2 && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [step, timer]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Step 1: Submit Register Form
//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setErrorMsg("পাসওয়ার্ড দুটি মিলছে না!");
//       setTimeout(() => setErrorMsg(""), 4000);
//       return;
//     }

//     const response = await registerUser({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       password: formData.password,
//     });

//     if (response.success) {
//       setTimer(300); // Reset timer
//       setStep(2);
//     }
//   };

//   // Step 2: Handle 6-Digit OTP Focus & Change
//   const handleOtpChange = (element, index) => {
//     if (isNaN(element.value)) return false;
//     let newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);

//     // Auto-focus next input box
//     if (element.value !== "" && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleOtpKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   // Step 2: Submit OTP
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     const finalOtp = otp.join("");

//     if (finalOtp.length < 6) {
//       setErrorMsg("সম্পূর্ণ ৬ ডিজিটের OTP কোডটি লিখুন!");
//       setTimeout(() => setErrorMsg(""), 4000);
//       return;
//     }

//     const response = await verifyOtp(finalOtp);

//     if (response.success) {
//       setTimeout(() => {
//         navigate("/login");
//         setSuccessMsg("");
//       }, 2000);
//     }
//   };

//   // Format Time (MM:SS)
//   const formatTime = () => {
//     const mins = Math.floor(timer / 60)
//       .toString()
//       .padStart(2, "0");
//     const secs = (timer % 60).toString().padStart(2, "0");
//     return `${mins}:${secs}`;
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
//       {/* ================= LEFT SIDE COLUMN: BRANDING ================= */}
//       <div className="hidden lg:flex lg:col-span-5 bg-neutral-900 dark:bg-neutral-900/40 border-r border-neutral-200/40 dark:border-neutral-800/60 p-12 flex-col justify-between relative overflow-hidden">
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

//         {/* logo */}
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

//         <div className="space-y-6 my-auto relative z-10 max-w-sm">
//           <div
//             className="inline-block px-3 py-1 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[#C5A059] text-[9px] font-black tracking-widest uppercase animate-bounce"
//             style={{ animationDuration: "3s" }}
//           >
//             Next-Gen Drop Pipeline
//           </div>
//           <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.1] uppercase">
//             Redefining <br />
//             Urban Street{" "}
//             <span className="text-[#C5A059] transition-colors duration-300 hover:text-white">
//               Culture.
//             </span>
//           </h1>
//           <p className="text-xs text-neutral-400 font-medium leading-relaxed">
//             Gain exclusive priority access to premium structured aesthetics,
//             limited dynamic shock drops, and tactical updates straight into your
//             portal context.
//           </p>
//         </div>

//         <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 relative z-10">
//           © 2026 GEN-Z Core Mesh Layer Architecture.
//         </div>
//       </div>

//       {/* ================= RIGHT SIDE COLUMN: FORM CONTENT ================= */}
//       <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
//         <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

//         <div className="w-full max-w-md space-y-8 relative z-10">
//           {/* Logo Mobile */}
//           <div className="sm:hidden border border-neutral-900 w-fit px-3 py-1 rounded-2xl">
//             <Link to={"/"} className="flex items-center gap-2">
//               <FaArrowLeft />
//               <span>Back to Home</span>
//             </Link>
//           </div>

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

//           {/* Dynamic Header */}
//           <div className="text-left hidden lg:block">
//             <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
//               {step === 1 ? "Create Account" : "Verify Identity"}
//             </h2>
//             <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-1">
//               {step === 1
//                 ? "Set up your terminal verification access parameters."
//                 : `We sent a 6-digit verification code to ${sessionStorage.getItem("userEmail") || "your email"}.`}
//             </p>
//           </div>

//           {/* Error Message Alert */}
//           {errorMsg && (
//             <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 bg-rose-500/10 border-rose-500/20 text-rose-500">
//               <FiAlertCircle className="shrink-0 mt-0.5" size={14} />
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

//           {/* Success Message Alert */}
//           {successMsg && (
//             <div className="p-4 rounded-xl flex items-start gap-2 text-xs font-bold border transition-all duration-300 bg-emerald-500/10 border-emerald-500/20 text-emerald-500">
//               <FiCheckCircle className="shrink-0 mt-0.5" size={14} />
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

//           {/* ================= STEP 1: REGISTER FORM ================= */}
//           {step === 1 ? (
//             <div>
//               <form
//                 onSubmit={handleRegisterSubmit}
//                 className="space-y-4 text-left"
//               >
//                 <div className="space-y-1.5 group">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
//                     <FiUser className="inline mr-1" size={12} /> Full Identity
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     disabled={isLoading}
//                     placeholder="e.g. Asif Rahman"
//                     className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
//                   />
//                 </div>

//                 <div className="space-y-1.5 group">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
//                     <FiMail className="inline mr-1" size={12} /> Communication
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     disabled={isLoading}
//                     placeholder="crew@example.com"
//                     className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
//                   />
//                 </div>

//                 <div className="space-y-1.5 group">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
//                     <FiPhone className="inline mr-1" size={12} /> Mobile Phone
//                     Node
//                   </label>
//                   <input
//                     type="number"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     disabled={isLoading}
//                     placeholder="017XXXXXXXX"
//                     className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 disabled:opacity-50"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="space-y-1.5 group">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
//                       <FiLock className="inline mr-1" size={12} /> Secure
//                       Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         required
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         disabled={isLoading}
//                         placeholder="••••••••"
//                         className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] disabled:opacity-50"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059]"
//                       >
//                         {showPassword ? (
//                           <FiEyeOff size={15} />
//                         ) : (
//                           <FiEye size={15} />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="space-y-1.5 group">
//                     <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-focus-within:text-[#C5A059] transition-colors">
//                       <FiLock className="inline mr-1" size={12} /> Re-type
//                       Verify
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         required
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         disabled={isLoading}
//                         placeholder="••••••••"
//                         className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] disabled:opacity-50"
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowConfirmPassword(!showConfirmPassword)
//                         }
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059]"
//                       >
//                         {showConfirmPassword ? (
//                           <FiEyeOff size={15} />
//                         ) : (
//                           <FiEye size={15} />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-3">
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                   >
//                     {isLoading ? (
//                       <>
//                         <FiLoader className="animate-spin" size={14} /> কোড
//                         পাঠানো হচ্ছে...
//                       </>
//                     ) : (
//                       "সাইন আপ করুন"
//                     )}
//                   </button>
//                 </div>
//               </form>
//               {/* register with google and facebook  */}
//               <div className="flex items-center w-full my-5 before:flex-1 before:border-t before:border-gray-200 before:dark:border-zinc-800 after:flex-1 after:border-t after:border-gray-200 after:dark:border-zinc-800 transition-colors duration-300">
//                 <span className="px-3 text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-500 font-bold">
//                   Or continue with
//                 </span>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center">
//                 {/* গুগল বাটন */}
//                 <button
//                   onClick={handleGoogle}
//                   className="flex items-center justify-center gap-2.5 w-full sm:w-1/2 px-3 py-3 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-700 dark:text-zinc-300 bg-white dark:bg-[#121214] font-bold text-[11px] uppercase tracking-wider transition-all duration-300  hover:-translate-y-0.5 hover:bg-gray-50 hover:dark:bg-[#161619] hover:border-gray-400 hover:dark:border-zinc-500 hover:text-gray-900 hover:dark:text-white active:scale-[0.97]"
//                 >
//                   <FaGoogle size={16} color="#EA4335" />
//                   Sign up with Google
//                 </button>

//                 {/* ফেসবুক বাটন */}
//                 <button
//                   onClick={handleFacebook}
//                   className="flex items-center justify-center gap-2.5 w-full sm:w-1/2 px-3 py-3 border border-gray-300 dark:border-zinc-800 rounded-xl text-gray-700 dark:text-zinc-300 bg-white dark:bg-[#121214] font-bold text-[11px] uppercase tracking-wider transition-all duration-300  hover:-translate-y-0.5 hover:bg-gray-50 hover:dark:bg-[#161619] hover:border-[#1877F2] hover:dark:border-[#1877F2] hover:text-gray-900 hover:dark:text-white hover:shadow-[0_0_15px_rgba(24,119,242,0.15)] hover:dark:shadow-[0_0_15px_rgba(24,119,242,0.25)] active:scale-[0.97]"
//                 >
//                   <FaFacebook size={16} color="#1877F2" />
//                   Sign up with Facebook
//                 </button>
//               </div>
//             </div>
//           ) : (
//             /* ================= STEP 2: OTP VERIFICATION FORM ================= */
//             <form onSubmit={handleOtpSubmit} className="space-y-6 text-center">
//               <div className="flex items-center justify-center gap-2 text-[#C5A059]">
//                 <FiShield size={32} />
//               </div>

//               {/* 6 Digit Input Box */}
//               <div className="flex justify-center gap-2 sm:gap-3">
//                 {otp.map((data, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     maxLength="1"
//                     value={data}
//                     ref={(el) => (inputRefs.current[index] = el)}
//                     onChange={(e) => handleOtpChange(e.target, index)}
//                     onKeyDown={(e) => handleOtpKeyDown(e, index)}
//                     className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all"
//                   />
//                 ))}
//               </div>

//               {/* Timer UI */}
//               <div
//                 className={`text-xs font-bold tracking-wider ${timer === 0 ? "text-rose-500" : "text-neutral-400"}`}
//               >
//                 {timer > 0 ? (
//                   <>
//                     কোডের মেয়াদ শেষ হবে:{" "}
//                     <span className="text-[#C5A059] font-mono text-sm ml-1">
//                       {formatTime()}
//                     </span>
//                   </>
//                 ) : (
//                   "কোডের মেয়াদ শেষ! পুনরায় চেষ্টা করুন।"
//                 )}
//               </div>

//               <div className="space-y-3">
//                 <button
//                   type="submit"
//                   disabled={isLoading || timer === 0}
//                   className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   {isLoading ? (
//                     <>
//                       <FiLoader className="animate-spin" size={14} /> ভেরিফাই
//                       হচ্ছে...
//                     </>
//                   ) : (
//                     "অ্যাকাউন্ট ভেরিফাই করুন"
//                   )}
//                 </button>

//                 {/* Reset to Step 1 Button */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     sessionStorage.clear();
//                     setStep(1);
//                   }}
//                   className="w-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all"
//                 >
//                   ইমেল পরিবর্তন / আবার চেষ্টা করুন
//                 </button>
//               </div>
//             </form>
//           )}

//           <div className="pt-2 text-center text-xs font-bold text-neutral-500">
//             Already registered as a member?{" "}
//             <Link to="/login" className="text-[#C5A059] hover:underline pl-1">
//               Terminal Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// 2

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiLoader,
  FiAlertCircle,
  FiX,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa6";

const Register = () => {
  const {
    errorMsg,
    setErrorMsg,
    successMsg,
    setSuccessMsg,
    registerUser,
    verifyOtp,
    isLoading,
    handleGoogle,
    handleFacebook,
  } = useAuth();
  const navigate = useNavigate();

  // Step state: 1 = Registration, 2 = OTP Verification
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(180); // 3 Minutes Timer
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // OTP State (6 Digits)
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Session recovery check on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem("activationToken");
    const savedEmail = sessionStorage.getItem("userEmail");
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
      setErrorMsg("Passwords do not match! Please verify both fields.");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    const response = await registerUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (response?.success) {
      setTimer(300); // Reset timer to 5 minutes
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
      setErrorMsg("Please enter the complete 6-digit verification code!");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    const response = await verifyOtp(finalOtp);

    if (response?.success) {
      setTimeout(() => {
        navigate("/login");
        setSuccessMsg("");
      }, 2000);
    }
  };

  // Format Time (MM:SS)
  const formatTime = () => {
    const mins = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const secs = (timer % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
      {/* ================= LEFT SIDE COLUMN: BRANDING ================= */}
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
            Next-Gen Drop Pipeline
          </div>
          <h1 className="text-3xl xl:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.1] uppercase">
            Redefining <br />
            Urban Street{" "}
            <span className="text-[#C5A059] transition-colors duration-300 hover:text-neutral-800 dark:hover:text-white">
              Culture.
            </span>
          </h1>
          <p className="text-xs xl:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Gain exclusive priority access to premium structured aesthetics,
            limited dynamic shock drops, and tactical updates straight into your
            portal context.
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
          <div
            className={`${step === 1 ? "text-left" : "text-center"} space-y-2`}
          >
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              {step === 1 ? "Create Account" : "Verify Identity"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              {step === 1
                ? "Join our elite circle to unlock custom streetwear drops, exclusive rewards, and personalized access."
                : `We sent a 6-digit verification code to ${
                    sessionStorage.getItem("userEmail") ||
                    "your registered email"
                  }.`}
            </p>
          </div>

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

          {/* ================= STEP 1: REGISTER FORM ================= */}
          {step === 1 ? (
            <div className="space-y-6">
              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-4 text-left"
              >
                {/* Full Name Input */}
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                    <FiUser size={13} /> Full Identity Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="e.g. Asif Rahman"
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
                  />
                </div>

                {/* Email Input */}
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
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                    <FiPhone size={13} /> Mobile Phone Node
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
                  />
                </div>

                {/* Password Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                      <FiLock size={13} /> Secure Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors"
                      >
                        {showPassword ? (
                          <FiEyeOff size={15} />
                        ) : (
                          <FiEye size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                      <FiLock size={13} /> Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff size={15} />
                        ) : (
                          <FiEye size={15} />
                        )}
                      </button>
                    </div>
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
                        <FiLoader className="animate-spin" size={16} /> Sending
                        Verification Code...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>

              {/* Social Login Divider */}
              <div className="flex items-center w-full my-5 before:flex-1 before:border-t before:border-neutral-300 dark:before:border-neutral-800 after:flex-1 after:border-t after:border-neutral-300 dark:after:border-neutral-800 transition-colors duration-300">
                <span className="px-3 text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-extrabold">
                  Or continue with
                </span>
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-center">
                <button
                  type="button"
                  onClick={handleGoogle}
                  className="flex items-center justify-center gap-2.5 w-full sm:w-1/2 px-3 py-3 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 font-bold text-[11px] uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:dark:bg-neutral-800/60 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white shadow-sm active:scale-[0.97]"
                >
                  <FaGoogle size={15} className="text-[#EA4335]" />
                  Sign up with Google
                </button>

                <button
                  type="button"
                  onClick={handleFacebook}
                  className="flex items-center justify-center gap-2.5 w-full sm:w-1/2 px-3 py-3 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 font-bold text-[11px] uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:dark:bg-neutral-800/60 hover:border-[#1877F2] dark:hover:border-[#1877F2] hover:text-neutral-900 dark:hover:text-white shadow-sm active:scale-[0.97]"
                >
                  <FaFacebook size={15} className="text-[#1877F2]" />
                  Sign up with Facebook
                </button>
              </div>
            </div>
          ) : (
            /* ================= STEP 2: OTP VERIFICATION FORM ================= */
            <form onSubmit={handleOtpSubmit} className="space-y-6 text-center">
              <div className="flex items-center justify-center gap-2 text-[#C5A059] bg-[#C5A059]/10 w-16 h-16 rounded-full mx-auto border border-[#C5A059]/20">
                <FiShield size={30} />
              </div>

              {/* 6-Digit Input Box */}
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
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 rounded-xl focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              {/* Timer UI */}
              <div
                className={`text-xs font-bold tracking-wider ${
                  timer === 0
                    ? "text-rose-500"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              >
                {timer > 0 ? (
                  <>
                    Code expires in:{" "}
                    <span className="text-[#C5A059] font-mono text-sm ml-1 font-bold">
                      {formatTime()}
                    </span>
                  </>
                ) : (
                  "Verification code expired! Please try requesting again."
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading || timer === 0}
                  className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" size={16} /> Verifying
                      Code...
                    </>
                  ) : (
                    "Verify Account"
                  )}
                </button>

                {/* Reset Step Button */}
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.clear();
                    setStep(1);
                  }}
                  className="w-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all"
                >
                  Change Email / Try Again
                </button>
              </div>
            </form>
          )}

          {/* Footer Link */}
          <div className="pt-2 text-center text-xs font-bold text-neutral-500 dark:text-neutral-400">
            Already registered as a member?{" "}
            <Link
              to="/login"
              className="text-[#C5A059] hover:underline font-extrabold pl-1 transition-all"
            >
              Terminal Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
