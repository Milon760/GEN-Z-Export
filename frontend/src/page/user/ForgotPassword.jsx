// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   FiMail,
//   FiLock,
//   FiLoader,
//   FiX,
//   FiEye,
//   FiEyeOff,
//   FiKey,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiArrowLeft,
//   FiShield,
//   FiRefreshCw,
//   FiSun,
//   FiMoon,
// } from "react-icons/fi";

// const ForgotPassword = () => {
//   const { forgetPassword, forgetOtp, resetPassword } = useAuth();
//   const navigate = useNavigate();

//   // Dark / Light Mode State
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     return (
//       localStorage.getItem("theme") === "dark" ||
//       (!("theme" in localStorage) &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches)
//     );
//   });

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [isDarkMode]);

//   // Load initial state from sessionStorage (prevents losing state on refresh)
//   const [step, setStep] = useState(() => {
//     const savedStep = sessionStorage.getItem("reset_step");
//     return savedStep ? parseInt(savedStep, 10) : 1;
//   });

//   const [email, setEmail] = useState(() => {
//     return sessionStorage.getItem("reset_email") || "";
//   });

//   const [resetToken, setResetToken] = useState(() => {
//     return sessionStorage.getItem("reset_token") || "";
//   });

//   // OTP State (6 Digits)
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const otpRefs = useRef([]);

//   // Password State
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Loading & Timer State
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);

//   // Timer sync with SessionStorage
//   const [timer, setTimer] = useState(() => {
//     const savedTime = sessionStorage.getItem("reset_timer_end");
//     if (savedTime) {
//       const remaining = Math.floor(
//         (parseInt(savedTime, 10) - Date.now()) / 1000,
//       );
//       return remaining > 0 ? remaining : 0;
//     }
//     return 120; // Default 2 minutes
//   });

//   const [canResend, setCanResend] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // Update SessionStorage on State Change
//   useEffect(() => {
//     sessionStorage.setItem("reset_step", step.toString());
//     sessionStorage.setItem("reset_email", email);
//     sessionStorage.setItem("reset_token", resetToken);
//   }, [step, email, resetToken]);

//   // Resend OTP Timer Countdown
//   useEffect(() => {
//     let interval = null;
//     if (step === 2 && timer > 0) {
//       setCanResend(false);
//       interval = setInterval(() => {
//         setTimer((prev) => {
//           if (prev <= 1) {
//             setCanResend(true);
//             sessionStorage.removeItem("reset_timer_end");
//             clearInterval(interval);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [step, timer]);

//   // Helper function for timer start
//   const startTimer = (seconds = 120) => {
//     const timerEnd = Date.now() + seconds * 1000;
//     sessionStorage.setItem("reset_timer_end", timerEnd.toString());
//     setTimer(seconds);
//     setCanResend(false);
//   };

//   // Alert Notification Helper
//   const showAlert = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 5000);
//   };

//   // Step 1: Submit Email and Send OTP
//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     if (!email) return showAlert("error", "Please enter your email address.");

//     setLoading(true);
//     try {
//       const data = await forgetPassword(email);
//       if (data?.success) {
//         showAlert("success", "A 6-digit OTP code has been sent to your email.");
//         setStep(2);
//         startTimer(120);
//       } else {
//         showAlert(
//           "error",
//           data?.message || "Failed to send code. Please try again.",
//         );
//       }
//     } catch (error) {
//       showAlert(
//         "error",
//         error.response?.data?.message ||
//           "Network error. Please check your connection.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend OTP Handler
//   const handleResendOTP = async () => {
//     if (!canResend || resendLoading) return;
//     setResendLoading(true);

//     try {
//       const data = await forgetPassword(email);
//       if (data?.success) {
//         showAlert("success", "A new OTP code has been sent to your email.");
//         startTimer(120);
//         setOtp(Array(6).fill(""));
//         if (otpRefs.current[0]) otpRefs.current[0].focus();
//       } else {
//         showAlert("error", data?.message || "Failed to resend OTP.");
//       }
//     } catch (error) {
//       showAlert(
//         "error",
//         error.response?.data?.message || "Failed to resend OTP code.",
//       );
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   // 6-Digit OTP Inputs Logic
//   const handleOtpChange = (index, value) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto Focus Next Input
//     if (value !== "" && index < 5) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === "Backspace") {
//       if (!otp[index] && index > 0) {
//         otpRefs.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handleOtpPaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").trim();
//     if (/^\d{6}$/.test(pasteData)) {
//       const digits = pasteData.split("");
//       setOtp(digits);
//       otpRefs.current[5]?.focus();
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     const fullOtp = otp.join("");
//     if (fullOtp.length !== 6) {
//       return showAlert("error", "Please enter the complete 6-digit OTP code.");
//     }

//     setLoading(true);
//     try {
//       const data = await forgetOtp(email, fullOtp);
//       if (data?.success) {
//         setResetToken(data.payload.resetToken);
//         showAlert("success", "OTP verified successfully.");
//         setStep(3);
//       } else {
//         showAlert(
//           "error",
//           data?.message || "Invalid OTP code. Please try again.",
//         );
//       }
//     } catch (error) {
//       showAlert("error", error.response?.data?.message || "Invalid OTP code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 3: Reset Password
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       return showAlert("error", "Passwords do not match!");
//     }

//     if (newPassword.length < 6) {
//       return showAlert("error", "Password must be at least 6 characters long.");
//     }

