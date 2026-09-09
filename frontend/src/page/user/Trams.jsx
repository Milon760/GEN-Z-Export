import React from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] mt-28 text-zinc-300 font-mono flex flex-col items-center p-4 sm:p-8 antialiased">
      {/* মেইন কন্টেইনার */}
      <div className="w-full max-w-3xl border border-zinc-800 bg-[#0c0c0e]/90 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* টপ সাইবারপাঙ্ক লাইন */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

        {/* হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-6 mb-6 gap-4">
          <div>
            <h1 className="text-sm font-black tracking-[0.25em] uppercase text-amber-500">
              TERMS OF SERVICE CORE
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">
              DOCUMENT ID: TOS-GENZ-2026 // COMPLIANCE ACTIVE
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 border border-zinc-800 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-300 active:scale-95"
          >
            RETURN_TERMINAL
          </button>
        </div>

        {/* টার্মস টেক্সট এরিয়া */}
        <div className="space-y-6 text-[12px] leading-relaxed tracking-wide text-zinc-400 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <section className="border-l-2 border-amber-500/30 pl-4 py-1">
            <h2 className="text-zinc-200 font-bold uppercase tracking-wide mb-2 text-[13px]">
              01 // TERMINAL REGISTRATION (অ্যাকাউন্ট ব্যবহারের নিয়ম)
            </h2>
            <p>
              GEN-Z Export ই-কমার্স প্ল্যাটফর্মে কেনাকাটা বা ব্রাউজ করতে সোশ্যাল
              মিডিয়া (গুগল/ফেসবুক) অথবা ম্যানুয়াল ফর্ম ব্যবহার করে সঠিক তথ্য
              দিয়ে অ্যাকাউন্ট ও সেশন তৈরি করতে হবে। একজনের অ্যাকাউন্ট অন্য কাউকে
              ট্রান্সফার করা বা ফেক ক্রেডেনশিয়াল ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।
            </p>
          </section>

          <section className="border-l-2 border-zinc-800 pl-4 py-1">
            <h2 className="text-zinc-200 font-bold uppercase tracking-wide mb-2 text-[13px]">
              02 // TRANSACTION PROTOCOL (অর্ডার এবং পেমেন্ট পলিসি)
            </h2>
            <p>
              আমাদের সাইটে প্রদর্শিত সকল প্রোডাক্টের দাম এবং স্টক যেকোনো সময়
              পরিবর্তিত হতে পারে। আপনি অর্ডার প্লে করার পর গেটওয়েতে সঠিক
              ট্রানজিশন ডাটা জেনারেট হওয়ার পরেই কেবল অর্ডারটি চূড়ান্ত বলে গণ্য
              হবে। কোনো সিস্টেম বাগ বা টেকনিক্যাল এররের কারণে ভুল দাম দেখালে
              অর্ডার বাতিল করার ক্ষমতা এডমিন প্যানেল সংরক্ষণ করে।
            </p>
          </section>

          <section className="border-l-2 border-zinc-800 pl-4 py-1">
            <h2 className="text-zinc-200 font-bold uppercase tracking-wide mb-2 text-[13px]">
              03 // LIABILITY LIMITATION (সীমাবদ্ধতা ও দায়বদ্ধতা)
            </h2>
            <p>
              আমরা সবসময় আপনার সেশন ও ডাটাবেজ সিকিউর রাখার সর্বোচ্চ চেষ্টা করি।
              তবে ইন্টারনেট গেটওয়ে বা গুগল/মেটার সার্ভার ডাউন থাকার কারণে
              সাময়িকভাবে লগইন বা ট্রানজিশন ফেইল হলে GEN-Z Export টিম কোনো আর্থিক
              বা পরোক্ষ ক্ষতির দায় বহন করবে না।
            </p>
          </section>

          <section className="border-l-2 border-zinc-800 pl-4 py-1">
            <h2 className="text-zinc-200 font-bold uppercase tracking-wide mb-2 text-[13px]">
              04 // POLICY AMENDMENTS (শর্তাবলী পরিবর্তন)
            </h2>
            <p>
              প্রজেক্ট ডেভেলপমেন্ট বা আইনি কারণে এই শর্তাবলী যেকোনো সময় নোটিশ
              ছাড়াই আপডেট হতে পারে। আপডেটের পর আপনি সাইট ব্যবহার অব্যাহত রাখলে
              ধরে নেওয়া হবে আপনি নতুন শর্তাবলীতে সম্মতি দিয়েছেন।
            </p>
          </section>
        </div>

        {/* ফুটার সিকিউরিটি ট্যাগ */}
        <div className="border-t border-zinc-800 pt-4 mt-6 flex justify-between items-center text-[9px] text-zinc-600 font-bold tracking-widest uppercase">
          <span>OPERATIONAL LEGAL COMPLIANCE GRANTED</span>
          <span className="text-amber-500/60">GEN-Z EXPORT</span>
        </div>
      </div>
    </div>
  );
};

export default Terms;
