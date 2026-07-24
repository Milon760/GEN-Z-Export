import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomeBanner = () => {
  // ডাটাবেজ ব্যাকএন্ড URL
  const API_URL = 'http://localhost:5000/api/banner';

  // ডাটাবেজ থেকে ডাটা আসার আগ পর্যন্ত বা ফেইল করলে ব্যাকআপ ডিফল্ট স্লাইড
  const defaultSlides = [
    {
      tagline: "Exclusive Summer Fest",
      title: "UP TO 50% OFF ON LUXURY APPARELS",
      description: "Upgrade your wardrobe with premium quality clothing. Crafted for comfort, styled for elegance.",
      buttonText: "Shop Collection",
      buttonLink: "/shop",
      bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
      badge: "LIMITED OFFER",
      isActive: true,
      bgColor: "#09090b",
      textColor: "#ffffff" // ডিফল্ট টেক্সট কালার
    }
  ];

  const [slides, setSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // ১. ডাটাবেজ থেকে স্লাইড ডাটা লোড করা (GET)
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data && res.data.success && res.data.slides && res.data.slides.length > 0) {
          const activeSlides = res.data.slides.filter(slide => slide.isActive !== false);

          if (activeSlides.length > 0) {
            setSlides(activeSlides);
          } else {
            setSlides(defaultSlides);
          }
        }
      } catch (err) {
        console.error("Error fetching banner data from database:", err);
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  // ২. অটো-প্লে হ্যান্ডলার
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

  if (loading) {
    return (
      <div className="w-full h-[500px] md:h-[600px] lg:h-[650px] bg-zinc-950 flex flex-col items-center justify-center text-[#C5A059] font-bold gap-3">
        <div className="w-8 h-8 border-4 border-[#C5A059]/20 border-t-[#C5A059] rounded-full animate-spin"></div>
        <span className="text-xs uppercase tracking-widest font-black">Loading Home Screen...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[650px] bg-zinc-950 overflow-hidden group">

      {/* 🖼️ ১. মেইন স্লাইডার ব্যানার ভিউ */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide._id || index}
            style={{ backgroundColor: slide.bgColor || '#09090b' }}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
          >
            {/* ডার্ক গ্রেডিয়েন্ট ওভারলে */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-transparent z-10" />

            {slide.bgImage && (
              <img
                src={slide.bgImage}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
              />
            )}

            {/* স্লাইড কন্টেন্ট এরিয়া */}
            <div className="absolute inset-0 z-20 flex items-center px-6 md:px-16 lg:px-24">
              {/* 🎨 এখানে পুরো কন্টেন্ট র‍্যাপারে ডাইনামিক textColor এবং fontFamily পুশ করা হয়েছে */}
              <div 
                style={{ color: slide.textColor || '#ffffff' }} 
                className={`max-w-xl md:max-w-2xl space-y-4 md:space-y-6 pt-8 text-left ${slide.fontFamily || ''}`}
              >

                <div className="flex items-center gap-3">
                  {slide.badge && (
                    <span className="bg-[#C5A059] text-zinc-950 text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                      {slide.badge}
                    </span>
                  )}
                  {slide.tagline && (
                    <p className="text-xs md:text-sm font-bold tracking-widest uppercase opacity-90">
                      {slide.tagline}
                    </p>
                  )}
                </div>

                {/* 🟢 text-white সরিয়ে ডাইনামিক কালার ইনহেরিট করানো হলো */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase">
                  {slide.title}
                </h1>

                {/* 🟢 text-zinc-300 সরিয়ে কিছুটা অপাসিটি দিয়ে কালার ব্যালেন্স করা হলো */}
                <p className="text-xs md:text-sm leading-relaxed max-w-lg font-medium opacity-80">
                  {slide.description}
                </p>

                <div className="pt-2">
                  <a
                    href={slide.buttonLink}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C5A059] hover:bg-[#b08e4f] text-zinc-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#C5A059]/10"
                  >
                    {slide.buttonText}
                  </a>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3.5 bg-zinc-900/60 hover:bg-[#C5A059] hover:text-zinc-950 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 hidden md:block border border-zinc-800"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3.5 bg-zinc-900/60 hover:bg-[#C5A059] hover:text-zinc-950 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 hidden md:block border border-zinc-800"
          >
            <FaChevronRight size={14} />
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-[#C5A059]" : "w-1.5 bg-zinc-500/50"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default HomeBanner;