//     setLoading(true);
//     try {
//       const data = await resetPassword(resetToken, newPassword);
//       if (data?.success) {
//         showAlert(
//           "success",
//           "Password updated successfully! Redirecting to login...",
//         );
//         // Clear reset storage
//         sessionStorage.removeItem("reset_step");
//         sessionStorage.removeItem("reset_email");
//         sessionStorage.removeItem("reset_token");
//         sessionStorage.removeItem("reset_timer_end");

//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         showAlert("error", data?.message || "Failed to update password.");
//       }
//     } catch (error) {
//       showAlert(
//         "error",
//         error.response?.data?.message || "Password reset failed.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset process to Step 1
//   const resetFlow = () => {
//     sessionStorage.removeItem("reset_step");
//     sessionStorage.removeItem("reset_token");
//     sessionStorage.removeItem("reset_timer_end");
//     setOtp(Array(6).fill(""));
//     setStep(1);
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
//       {/* Dark / Light Toggle Button */}
//       <button
//         type="button"
//         onClick={() => setIsDarkMode(!isDarkMode)}
//         className="fixed top-5 right-5 z-50 p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-neutral-700 dark:text-neutral-300 hover:text-[#C5A059] dark:hover:text-[#C5A059] shadow-md transition-all active:scale-95"
//         aria-label="Toggle Theme"
//       >
//         {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
//       </button>

//       {/* ================= LEFT BRANDING SECTION ================= */}
//       <div className="hidden lg:flex lg:col-span-5 bg-neutral-100 dark:bg-neutral-900/60 border-r border-neutral-200 dark:border-neutral-800/80 p-8 xl:p-12 flex-col justify-between relative overflow-hidden transition-colors duration-500">
//         <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C5A059]/15 dark:bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
//         <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#C5A059]/10 dark:bg-[#C5A059]/5 rounded-full blur-[90px] pointer-events-none" />

//         {/* Home Link */}
//         <div className="relative z-10 w-fit">
//           <Link
//             to="/"
//             className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700/80 bg-white/70 dark:bg-neutral-800/50 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#C5A059] dark:hover:border-[#C5A059] hover:-translate-x-1 shadow-sm transition-all duration-300 group"
//           >
//             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300 text-[#C5A059]" />
//             <span>Back to Home</span>
//           </Link>
//         </div>

//         {/* Logo Section */}
//         <div className="flex-shrink-0 my-6 relative z-10">
//           <Link
//             to="/"
//             className="flex items-center gap-3.5 group focus:outline-none w-fit"
//           >
//             <div className="relative flex items-center justify-center">
//               <div className="w-11 h-11 rotate-45 border-2 border-[#C5A059] group-hover:border-neutral-900 dark:group-hover:border-white transition-all duration-500 rounded-lg flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 shadow-sm">
//                 <span className="-rotate-45 font-black text-lg text-[#C5A059] group-hover:scale-110 transition-transform duration-300">
//                   GZ
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-col ml-1">
//               <span className="font-black text-2xl tracking-wider text-neutral-900 dark:text-white group-hover:tracking-widest transition-all duration-300">
//                 GEN-Z
//               </span>
//               <div className="flex items-center gap-1.5 -mt-1">
//                 <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#C5A059] uppercase">
//                   EXPORT
//                 </span>
//                 <span className="w-3 h-[2px] bg-[#C5A059] rounded-full" />
//               </div>
//             </div>
//           </Link>
//         </div>

//         {/* Header Text */}
//         <div className="space-y-6 my-auto relative z-10 max-w-md">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black tracking-widest uppercase backdrop-blur-sm">
//             <FiShield size={12} /> Password Security Recovery
//           </div>
//           <h1 className="text-3xl xl:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.15] uppercase">
//             Account <br />
//             Recovery{" "}
//             <span className="text-[#C5A059] transition-colors duration-300">
//               Panel.
//             </span>
//           </h1>
//           <p className="text-xs xl:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
//             Ensure your account's safety by verifying your identity with OTP and
//             resetting a secure password.
//           </p>
//         </div>

//         {/* Footer Info */}
//         <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 relative z-10">
//           © 2026 GEN-Z Core Mesh Layer Architecture.
//         </div>
//       </div>

//       {/* ================= RIGHT FORM SECTION ================= */}
//       <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
//         <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 dark:bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

//         <div className="w-full max-w-md space-y-8 relative z-10">
//           {/* Mobile Top Navigation & Logo */}
//           <div className="lg:hidden flex items-center justify-between pr-10">
//             <Link
//               to="/"
//               className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#C5A059] active:scale-95 transition-all"
//             >
//               <FiArrowLeft className="text-[#C5A059]" />
//               <span>Home</span>
//             </Link>

//             <Link to="/" className="flex items-center gap-2">
//               <span className="font-black text-lg text-neutral-900 dark:text-white">
//                 GEN-Z <span className="text-[#C5A059]">EXPORT</span>
//               </span>
//             </Link>
//           </div>

//           {/* Dynamic Step Title */}
//           <div className="text-left space-y-2">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black uppercase tracking-widest">
//               <FiKey size={12} /> Step {step} of 3: Security Verification
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
//               {step === 1 && "Forgot Password?"}
//               {step === 2 && "OTP Verification"}
//               {step === 3 && "Set New Password"}
//             </h2>
//             <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
//               {step === 1 &&
//                 "Enter your registered email address below to receive an OTP code."}
//               {step === 2 && (
//                 <>
//                   We sent a 6-digit code to{" "}
//                   <span className="text-[#C5A059] font-bold">{email}</span>.
//                 </>
//               )}
//               {step === 3 &&
//                 "Create a strong and secure new password for your account."}
//             </p>
//           </div>

