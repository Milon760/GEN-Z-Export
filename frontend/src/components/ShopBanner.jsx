import React from "react";

const ShopBanner = () => {
  return (
    <div className="relative w-full min-h-[280px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[420px] flex items-center bg-zinc-950 overflow-hidden rounded-3xl shadow-2xl border border-zinc-800/50">
      {/* 🖼️ ১. ব্যাকগ্রাউন্ড ইমেজ লেয়ার (স্মুথ পজিশনিং ও রেসপন্সিভ ফিট) */}
      <div className="absolute inset-0 w-full h-full">
        {/* ডার্ক গ্রেডিয়েন্ট ওভারলে - যা টেক্সটকে প্রিমিয়াম ও স্পষ্ট দেখায় */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 sm:via-zinc-950/70 to-transparent z-10" />

        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
          alt="Shop Premium Banner"
          className="w-full h-full object-cover object-right sm:object-center transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* 📝 ২. কন্টент লেয়ার (বড় ডিভাইসে উপরে প্যাডিং pt-8 lg:pt-12 যুক্ত ফ্লেক্সিবল লেআউট) */}
      <div className="relative z-20 w-full px-5 sm:px-10 lg:px-16 py-8 pt-8 md:pt-10 lg:pt-14 flex items-center">
        <div className="max-w-xl md:max-w-2xl space-y-3 sm:space-y-4 text-left">
          {/* ব্যাজ / ট্যাগলাইন */}
          <div className="flex items-center gap-2">
            <span className="bg-[#C5A059] text-zinc-950 text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-widest shadow-sm">
              PREMIUM STREET DROP
            </span>
          </div>

          {/* মেইন টাইটেল */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-none tracking-tight uppercase">
            THE HUB <span className="text-[#C5A059]">CATALOG.</span>
          </h1>

          {/* ডেসক্রিপশন */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xs sm:max-w-md font-medium drop-shadow-xs">
            Explore custom tailored structured apparel line sequences built for
            urban elite terminal aesthetics. Upgrade your identity with our
            premium clothing drops.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopBanner;
