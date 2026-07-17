import React from 'react';

const ShopBanner = () => {
    return (
        <div className="relative w-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex items-center bg-zinc-950 overflow-hidden rounded-3xl border border-zinc-900 shadow-2xl my-6">

            {/* 🖼️ ১. ব্যাকগ্রাউন্ড ইমেজ লেয়ার (আপনার স্টোরের সাথে মানানসই থিম) */}
            <div className="absolute inset-0 w-full h-full">
                {/* ডার্ক গ্রেডিয়েন্ট ওভারলে - যাতে টেক্সট একদম ক্লিয়ার ও ক্রিস্পি বোঝানো যায় */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 sm:via-zinc-950/60 to-zinc-950/30 z-10" />

                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
                    alt="Shop Premium Banner"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
            </div>

            {/* 📝 ২. কন্টেন্ট লেয়ার (১০০% রেসপন্সিভ ও সেন্টারেড) */}
            <div className="relative z-20 w-full px-6 sm:px-12 lg:px-16 py-8 flex items-center">
                <div className="max-w-xl md:max-w-2xl space-y-3 sm:space-y-4 text-left">

                    {/* ছোট ব্যাজ বা ট্যাগলাইন */}
                    <div className="flex items-center gap-2">
                        <span className="bg-[#C5A059] text-zinc-950 text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest shadow-sm">
                            PREMIUM STREET DROP
                        </span>
                    </div>

                    {/* মেইন হেডার টাইটেল */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight uppercase">
                        THE HUB <span className="text-[#C5A059]">CATALOG.</span>
                    </h1>

                    {/* ডেসক্রিপশন */}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md font-medium drop-shadow-sm">
                        Explore custom tailored structured apparel line sequences built for urban elite terminal aesthetics. Upgrade your identity with our premium clothing drops.
                    </p>

                </div>
            </div>

        </div>
    );
};

export default ShopBanner;