//           {/* Alert Message Box */}
//           {message.text && (
//             <div
//               className={`p-4 rounded-xl flex items-start gap-2.5 text-xs font-bold border transition-all duration-300 ${
//                 message.type === "success"
//                   ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
//                   : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
//               }`}
//             >
//               {message.type === "success" ? (
//                 <FiCheckCircle className="shrink-0 mt-0.5" size={16} />
//               ) : (
//                 <FiAlertCircle className="shrink-0 mt-0.5" size={16} />
//               )}
//               <span className="flex-1 text-left">{message.text}</span>
//               <button
//                 type="button"
//                 onClick={() => setMessage({ type: "", text: "" })}
//                 className="opacity-60 hover:opacity-100 transition-opacity"
//               >
//                 <FiX size={14} />
//               </button>
//             </div>
//           )}

//           {/* ================= STEP 1: EMAIL SUBMIT FORM ================= */}
//           {step === 1 && (
//             <form onSubmit={handleSendOTP} className="space-y-4 text-left">
//               <div className="space-y-1.5 group">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
//                   <FiMail size={13} /> Registered Email Address
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={loading}
//                   placeholder="name@company.com"
//                   className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
//                 />
//               </div>

//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <FiLoader className="animate-spin" size={16} /> Sending
//                       Code...
//                     </>
//                   ) : (
//                     <>
//                       <FiMail size={14} /> Send OTP Code
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* ================= STEP 2: 6-DIGIT OTP FORM ================= */}
//           {step === 2 && (
//             <form onSubmit={handleVerifyOTP} className="space-y-6 text-left">
//               <div className="space-y-3">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
//                   <FiKey size={13} /> Enter 6-Digit Verification Code
//                 </label>

//                 {/* 6 Discrete OTP Input Boxes */}
//                 <div
//                   className="grid grid-cols-6 gap-2 sm:gap-3"
//                   onPaste={handleOtpPaste}
//                 >
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       ref={(el) => (otpRefs.current[index] = el)}
//                       type="text"
//                       inputMode="numeric"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleOtpChange(index, e.target.value)}
//                       onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                       autoFocus={index === 0}
//                       className="w-full h-12 sm:h-14 text-center text-lg sm:text-xl font-black bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/20 transition-all focus:outline-none shadow-sm"
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Resend OTP & Timer Controls */}
//               <div className="flex items-center justify-between text-xs font-bold pt-1">
//                 <button
//                   type="button"
//                   onClick={resetFlow}
//                   className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors"
//                 >
//                   Change Email
//                 </button>

//                 <button
//                   type="button"
//                   disabled={!canResend || resendLoading}
//                   onClick={handleResendOTP}
//                   className={`flex items-center gap-1.5 transition-colors ${
//                     canResend
//                       ? "text-[#C5A059] hover:underline cursor-pointer"
//                       : "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
//                   }`}
//                 >
//                   <FiRefreshCw
//                     className={resendLoading ? "animate-spin" : ""}
//                     size={13}
//                   />
//                   {resendLoading ? (
//                     "Resending..."
//                   ) : canResend ? (
//                     "Resend OTP Code"
//                   ) : (
//                     <span>
//                       Resend Code ({Math.floor(timer / 60)}:
//                       {(timer % 60).toString().padStart(2, "0")})
//                     </span>
//                   )}
//                 </button>
//               </div>

//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <FiLoader className="animate-spin" size={16} /> Verifying
//                       Code...
//                     </>
//                   ) : (
//                     <>
//                       <FiCheckCircle size={14} /> Verify OTP Code
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* ================= STEP 3: RESET PASSWORD FORM ================= */}
//           {step === 3 && (
//             <form
//               onSubmit={handleResetPassword}
//               className="space-y-4 text-left"
//             >
//               {/* New Password */}
//               <div className="space-y-1.5 group">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
//                   <FiLock size={13} /> New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showNewPassword ? "text" : "password"}
//                     required
//                     minLength={6}
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     disabled={loading}
//                     placeholder="••••••••"
//                     className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
//                   >
//                     {showNewPassword ? (
//                       <FiEyeOff size={15} />
//                     ) : (
//                       <FiEye size={15} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="space-y-1.5 group">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
//                   <FiLock size={13} /> Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     required
//                     minLength={6}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     disabled={loading}
//                     placeholder="••••••••"
//                     className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
//                   >
//                     {showConfirmPassword ? (
//                       <FiEyeOff size={15} />
//                     ) : (
//                       <FiEye size={15} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <FiLoader className="animate-spin" size={16} /> Updating
//                       Password...
//                     </>
//                   ) : (
//                     <>
//                       <FiShield size={14} /> Reset Password
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Link Back to Login */}
//           <div className="pt-2 text-center text-xs font-bold text-neutral-500 dark:text-neutral-400">
//             Remembered your password?{" "}
//             <Link
//               to="/login"
//               className="text-[#C5A059] hover:underline font-extrabold pl-1 transition-all"
//             >
//               Sign In Here
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

// 2

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   FiMail,
//   FiLock,
//   FiLoader,
//   FiX,
//   FiEye,
//   FiEyeOff,
//   FiKey,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiArrowLeft,
//   FiShield,
//   FiRefreshCw,
// } from "react-icons/fi";

// const ForgotPassword = () => {
//   const { forgetPassword, forgetOtp, resetPassword } = useAuth();
//   const navigate = useNavigate();

