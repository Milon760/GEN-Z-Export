import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] mt-28 text-zinc-300 font-mono flex flex-col items-center p-4 sm:p-8 antialiased">
      {/* মেইন কন্টেইনার */}
      <div className="w-full max-w-3xl border border-zinc-800 bg-[#0c0c0e]/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* টপ সাইবারপাঙ্ক লাইন */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        {/* হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-6 mb-6 gap-4">
          <div>
            <h1 className="text-sm font-black tracking-[0.25em] uppercase text-cyan-400">
              PRIVACY POLICY PROTOCOL
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
              SYSTEM REVISION: v2.6.0 // LAST UPDATE: AUGUST 2026
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 border border-zinc-800 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-300 active:scale-95"
          >
            RETURN_TERMINAL
          </button>
        </div>

        {/* পলিসি টেক্সট এরিয়া */}
        <div className="space-y-6 text-[12px] leading-relaxed tracking-wide text-zinc-400 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <section className="border-l-2 border-cyan-500/30 pl-4 py-1">
            <h2 className="text-zinc-200 font-bold uppercase tracking-wide mb-2 text-[13px]">
              01 // DATA INGESTION (কী ডাটা আমরা সংগ্রহ করি)
            </h2>
            <p>
              যখন আপনি Google বা Facebook দিয়ে আমাদের অ্যাক্সেস টার্মিনালে
              প্রবেশ করেন, তখন আমরা আপনার মেটা বা গুগলের অনুমোদিত পাবলিক
              প্রোফাইল থেকে নাম, ইমেল আইডি এবং ছবি (Avatar URL) সংগ্রহ করি। আমরা
              কোনো থার্ড-পার্টি পাসওয়ার্ড বা সংবেদনশীল ব্যক্তিগত ডাটা মেমোরিতে
              সেভ করি না।
            </p>
          </section>

          <section className="border-l-2 border-zinc-800 pl-4 py-1">
            <h2 className="text-zinc-200 font-bold uppercase tracking-wide mb-2 text-[13px]">
              02 // PROTOCOL UTILIZATION (ডাটা কীভাবে ব্যবহার করা হয়)
            </h2>
            <p>
              সংগৃহীত ডাটা শুধুমাত্র আপনার ইউজার প্রোফাইল তৈরি ও লোড করার কাজে
              ব্যবহার করা হয়। আপনার ইমেলটি আপনার অর্ডার ইনভয়েস, ই-কমার্স
              ট্র্যাকিং এবং সিকিউর JWT টোকেন সেশন হ্যান্ডশেক মেইনটেইন করার জন্য
              এনক্রিপ্ট করে ডাটাবেজে সংরক্ষণ করা হয়।
            </p>
          </section>

          <section className="border-l-2 border-zinc-800 pl-4 py-1">
            <h2 className="text-zinc-200 font-bold uppercase tracking-wide mb-2 text-[13px]">
              03 // COOKIES & ENCRYPTION (কুকিজ এবং নিরাপত্তা)
            </h2>
            <p>
              আমাদের সিস্টেম ব্রাউজারের{" "}
              <code className="text-cyan-400 bg-zinc-900 px-1 py-0.5 rounded">
                localStorage
              </code>{" "}
              বা কুকিজ ব্যবহার করে আপনার ইউনিক ডিজিটাল সিগনেচার (JWT Token) সেভ
              রাখে, যাতে প্রতিবার আপনাকে লগইন করতে না হয়। সমস্ত ট্রাফিক SSL/TLS
              প্রোটোকল দ্বারা এনক্রিপ্ট করা থাকে।
            </p>
          </section>

          <section className="border-l-2 border-zinc-800 pl-4 py-1">
            <h2 className="text-zinc-200 font-bold uppercase tracking-wide mb-2 text-[13px]">
              04 // DATA PURGE & DELETION (ডাটা মুছে ফেলার অধিকার)
            </h2>
            <p>
              ইউজার চাইলে যেকোনো সময় তার ডাটা আমাদের প্ল্যাটফর্ম থেকে চিরতরে
              মুছে ফেলতে পারেন। ডাটা ডিলিট করার জন্য আপনার প্রোফাইল সেটিংসের
              "TERMINATE ACCOUNT" অপশন ব্যবহার করতে পারেন অথবা সরাসরি আমাদের নোড
              সার্ভার অ্যাডমিন প্যানেলে রিকোয়েস্ট পাঠাতে পারেন।
            </p>
          </section>
        </div>

        {/* ফুটার সিকিউরিটি ট্যাগ */}
        <div className="border-t border-zinc-800 pt-4 mt-6 flex justify-between items-center text-[9px] text-zinc-600 font-bold tracking-widest uppercase">
          <span>SECURE SEC_LEVEL_3 AUTH APPROVED</span>
          <span className="text-cyan-500/60">GEN-Z EXPORT</span>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
