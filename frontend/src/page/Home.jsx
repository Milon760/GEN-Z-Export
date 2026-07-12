import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRotateCcw, FiDollarSign } from 'react-icons/fi';
import { ProductContext } from '../context/ProductContext';


const Home = () => {
  const { products } = useContext(ProductContext);

  // প্রথম ৪টি প্রোডাক্টকে ফিচারড হিসেবে দেখানোর জন্য
  const featuredProducts = products ? products.slice(0, 4) : [];

  const categories = [
    { name: 'Elite Panjabi', path: '/shop/panjabi', image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop', tag: 'EID DROP' },
    { name: 'Resort Shirts', path: '/shop/shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', tag: 'NEW' },
    { name: 'Cyber Tees', path: '/shop/tshirt', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop', tag: 'HOT' },
    { name: 'Cargo Pants', path: '/shop/pant', image: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop', tag: 'STREET' }
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-950 text-neutral-900 dark:text-neutral-100 min-h-screen pt-24 font-sans selection:bg-[#C5A059] selection:text-black">

      {/* ১. আল্ট্রা-প্রিমিয়াম হিরো সেকশন (Hero Section) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
        <div className="relative rounded-[32px] overflow-hidden bg-zinc-900 text-white min-h-[60vh] sm:min-h-[70vh] flex items-center shadow-2xl">
          {/* ব্যাকগ্রাউন্ড ওভারলে ইমেজ/ডিজাইন */}
          <div className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1600&auto=format&fit=crop')` }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

          {/* হিরো কন্টেন্ট */}
          <div className="relative z-10 max-w-2xl pl-6 sm:pl-12 md:pl-20 py-12 flex flex-col items-start text-left">
            <span className="bg-cyan-600 dark:bg-[#C5A059] text-white dark:text-black font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-4 animate-pulse">
              CYBERPUNK DROP 2026
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-none mb-6">
              FUTURE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-[#C5A059] dark:to-amber-200">
                STREETWEAR
              </span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base font-medium max-w-md mb-8 leading-relaxed">
              Elevate your daily fit with our high-grade premium materials. Designed for the next generation.
            </p>
            <Link to="/shop" className="group flex items-center gap-3 bg-white text-zinc-950 dark:bg-[#C5A059] dark:text-zinc-950 font-black text-xs sm:text-sm tracking-widest uppercase px-6 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-cyan-500 hover:text-white dark:hover:bg-white dark:hover:text-black">
              Explore Drops <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ২. ট্রাস্ট ফ্যাক্টর / ফিচারস বার */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-neutral-50 dark:bg-zinc-900/40 border border-neutral-100 dark:border-white/5 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-xl"><FiTruck size={20} /></div>
            <div><h4 className="font-bold text-sm">Nationwide Delivery</h4><p className="text-xs text-neutral-500">Fast & secured cargo</p></div>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-amber-100 dark:bg-[#C5A059]/10 text-amber-600 dark:text-[#C5A059] rounded-xl"><FiShield size={20} /></div>
            <div><h4 className="font-bold text-sm">Premium Quality</h4><p className="text-xs text-neutral-500">100% Export grade</p></div>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-xl"><FiRotateCcw size={20} /></div>
            <div><h4 className="font-bold text-sm">7-Day Exchange</h4><p className="text-xs text-neutral-500">Hassle-free return policy</p></div>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl"><FiDollarSign size={20} /></div>
            <div><h4 className="font-bold text-sm">Secure Checkout</h4><p className="text-xs text-neutral-500">Bkash, Nagad or Cards</p></div>
          </div>
        </div>
      </section>

      {/* ৩. ক্যাটাগরি গ্রিড (Shop By Category) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-left mb-8">
          <span className="text-[10px] font-black tracking-widest text-cyan-600 dark:text-[#C5A059] uppercase">COLLECTIONS</span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Shop By Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <Link key={idx} to={cat.path} className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm block">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[8px] sm:text-[9px] font-black tracking-wider text-white px-2 py-0.5 rounded border border-white/10">
                {cat.tag}
              </span>

              <div className="absolute bottom-4 left-4 right-4 text-left flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm sm:text-base text-white tracking-tight">{cat.name}</h3>
                  <span className="text-[10px] text-gray-300 font-medium">Browse Collection</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-cyan-600 dark:group-hover:bg-[#C5A059] dark:group-hover:text-zinc-950 transition-colors">
                  <FiArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ৪. ফিচারড প্রোডাক্টস (Featured Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div className="text-left">
            <span className="text-[10px] font-black tracking-widest text-cyan-600 dark:text-[#C5A059] uppercase">CURATED DROPS</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Trending Right Now</h2>
          </div>
          <Link to="/shop" className="text-xs font-black tracking-widest uppercase text-cyan-600 dark:text-[#C5A059] flex items-center gap-2 hover:underline">
            View All Shop <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div key={product._id} className="group flex flex-col text-left">
                <div className="relative aspect-[3/4] bg-neutral-100 dark:bg-zinc-900 rounded-2xl overflow-hidden mb-3">
                  <img src={product.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop"} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <button className="absolute bottom-3 left-3 right-3 bg-zinc-950 text-white text-xs font-bold py-2.5 rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-cyan-600 dark:hover:bg-[#C5A059] dark:hover:text-black">
                    Quick Add +
                  </button>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-neutral-800 dark:text-white truncate">{product.title}</h3>
                <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{product.description}</p>
                <span className="font-black text-sm text-cyan-600 dark:text-[#C5A059] mt-1">${product.price}</span>
              </div>
            ))
          ) : (
            // যদি ডাটাবেজে প্রোডাক্ট না থাকে, ডামি কঙ্কাল বা প্লেসহোল্ডার দেখানোর জন্য
            [1, 2, 3, 4].map((n) => (
              <div key={n} className="flex flex-col text-left animate-pulse">
                <div className="aspect-[3/4] bg-neutral-200 dark:bg-zinc-900 rounded-2xl mb-3"></div>
                <div className="h-4 bg-neutral-200 dark:bg-zinc-900 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-neutral-200 dark:bg-zinc-900 rounded w-1/2"></div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ৫. মিনিমাল প্রফেশনাল ফুটার (Premium Footer) */}
      <footer className="mt-20 border-t border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-black text-lg tracking-wider">GEN-Z</span>
              <span className="text-[10px] font-bold text-cyan-600 dark:text-[#C5A059] tracking-wider">EXPORT</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">© 2026 GEN-Z Export. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-neutral-500 dark:text-neutral-400">
            <Link to="/shop" className="hover:text-neutral-900 dark:hover:text-white">Shop</Link>
            <Link to="/" className="hover:text-neutral-900 dark:hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-neutral-900 dark:hover:text-white">Terms of Cargo</Link>
            <Link to="/" className="hover:text-neutral-900 dark:hover:text-white">Contact Node</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;