//   // sessionStorage থেকে প্রাথমিক স্টেট লোড করা (পেজ রিফ্রেশ হলেও যাতে স্টেট না হারায়)
//   const [step, setStep] = useState(() => {
//     const savedStep = sessionStorage.getItem("reset_step");
//     return savedStep ? parseInt(savedStep, 10) : 1;
//   });

//   const [email, setEmail] = useState(() => {
//     return sessionStorage.getItem("reset_email") || "";
//   });

//   const [resetToken, setResetToken] = useState(() => {
//     return sessionStorage.getItem("reset_token") || "";
//   });

//   // OTP স্টেট (৬ ডিজিটের array)
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const otpRefs = useRef([]);

//   // পাসওয়ার্ড স্টেট
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // লোডিং ও টাইমার স্টেট
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [timer, setTimer] = useState(120); // ১২০ সেকেন্ড (২ মিনিট)
//   const [canResend, setCanResend] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // স্টেট পরিবর্তন হলে sessionStorage এ আপডেট রাখা
//   useEffect(() => {
//     sessionStorage.setItem("reset_step", step.toString());
//     sessionStorage.setItem("reset_email", email);
//     sessionStorage.setItem("reset_token", resetToken);
//   }, [step, email, resetToken]);

//   // Resend OTP টাইমার কাউন্টডাউন
//   useEffect(() => {
//     let interval = null;
//     if (step === 2 && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [step, timer]);

//   // মেসেজ প্রদর্শন হেল্পার
//   const showAlert = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 5000);
//   };

//   // ধাপ ১: ইমেইল সাবমিট এবং ওটিপি পাঠানো
//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     if (!email)
//       return showAlert("error", "দয়া করে আপনার ইমেইল এড্রেসটি প্রদান করুন।");

//     setLoading(true);
//     try {
//       const data = await forgetPassword(email);
//       if (data?.success) {
//         showAlert("success", "আপনার ইমেইলে ৬ ডিজিটের ওটিপি কোড পাঠানো হয়েছে।");
//         setStep(2);
//         setTimer(120);
//         setCanResend(false);
//       } else {
//         showAlert(
//           "error",
//           data?.message || "কোড পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
//         );
//       }
//     } catch (error) {
//       showAlert(
//         "error",
//         error.response?.data?.message ||
//           "কোড পাঠাতে সমস্যা হয়েছে। ইন্টারনেট কানেকশন চেক করুন।",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ওটিপি পুনরায় পাঠানোর হ্যান্ডলার (Resend OTP)
//   const handleResendOTP = async () => {
//     if (!canResend || resendLoading) return;
//     setResendLoading(true);

//     try {
//       const data = await forgetPassword(email);
//       if (data?.success) {
//         showAlert("success", "নতুন ওটিপি কোড পুনরায় ইমেইলে পাঠানো হয়েছে।");
//         setTimer(120);
//         setCanResend(false);
//         setOtp(Array(6).fill(""));
//         if (otpRefs.current[0]) otpRefs.current[0].focus();
//       } else {
//         showAlert("error", data?.message || "ওটিপি পাঠাতে সমস্যা হয়েছে।");
//       }
//     } catch (error) {
//       showAlert(
//         "error",
//         error.response?.data?.message || "ওটিপি পুনারায় পাঠাতে ব্যর্থ হয়েছে।",
//       );
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   // ৬ ডিজিট OTP ইনপুট হ্যান্ডলিং ও অটো-ফোকাস
//   const handleOtpChange = (index, value) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // পরের ঘরে ফোকাস নেওয়া
//     if (value !== "" && index < 5) {
//       otpRefs.current[index + 1].focus();
//     }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     // Backspace চাপলে আগের ইনপুটে যাওয়া
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       otpRefs.current[index - 1].focus();
//     }
//   };

//   const handleOtpPaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").trim();
//     if (/^\d{6}$/.test(pasteData)) {
//       const digits = pasteData.split("");
//       setOtp(digits);
//       otpRefs.current[5].focus();
//     }
//   };

//   // ধাপ ২: ওটিপি যাচাই
//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     const fullOtp = otp.join("");
//     if (fullOtp.length !== 6) {
//       return showAlert(
//         "error",
//         "দয়া করে ৬ ডিজিটের সম্পূর্ণ ওটিপি কোডটি টাইপ করুন।",
//       );
//     }

//     setLoading(true);
//     try {
//       const data = await forgetOtp(email, fullOtp);
//       if (data?.success) {
//         setResetToken(data.payload.resetToken);
//         showAlert("success", "ওটিপি সফলভাবে যাচাই করা হয়েছে।");
//         setStep(3);
//       } else {
//         showAlert(
//           "error",
//           data?.message || "ভুল ওটিপি কোড। সঠিকভাবে প্রবেশ করান।",
//         );
//       }
//     } catch (error) {
//       showAlert("error", error.response?.data?.message || "ভুল ওটিপি কোড।");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ধাপ ৩: নতুন পাসওয়ার্ড আপডেট করা
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       return showAlert("error", "দুইটি পাসওয়ার্ড হুবহু মিলছে না!");
//     }

//     if (newPassword.length < 6) {
//       return showAlert("error", "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।");
//     }

//     setLoading(true);
//     try {
//       const data = await resetPassword(resetToken, newPassword);
//       if (data?.success) {
//         showAlert(
//           "success",
//           "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে! লগইন পেজে নেওয়া হচ্ছে...",
//         );
//         // প্রসেস সফল হলে ক্যাশ ও sessionStorage ক্লিয়ার
//         sessionStorage.removeItem("reset_step");
//         sessionStorage.removeItem("reset_email");
//         sessionStorage.removeItem("reset_token");

