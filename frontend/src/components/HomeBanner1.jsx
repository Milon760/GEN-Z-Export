import React, { useState, useEffect } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaEdit, 
  FaPlus, 
  FaTrash, 
  FaEye, 
  FaImage, 
  FaLink, 
  FaTag, 
  FaParagraph, 
  FaHeading 
} from 'react-icons/fa';

const HomeBanner = () => {
  // ডিফল্ট ডামি ডাটা (যদি লোড করার মতো আগের কোনো ডাটা লোকাল স্টোরেজে না থাকে)
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

  // ১. লোকাল স্টোরেজ থেকে ডাটা নিয়ে ইনিশিয়ালাইজ করা
  const [slides, setSlides] = useState(() => {
    const savedSlides = localStorage.getItem('luxury_banner_slides');
    return savedSlides ? JSON.parse(savedSlides) : defaultSlides;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // স্লাইডস পরিবর্তন হলেই অটোমেটিক লোকাল স্টোরেজে সেভ হয়ে যাবে
  useEffect(() => {
    localStorage.setItem('luxury_banner_slides', JSON.stringify(slides));
  }, [slides]);

  // ২. অটো-প্লে হ্যান্ডলার (এডমিন মুড অন থাকলে স্লাইড অটো চেঞ্জ হবে না যাতে কাজ করতে সুবিধা হয়)
  useEffect(() => {
    if (isAdminMode) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [slides.length, isAdminMode]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  /* ========================================================
     ⚙️ Admin Management Functions (অ্যাডমিন কন্ট্রোল মেকানিজম)
     ======================================================== */
  
  // নতুন স্লাইড যোগ করা
  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now(),
      tagline: "Special Discount Campaign",
      title: "YOUR NEW BRAND HEADING HERE",
      description: "Introduce your brand premium items and attract customers with direct catchy discount numbers.",
      buttonText: "Discover More",
      buttonLink: "/shop",
      bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
      badge: "HOT DEAL"
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    setCurrentSlide(updated.length - 1); // নতুন স্লাইডটিতে সরাসরি জাম্প করবে
  };

  // স্লাইড ডিলিট করা
  const handleDeleteSlide = () => {
    if (slides.length <= 1) {
      alert("কমপক্ষে একটি স্লাইড অবশ্যই থাকতে হবে!");
      return;
    }
    const filtered = slides.filter((_, idx) => idx !== currentSlide);
    setSlides(filtered);
    setCurrentSlide(0);
  };

  // লাইভ চেঞ্জ ডিটেকশন ও স্টেট আপডেট
  const handleInputChange = (e, key) => {
    const updatedSlides = slides.map((slide, idx) => {
      if (idx === currentSlide) {
        return { ...slide, [key]: e.target.value };
      }
      return slide;
    });
    setSlides(updatedSlides);
  };

  // ব্যানার ডাটা রিসেট করার অপশন (ডিফল্ট অবস্থায় ফিরিয়ে নিতে)
  const handleResetToDefault = () => {
    if (window.confirm("আপনি কি ব্যানারগুলো আগের মতো ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?")) {
      setSlides(defaultSlides);
      setCurrentSlide(0);
    }
  };

  return (
    <div className="relative w-full h-[550px] md:h-[650px] lg:h-[700px] bg-zinc-950 overflow-hidden group">
      
      {/* 👑 ১. এডমিন কন্ট্রোল বার (সবার উপরে ফ্লোটিং স্টাইলে থাকবে) */}
      <div className="absolute top-24 left-4 right-4 z-40 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* এডমিন বাটন ও অ্যাকশনস */}
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-xl transition-all duration-300 border ${
              isAdminMode 
                ? 'bg-rose-500 text-white border-rose-400' 
                : 'bg-zinc-900/90 text-[#C5A059] border-[#C5A059]/40 hover:bg-zinc-900 hover:border-[#C5A059]'
            }`}
          >
            {isAdminMode ? <FaEye size={12} /> : <FaEdit size={12} />}
            {isAdminMode ? "Exit Live Editor" : "Open Admin Panel"}
          </button>

          {isAdminMode && (
            <>
              <button 
                onClick={handleAddSlide}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900/90 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white text-emerald-400 text-xs font-bold rounded-xl shadow-xl transition-all"
              >
                <FaPlus size={10} /> Add Slide
              </button>
              <button 
                onClick={handleDeleteSlide}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900/90 border border-rose-500/50 hover:bg-rose-600 hover:text-white text-rose-400 text-xs font-bold rounded-xl shadow-xl transition-all"
              >
                <FaTrash size={10} /> Delete Current
              </button>
            </>
          )}
        </div>

        {/* রিসেট বাটন (শুধুমাত্র এডমিন মুডে দেখাবে) */}
        {isAdminMode && (
          <button 
            onClick={handleResetToDefault}
            className="pointer-events-auto px-3 py-2 bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white text-[10px] font-bold rounded-lg transition-all"
          >
            Reset to Default
          </button>
        )}
      </div>

      {/* 🖼️ ২. মেইন স্লাইডার ব্যানার */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
          >
            {/* ডার্ক গ্রেডিয়েন্ট মাস্ক (যাতে টেক্সটের রিডিবিলিটি সর্বোচ্চ থাকে) */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent z-10" />
            
            {/* ব্যাকগ্রাউন্ড পিকচার */}
            <img
              src={slide.bgImage}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* 📝 ব্যানার কন্টেন্ট এরিয়া */}
            <div className="absolute inset-0 z-20 flex items-center px-6 md:px-16 lg:px-24">
              <div className="max-w-xl md:max-w-2xl space-y-4 md:space-y-6 pt-16">
                
                {/* অফার ব্যাজ এবং ক্যাটাগরি */}
                <div className="flex items-center gap-3 animate-fade-in">
                  <span className="bg-[#C5A059] text-zinc-950 text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                    {slide.badge}
                  </span>
                  <p className="text-xs md:text-sm font-bold text-[#C5A059] tracking-widest uppercase">
                    {slide.tagline}
                  </p>
                </div>

                {/* মেইন অফার টাইটেল */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight uppercase">
                  {slide.title}
                </h1>

                {/* আকর্ষণীয় অফার টেক্সট ডেসক্রিপশন */}
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed max-w-lg font-medium">
                  {slide.description}
                </p>

                {/* কল টু অ্যাকশন বাটন */}
                <div className="pt-2">
                  <a
                    href={slide.buttonLink}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C5A059] hover:bg-[#b08e4f] text-zinc-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-[#C5A059]/10 active:scale-95 hover:-translate-y-0.5"
                  >
                    {slide.buttonText}
                  </a>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 🎮 ৩. নেভিগেশন স্লাইডার কন্ট্রোল অ্যারো (মোবাইলে হাইড থাকবে, মাউস হোভার করলে স্ক্রিনে ভেসে উঠবে) */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3.5 bg-zinc-900/60 hover:bg-[#C5A059] hover:text-zinc-950 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-zinc-800"
      >
        <FaChevronLeft size={14} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3.5 bg-zinc-900/60 hover:bg-[#C5A059] hover:text-zinc-950 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-zinc-800"
      >
        <FaChevronRight size={14} />
      </button>

      {/* 🔘 ৪. স্লাইডার ইন্ডিকেটর ডট্স */}
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

      {/* 📝 ৫. লাক্সারি লাইভ এডিটর উইন্ডো (এডমিন অ্যাক্টিভেট করার পর পপ-আপ হবে) */}
      {isAdminMode && (
        <div className="absolute bottom-20 right-4 left-4 md:left-auto md:w-[460px] z-40 bg-zinc-950/90 border border-[#C5A059]/30 p-5 rounded-2xl shadow-2xl backdrop-blur-lg space-y-3.5 text-left max-h-[380px] overflow-y-auto">
          
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Slide Customizer ({currentSlide + 1} / {slides.length})
            </h3>
            <span className="text-[10px] text-zinc-500 font-semibold bg-zinc-900 px-2.5 py-1 rounded">Local Auto-Save</span>
          </div>

          {/* ব্যাজ এবং ট্যাগলাইন এডিটর */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-400 font-bold flex items-center gap-1"><FaTag size={8} /> Badge Text</label>
              <input 
                type="text" 
                value={slides[currentSlide].badge}
                onChange={(e) => handleInputChange(e, 'badge')}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-400 font-bold flex items-center gap-1"><FaTag size={8} /> Tagline</label>
              <input 
                type="text" 
                value={slides[currentSlide].tagline}
                onChange={(e) => handleInputChange(e, 'tagline')}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* টাইটেল এডিটর */}
          <div className="space-y-1 text-xs">
            <label className="text-[10px] text-zinc-400 font-bold flex items-center gap-1"><FaHeading size={8} /> Heading Title</label>
            <input 
              type="text" 
              value={slides[currentSlide].title}
              onChange={(e) => handleInputChange(e, 'title')}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* ডেসক্রিপশন এডিটর */}
          <div className="space-y-1 text-xs">
            <label className="text-[10px] text-zinc-400 font-bold flex items-center gap-1"><FaParagraph size={8} /> Short Description</label>
            <textarea 
              rows="2"
              value={slides[currentSlide].description}
              onChange={(e) => handleInputChange(e, 'description')}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059] resize-none"
            ></textarea>
          </div>

          {/* বাটন টেক্সট ও লিংক এডিটর */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-400 font-bold flex items-center gap-1"><FaLink size={8} /> Button Text</label>
              <input 
                type="text" 
                value={slides[currentSlide].buttonText}
                onChange={(e) => handleInputChange(e, 'buttonText')}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-400 font-bold flex items-center gap-1"><FaLink size={8} /> Button Link</label>
              <input 
                type="text" 
                value={slides[currentSlide].buttonLink}
                onChange={(e) => handleInputChange(e, 'buttonLink')}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* ইমেজ এডিটর */}
          <div className="space-y-1 text-xs">
            <label className="text-[10px] text-zinc-400 font-bold flex items-center gap-1"><FaImage size={8} /> Background Image URL</label>
            <input 
              type="text" 
              value={slides[currentSlide].bgImage}
              onChange={(e) => handleInputChange(e, 'bgImage')}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default HomeBanner;