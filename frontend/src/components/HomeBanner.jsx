import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// এই স্লাইডস ডাটা আপনি পরবর্তীতে প্রোডিউসার বা Context/API (Axios) এর মাধ্যমে ড্যাশবোর্ড থেকে পাস করতে পারবেন
const HomeBanner = ({ slidesData }) => {
  // ড্যাশবোর্ড থেকে ডাটা না আসলে ডিফল্ট ডাটা শো করবে
  const defaultSlides = [
    {
      id: 1,
      tagline: "Exclusive Summer Fest",
      title: "UP TO 50% OFF ON LUXURY APPARELS",
      description: "Upgrade your wardrobe with premium quality clothing. Crafted for comfort, styled for elegance.",
      buttonText: "Shop Collection",
      buttonLink: "/shop",
      bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
      badge: "LIMITED OFFER"
    },
    {
      id: 2,
      tagline: "New Arrivals",
      title: "ELEVATE YOUR EVERYDAY CASUAL LOOKS",
      description: "Explore our latest denim collection. Designed to keep you confident and comfortable all day.",
      buttonText: "Explore Now",
      buttonLink: "/category/denim",
      bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
      badge: "NEW TREND"
    }
  ];

  const slides = slidesData || defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);

  // অটো-প্লে মেকানিজম (প্রতি ৬ সেকেন্ডে ব্যানার চেঞ্জ হবে)
  useEffect(() => {
    if (slides.length <= 1) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  if (!slides || slides.length === 0) return null;

  return (
    // 🛠️ হাইট ফিক্স: মোবাইলেও কন্টেন্ট অনুযায়ী ডাইনামিক হাইট সেট হবে (min-h-[70vh] থেকে ল্যাপটপে min-h-[85vh])
    <div className="relative w-full min-h-[45vh] sm:min-h-[55vh] lg:min-h-[60vh] flex items-center bg-zinc-950 overflow-hidden group">
      
      {/* 🖼️ ১. ব্যাকগ্রাউন্ড ইমেজেস এবং স্লাইডার অ্যানিমেশন */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
          >
            {/* ডার্ক গ্রেডিয়েন্ট ওভারলে যাতে মোবাইলেও টেক্সট স্পষ্টভাবে পঠিত হয় */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 sm:via-zinc-950/50 to-transparent z-10" />
            
            {/* ব্যাকগ্রাউন্ড পিকচার */}
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* 📝 ২. কন্টেন্ট লেয়ার (১০০% রেসপন্সিভ টেক্সট এবং ডাইনামিক প্যাডিং ফিক্স) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 flex items-center">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6 text-left">
          
          {/* ব্যাজ এবং ট্যাগলাইন */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="bg-[#C5A059] text-zinc-950 text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md">
              {slides[currentSlide].badge}
            </span>
            <p className="text-[11px] sm:text-xs font-bold text-[#C5A059] tracking-widest uppercase">
              {slides[currentSlide].tagline}
            </p>
          </div>

          {/* মেইন অফার টাইটেল (মোবাইলের জন্য টেক্সট রেসপন্সিভ সাইজিং ফিক্স) */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight uppercase break-words drop-shadow-md">
            {slides[currentSlide].title}
          </h1>

          {/* সাব-ডেসক্রিপশন */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg font-medium drop-shadow">
            {slides[currentSlide].description}
          </p>

          {/* অ্যাকশন বাটন */}
          <div className="pt-2 sm:pt-4">
            <a
              href={slides[currentSlide].buttonLink}
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-[#C5A059] hover:bg-[#b08e4f] text-zinc-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#C5A059]/10 active:scale-95 hover:-translate-y-0.5"
            >
              {slides[currentSlide].buttonText}
            </a>
          </div>

        </div>
      </div>

      {/* 🎮 ৩. স্লাইডার নেভিগেশন কন্ট্রোল অ্যারো (মোবাইলে হাইড থাকবে, ল্যাপটপে মাউস আনলে স্মুথলি দেখাবে) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-zinc-900/40 hover:bg-[#C5A059] hover:text-zinc-950 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-zinc-800/50 backdrop-blur-sm"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 bg-zinc-900/40 hover:bg-[#C5A059] hover:text-zinc-950 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-zinc-800/50 backdrop-blur-sm"
          >
            <FaChevronRight size={14} />
          </button>
        </>
      )}

      {/* 🔘 ৪. স্লাইডার ইন্ডিকেটর ডট্স */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-[#C5A059]" : "w-1.5 bg-zinc-500/40"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default HomeBanner;