//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         showAlert(
//           "error",
//           data?.message || "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে।",
//         );
//       }
//     } catch (error) {
//       showAlert(
//         "error",
//         error.response?.data?.message || "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে।",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ধাপ রিসেট করে ইমেইল ইনপুটে ফিরে যাওয়ার ব্যবস্থা
//   const resetFlow = () => {
//     sessionStorage.removeItem("reset_step");
//     sessionStorage.removeItem("reset_token");
//     setOtp(Array(6).fill(""));
//     setStep(1);
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
//       {/* ================= বাম দিকের ব্র্যান্ডিং সেকশন ================= */}
//       <div className="hidden lg:flex lg:col-span-5 bg-neutral-100 dark:bg-neutral-900/60 border-r border-neutral-200 dark:border-neutral-800/80 p-8 xl:p-12 flex-col justify-between relative overflow-hidden transition-colors duration-500">
//         {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
//         <div
//           className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C5A059]/15 dark:bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none animate-pulse"
//           style={{ animationDuration: "8s" }}
//         />
//         <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#C5A059]/10 dark:bg-[#C5A059]/5 rounded-full blur-[90px] pointer-events-none" />

//         {/* হোম বাটন (ডেস্কটপ) */}
//         <div className="relative z-10 w-fit">
//           <Link
//             to="/"
//             className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700/80 bg-white/70 dark:bg-neutral-800/50 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#C5A059] dark:hover:border-[#C5A059] hover:-translate-x-1 shadow-sm hover:shadow-md transition-all duration-300 group"
//           >
//             <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300 text-[#C5A059]" />
//             <span>হোমে ফিরে যান</span>
//           </Link>
//         </div>

//         {/* লোগো সেকশন */}
//         <div className="flex-shrink-0 my-6 relative z-10">
//           <Link
//             to="/"
//             className="flex items-center gap-3.5 group focus:outline-none w-fit"
//           >
//             <div className="relative flex items-center justify-center">
//               <div className="w-11 h-11 rotate-45 border-2 border-[#C5A059] group-hover:border-neutral-900 dark:group-hover:border-white transition-all duration-500 rounded-lg flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 shadow-sm">
//                 <span className="-rotate-45 font-black text-lg text-[#C5A059] group-hover:scale-110 transition-transform duration-300">
//                   GZ
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-col ml-1">
//               <span className="font-black text-2xl tracking-wider text-neutral-900 dark:text-white group-hover:tracking-widest transition-all duration-300">
//                 GEN-Z
//               </span>
//               <div className="flex items-center gap-1.5 -mt-1">
//                 <span className="text-[10px] font-extrabold tracking-[0.3em] text-[#C5A059] uppercase">
//                   EXPORT
//                 </span>
//                 <span className="w-3 h-[2px] bg-[#C5A059] rounded-full" />
//               </div>
//             </div>
//           </Link>
//         </div>

//         {/* হেডার টেক্সট */}
//         <div className="space-y-6 my-auto relative z-10 max-w-md">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black tracking-widest uppercase backdrop-blur-sm">
//             <FiShield size={12} /> পাসওয়ার্ড সিকিউরিটি রিকভারি
//           </div>
//           <h1 className="text-3xl xl:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.15] uppercase">
//             অ্যাকাউন্ট <br />
//             পুনরুদ্ধার{" "}
//             <span className="text-[#C5A059] transition-colors duration-300">
//               প্যানেল।
//             </span>
//           </h1>
//           <p className="text-xs xl:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
//             আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে ওটিপি ভেরিফিকেশন সিস্টেম
//             ব্যবহার করে নতুন পাসওয়ার্ড নির্ধারণ করুন।
//           </p>
//         </div>

//         {/* কপিরাইট ফিশিং */}
//         <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 relative z-10">
//           © 2026 GEN-Z Core Mesh Layer Architecture.
//         </div>
//       </div>

//       {/* ================= ডান দিকের ফর্ম কন্টেন্ট ================= */}
//       <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
//         <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 dark:bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

//         <div className="w-full max-w-md space-y-8 relative z-10">
//           {/* মোবাইলের জন্য ব্যাক বাটন ও ব্র্যান্ড নাম */}
//           <div className="lg:hidden flex items-center justify-between">
//             <Link
//               to="/"
//               className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#C5A059] active:scale-95 transition-all"
//             >
//               <FiArrowLeft className="text-[#C5A059]" />
//               <span>হোম</span>
//             </Link>

//             <Link to="/" className="flex items-center gap-2">
//               <span className="font-black text-lg text-neutral-900 dark:text-white">
//                 GEN-Z <span className="text-[#C5A059]">EXPORT</span>
//               </span>
//             </Link>
//           </div>

