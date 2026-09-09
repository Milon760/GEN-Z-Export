import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiGrid, FiTag } from "react-icons/fi";

const CategoryHeader = ({ categoryName = "Streetwear", totalProducts = 0 }) => {
  return (
    <div className="relative mb-8 w-full p-6 sm:p-8 md:p-12 bg-neutral-950 border border-neutral-800/80 shadow-2xl overflow-hidden group">
      {/* 🌌 ১. ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট ও গ্লো ইফেক্ট */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-[#14120e] z-0" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C5A059]/20 transition-all duration-700" />

      {/* 🏷️ ২. ওয়াটারমার্ক ক্যাটাগরি টেক্সট (Safe Overflow Handling) */}
      <div className="absolute -right-2 -bottom-8 opacity-5 sm:opacity-10 text-7xl sm:text-9xl font-black uppercase tracking-tighter select-none text-[#C5A059] pointer-events-none transition-transform duration-500 group-hover:scale-105">
        {categoryName}
      </div>

      {/* 📝 ৩. মূল কন্টেন্ট লেয়ার */}
      <div className="relative z-10 space-y-3 sm:space-y-4 text-left">
        {/* ব্রেডক্রাম্ব / ব্যাক নেভিগেশন */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-neutral-400 uppercase">
          <Link
            to="/shop"
            className="hover:text-[#C5A059] transition-colors flex items-center gap-1"
          >
            <FiGrid size={12} /> Shop
          </Link>
          <FiChevronRight size={10} className="text-neutral-600" />
          <span className="text-[#C5A059]">{categoryName}</span>
        </div>

        {/* টাইটেল এবং কাউন্টার ব্যাজ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            {categoryName} <span className="text-[#C5A059]">Edition</span>
          </h1>

          {/* প্রোডাক্ট কাউন্ট ব্যাজ (Optional) */}
          {totalProducts > 0 && (
            <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-[10px] sm:text-xs font-semibold text-neutral-300 backdrop-blur-xs">
              <FiTag className="text-[#C5A059]" size={12} />
              <span>{totalProducts} Items</span>
            </div>
          )}
        </div>

        {/* সাবটাইটেল / ডেসক্রিপশন */}
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed font-medium">
          Explore our premium selection of{" "}
          <span className="text-neutral-200 font-semibold">{categoryName}</span>{" "}
          crafted with street culture and elegance. Designed for high-end
          comfort.
        </p>
      </div>
    </div>
  );
};

export default CategoryHeader;