//           {/* ডাইনামিক পেজ টাইটেল */}
//           <div className="text-left space-y-2">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black uppercase tracking-widest">
//               <FiKey size={12} /> ধাপ {step} এর ৩: সিকিউরিটি ভেরিফিকেশন
//             </div>
//             <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
//               {step === 1 && "পাসওয়ার্ড ভুলে গেছেন?"}
//               {step === 2 && "ওটিপি যাচাইকরণ"}
//               {step === 3 && "নতুন পাসওয়ার্ড সেট করুন"}
//             </h2>
//             <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
//               {step === 1 &&
//                 "আপনার অ্যাকাউন্টের রেজিস্টার্ড ইমেইল এড্রেসটি নিচে প্রবেশ করান।"}
//               {step === 2 && (
//                 <>
//                   আমরা <span className="text-[#C5A059] font-bold">{email}</span>{" "}
//                   ইমেইলে একটি ৬ ডিজিটের কোড পাঠিয়েছি।
//                 </>
//               )}
//               {step === 3 &&
//                 "আপনার অ্যাকাউন্টের জন্য একটি শক্তিশালী নতুন পাসওয়ার্ড তৈরি করুন।"}
//             </p>
//           </div>

//           {/* অ্যালার্ট নোটিফিকেশন */}
//           {message.text && (
//             <div
//               className={`p-4 rounded-xl flex items-start gap-2.5 text-xs font-bold border transition-all duration-300 ${
//                 message.type === "success"
//                   ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
//                   : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
//               }`}
//             >
//               {message.type === "success" ? (
//                 <FiCheckCircle className="shrink-0 mt-0.5" size={16} />
//               ) : (
//                 <FiAlertCircle className="shrink-0 mt-0.5" size={16} />
//               )}
//               <span className="flex-1 text-left">{message.text}</span>
//               <button
//                 type="button"
//                 onClick={() => setMessage({ type: "", text: "" })}
//                 className="opacity-60 hover:opacity-100 transition-opacity"
//               >
//                 <FiX size={14} />
//               </button>
//             </div>
//           )}

//           {/* ================= ধাপ ১: ইমেইল সাবমিট ফর্ম ================= */}
//           {step === 1 && (
//             <form onSubmit={handleSendOTP} className="space-y-4 text-left">
//               <div className="space-y-1.5 group">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
//                   <FiMail size={13} /> আপনার রেজিস্টার্ড ইমেইল
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={loading}
//                   placeholder="example@mail.com"
//                   className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
//                 />
//               </div>

//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <FiLoader className="animate-spin" size={16} /> কোড পাঠানো
//                       হচ্ছে...
//                     </>
//                   ) : (
//                     <>
//                       <FiMail size={14} /> ওটিপি কোড পাঠান
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* ================= ধাপ ২: ৬ ডিজিট OTP ভেরিফিকেশন ================= */}
//           {step === 2 && (
//             <form onSubmit={handleVerifyOTP} className="space-y-6 text-left">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
//                   <FiKey size={13} /> ৬ ডিজিটের ওটিপি কোড দিন
//                 </label>

//                 {/* ৬টি আলাদা ইনপুট বক্স */}
//                 <div
//                   className="flex items-center justify-center gap-4 sm:gap-6"
//                   onPaste={handleOtpPaste}
//                 >
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       ref={(el) => (otpRefs.current[index] = el)}
//                       type="text"
//                       inputMode="numeric"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleOtpChange(index, e.target.value)}
//                       onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                       autoFocus={index === 0}
//                       className="w-12 h-14 sm:w-14 sm:h-14 text-center text-xl font-black bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/20 transition-all focus:outline-none shadow-sm"
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* রি-সেন্ড ওটিপি এবং টাইমার সেকশন */}
//               <div className="flex items-center justify-between text-xs font-bold pt-1">
//                 <button
//                   type="button"
//                   onClick={resetFlow}
//                   className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors"
//                 >
//                   ইমেইল সংশোধন করুন
//                 </button>

//                 <button
//                   type="button"
//                   disabled={!canResend || resendLoading}
//                   onClick={handleResendOTP}
//                   className={`flex items-center gap-1.5 transition-colors ${
//                     canResend
//                       ? "text-[#C5A059] hover:underline cursor-pointer"
//                       : "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
//                   }`}
//                 >
//                   <FiRefreshCw
//                     className={resendLoading ? "animate-spin" : ""}
//                     size={13}
//                   />
//                   {resendLoading ? (
//                     "পাঠানো হচ্ছে..."
//                   ) : canResend ? (
//                     "পুনরায় ওটিপি পাঠান"
//                   ) : (
//                     <span>
//                       কোড রিসেন্ড ({Math.floor(timer / 60)}:
//                       {(timer % 60).toString().padStart(2, "0")})
//                     </span>
//                   )}
//                 </button>
//               </div>

//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <FiLoader className="animate-spin" size={16} /> যাচাই করা
//                       হচ্ছে...
//                     </>
//                   ) : (
//                     <>
//                       <FiCheckCircle size={14} /> ওটিপি নিশ্চিত করুন
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* ================= ধাপ ৩: নতুন পাসওয়ার্ড সেটআপ ================= */}
//           {step === 3 && (
//             <form
//               onSubmit={handleResetPassword}
//               className="space-y-4 text-left"
//             >
//               {/* নতুন পাসওয়ার্ড */}
//               <div className="space-y-1.5 group">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
//                   <FiLock size={13} /> নতুন পাসওয়ার্ড
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showNewPassword ? "text" : "password"}
//                     required
//                     minLength={6}
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     disabled={loading}
//                     placeholder="••••••••"
//                     className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
//                   >
//                     {showNewPassword ? (
//                       <FiEyeOff size={15} />
//                     ) : (
//                       <FiEye size={15} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* পাসওয়ার্ড কনফার্মেশন */}
//               <div className="space-y-1.5 group">
//                 <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
//                   <FiLock size={13} /> পাসওয়ার্ড নিশ্চিত করুন
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     required
//                     minLength={6}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     disabled={loading}
//                     placeholder="••••••••"
//                     className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
//                   >
//                     {showConfirmPassword ? (
//                       <FiEyeOff size={15} />
//                     ) : (
//                       <FiEye size={15} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   {loading ? (
//                     <>
//                       <FiLoader className="animate-spin" size={16} /> পাসওয়ার্ড
//                       আপডেট হচ্ছে...
//                     </>
//                   ) : (
//                     <>
//                       <FiShield size={14} /> পাসওয়ার্ড রিসেট সম্পন্ন করুন
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* লগইন পেজে ফেরার লিংক */}
//           <div className="pt-2 text-center text-xs font-bold text-neutral-500 dark:text-neutral-400">
//             পাসওয়ার্ড মনে পড়েছে?{" "}
//             <Link
//               to="/login"
//               className="text-[#C5A059] hover:underline font-extrabold pl-1 transition-all"
//             >
//               লগইন পেজে যান
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

// 3

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";

const ForgotPassword = () => {
  const { forgetPassword, forgetOtp, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Theme State (Dark / Light Mode)

  // Load Initial State from SessionStorage to Prevent Data Loss on Refresh
  const [step, setStep] = useState(() => {
    const savedStep = sessionStorage.getItem("reset_step");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem("reset_email") || "";
  });

  const [resetToken, setResetToken] = useState(() => {
    return sessionStorage.getItem("reset_token") || "";
  });

  // 6-Digit OTP State & Refs
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef([]);

  // Password States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading & Timer States
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(120); // 120 Seconds (2 Minutes)
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Keep Syncing with SessionStorage on State Updates
  useEffect(() => {
    sessionStorage.setItem("reset_step", step.toString());
    sessionStorage.setItem("reset_email", email);
    sessionStorage.setItem("reset_token", resetToken);
  }, [step, email, resetToken]);

  // Resend OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Alert Helper Function
  const showAlert = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  // Step 1: Submit Email & Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email)
      return showAlert("error", "Please enter your registered email address.");

    setLoading(true);
    try {
      const data = await forgetPassword(email);
      if (data?.success) {
        showAlert("success", "A 6-digit OTP code has been sent to your email.");
        setStep(2);
        setTimer(120);
        setCanResend(false);
      } else {
        showAlert(
          "error",
          data?.message || "Failed to send code. Please try again.",
        );
      }
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message ||
          "Network error. Please check your internet connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP Handler
  const handleResendOTP = async () => {
    if (!canResend || resendLoading) return;
    setResendLoading(true);

    try {
      const data = await forgetPassword(email);
      if (data?.success) {
        showAlert("success", "A new OTP code has been sent to your email.");
        setTimer(120);
        setCanResend(false);
        setOtp(Array(6).fill(""));
        if (otpRefs.current[0]) otpRefs.current[0].focus();
      } else {
        showAlert("error", data?.message || "Failed to resend OTP code.");
      }
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Failed to resend OTP code.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  // 6-Digit OTP Handling & Auto-Focus
  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto Focus Next Input Box
    if (value !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Navigate Backwards on Backspace Key
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split("");
      setOtp(digits);
      otpRefs.current[5]?.focus();
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      return showAlert("error", "Please enter the complete 6-digit OTP code.");
    }

    setLoading(true);
    try {
      const data = await forgetOtp(email, fullOtp);
      if (data?.success) {
        setResetToken(data.payload.resetToken);
        showAlert("success", "OTP code verified successfully.");
        setStep(3);
      } else {
        showAlert(
          "error",
          data?.message || "Invalid OTP code. Please check and try again.",
        );
      }
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Invalid OTP code entered.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Update New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return showAlert("error", "Passwords do not match!");
    }

    if (newPassword.length < 6) {
      return showAlert("error", "Password must be at least 6 characters long.");
    }

    setLoading(true);
    try {
      const data = await resetPassword(resetToken, newPassword);
      if (data?.success) {
        showAlert(
          "success",
          "Password reset successful! Redirecting to login page...",
        );
        // Clear session storage upon completion
        sessionStorage.removeItem("reset_step");
        sessionStorage.removeItem("reset_email");
        sessionStorage.removeItem("reset_token");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showAlert(
          "error",
          data?.message || "Failed to update password. Try again.",
        );
      }
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Password update request failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset Flow back to Step 1
  const resetFlow = () => {
    sessionStorage.removeItem("reset_step");
    sessionStorage.removeItem("reset_token");
    setOtp(Array(6).fill(""));
    setStep(1);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
      {/* Theme Toggle Button (Top Right Floating) */}

      {/* ================= Left Branding Section ================= */}
      <div className="hidden lg:flex lg:col-span-5 bg-neutral-100 dark:bg-neutral-900/60 border-r border-neutral-200 dark:border-neutral-800/80 p-8 xl:p-12 flex-col justify-between relative overflow-hidden transition-colors duration-500">
        {/* Glow Effects */}
        <div
          className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#C5A059]/15 dark:bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#C5A059]/10 dark:bg-[#C5A059]/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Back to Home Button (Desktop) */}
        <div className="relative z-10 w-fit">
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700/80 bg-white/70 dark:bg-neutral-800/50 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-[#C5A059] dark:hover:border-[#C5A059] hover:-translate-x-1 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300 text-[#C5A059]" />
            <span>Back</span>
          </Link>
        </div>

        {/* Logo Section */}
        <div className="flex-shrink-0 my-6 relative z-10">
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none w-fit"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-11 h-11 rotate-45 border-2 border-[#C5A059] group-hover:border-neutral-900 dark:group-hover:border-white transition-all duration-500 rounded-lg flex items-center justify-center bg-white/50 dark:bg-neutral-900/50 shadow-sm">
                <span className="-rotate-45 font-black text-lg text-[#C5A059] group-hover:scale-110 transition-transform duration-300">
                  GZ
                </span>
              </div>
            </div>

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

        {/* Header Text */}
        <div className="space-y-6 my-auto relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black tracking-widest uppercase backdrop-blur-sm">
            <FiShield size={12} /> Account Recovery Portal
          </div>
          <h1 className="text-3xl xl:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.15] uppercase">
            Account <br />
            Recovery{" "}
            <span className="text-[#C5A059] transition-colors duration-300">
              Panel.
            </span>
          </h1>
          <p className="text-xs xl:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Ensure your account security using our multi-factor OTP verification
            system to reset your password safely.
          </p>
        </div>

        {/* Footer info */}
        <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 relative z-10">
          © 2026 GEN-Z Core Mesh Layer Architecture.
        </div>
      </div>

      {/* ================= Right Form Content ================= */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="lg:hidden absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 dark:bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Mobile Back Button & Brand Logo */}
          <div className="lg:hidden flex items-center justify-between">
            <Link
              to="/login"
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

          {/* Dynamic Page Header */}
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black uppercase tracking-widest">
              <FiKey size={12} /> Step {step} of 3: Verification
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              {step === 1 && "Forgot Password?"}
              {step === 2 && "OTP Verification"}
              {step === 3 && "Set New Password"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
              {step === 1 &&
                "Enter your registered email address to receive a security code."}
              {step === 2 && (
                <>
                  We have sent a 6-digit code to{" "}
                  <span className="text-[#C5A059] font-bold">{email}</span>.
                </>
              )}
              {step === 3 &&
                "Create a strong new password for your GEN-Z EXPORT account."}
            </p>
          </div>

          {/* Alert Notification Popup */}
          {message.text && (
            <div
              className={`p-4 rounded-xl flex items-start gap-2.5 text-xs font-bold border transition-all duration-300 ${
                message.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
              }`}
            >
              {message.type === "success" ? (
                <FiCheckCircle className="shrink-0 mt-0.5" size={16} />
              ) : (
                <FiAlertCircle className="shrink-0 mt-0.5" size={16} />
              )}
              <span className="flex-1 text-left">{message.text}</span>
              <button
                type="button"
                onClick={() => setMessage({ type: "", text: "" })}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <FiX size={14} />
              </button>
            </div>
          )}

          {/* ================= Step 1: Email Form ================= */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4 text-left">
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                  <FiMail size={13} /> Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="name@company.com"
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50 shadow-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" size={16} /> Sending
                      Code...
                    </>
                  ) : (
                    <>
                      <FiMail size={14} /> Send OTP Code
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ================= Step 2: 6-Digit OTP Box ================= */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6 text-left">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <FiKey size={13} /> Enter 6-Digit Verification Code
                </label>

                {/* 6 Individual Inputs with Auto-Focus */}
                <div
                  className="flex items-center justify-between gap-2 sm:gap-3"
                  onPaste={handleOtpPaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      autoFocus={index === 0}
                      className="w-11 h-13 sm:w-13 sm:h-14 text-center text-xl font-black bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/20 transition-all focus:outline-none shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Resend OTP & Timer Section */}
              <div className="flex items-center justify-between text-xs font-bold pt-1">
                <button
                  type="button"
                  onClick={resetFlow}
                  className="text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors"
                >
                  Change Email Address
                </button>

                <button
                  type="button"
                  disabled={!canResend || resendLoading}
                  onClick={handleResendOTP}
                  className={`flex items-center gap-1.5 transition-colors ${
                    canResend
                      ? "text-[#C5A059] hover:underline cursor-pointer"
                      : "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
                  }`}
                >
                  <FiRefreshCw
                    className={resendLoading ? "animate-spin" : ""}
                    size={13}
                  />
                  {resendLoading ? (
                    "Sending..."
                  ) : canResend ? (
                    "Resend OTP Code"
                  ) : (
                    <span>
                      Resend Code in ({Math.floor(timer / 60)}:
                      {(timer % 60).toString().padStart(2, "0")})
                    </span>
                  )}
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" size={16} />{" "}
                      Verifying...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle size={14} /> Verify OTP Code
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ================= Step 3: New Password Form ================= */}
          {step === 3 && (
            <form
              onSubmit={handleResetPassword}
              className="space-y-4 text-left"
            >
              {/* New Password Input */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                  <FiLock size={13} /> New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                    placeholder="••••••••"
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    {showNewPassword ? (
                      <FiEyeOff size={15} />
                    ) : (
                      <FiEye size={15} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 group-focus-within:text-[#C5A059] transition-colors flex items-center gap-1.5">
                  <FiLock size={13} /> Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    placeholder="••••••••"
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl pl-4 pr-10 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#C5A059] dark:focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/10 transition-all disabled:opacity-50 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={15} />
                    ) : (
                      <FiEye size={15} />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C5A059] hover:bg-[#b08e4c] text-neutral-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-[#C5A059]/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" size={16} /> Updating
                      Password...
                    </>
                  ) : (
                    <>
                      <FiShield size={14} /> Complete Password Reset
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Back to Login Footer Link */}
          <div className="pt-2 text-center text-xs font-bold text-neutral-500 dark:text-neutral-400">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-[#C5A059] hover:underline font-extrabold pl-1 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
