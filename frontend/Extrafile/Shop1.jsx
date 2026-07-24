import React, { useState, useContext } from 'react';
import { ProductContext } from '../src/context/ProductContext';
import ProductsFilter from '../src/helper/ProductsFilter';
import { FiShoppingBag, FiHeart, FiStar, FiArrowRight } from 'react-icons/fi';

const Shop = () => {
  const { products = [] } = useContext(ProductContext);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(5000);
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();
      const currentPrice = Number(product.price) || 0;
      const matchesPrice = currentPrice <= priceRange;
      return matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      if (sortBy === 'price-low-high') return priceA - priceB;
      if (sortBy === 'price-high-low') return priceB - priceA;
      return 0;
    });

  return (
    <div className="bg-gray-50 dark:bg-neutral-900 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500 select-none antialiased">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ==================== PREMIUM BRAND BANNER ==================== */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-neutral-950 dark:bg-neutral-950/40 border border-neutral-800/40 shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 lg:p-16 transition-all duration-500 group">
          
          {/* Decorative Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/4 -translate-y-1/4 group-hover:bg-[#C5A059]/15 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

          {/* Left Block: Core Typography Data */}
          <div className="relative z-10 text-left space-y-4 max-w-xl md:w-3/5">
            <div className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.2em] text-[#C5A059] uppercase">
                Summer Cyber Drop 2026
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase">
              Elevate Your <span className="text-[#C5A059]">Street Identity</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-sm leading-relaxed">
              Engineered premium garments designed for the modern generation. Experiencing custom-tailored fabrics coupled with absolute aesthetic perfection.
            </p>
            
            <div className="pt-2">
              <button className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#C5A059]/90 text-neutral-950 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 transform active:scale-95 shadow-[0_4px_20px_rgba(197,160,89,0.25)]">
                Explore Limited Cuts 
                <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Block: Minimalist Adaptive Visual Matrix Accent */}
          <div className="relative z-10 md:w-2/5 mt-8 md:mt-0 w-full flex justify-center md:justify-end">
            <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm p-4 flex flex-col justify-between shadow-2xl group-hover:border-[#C5A059]/30 transition-all duration-500">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">
                  GZ / SPEC-04
                </span>
                <span className="text-[10px] font-black bg-red-500 text-white px-2 py-0.5 rounded">
                  NEW
                </span>
              </div>
              
              {/* Product Context Spec Callout */}
              <div className="text-left space-y-1">
                <div className="text-xs font-bold text-neutral-400">Featured Drop</div>
                <div className="text-sm font-black text-white tracking-wide uppercase line-clamp-1">Elite Premium Resort</div>
                <div className="text-xs font-black text-[#C5A059]">৳1,850</div>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Filter Interface Block */}
        <ProductsFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Product Grid Dynamic Layouts */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 rounded-3xl border border-dashed border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/40">
            <span className="text-3xl">📦</span>
            <h3 className="mt-4 text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider">
              No Drops Found
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Try adjustments to your selected parameters or pricing filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const originalPrice = Number(product.original_price) || Number(product.price) || 0;
              const activePrice = Number(product.price) || 0;
              const hasDiscount = originalPrice > activePrice;
              const discountPercent = hasDiscount ? Math.round(((originalPrice - activePrice) / originalPrice) * 100) : 0;
              const imgSource = product.image_url || product.image || 'https://via.placeholder.com/400';

              return (
                <div
                  key={product._id || product.id}
                  className="bg-white dark:bg-neutral-950 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.01)] border border-gray-100 dark:border-neutral-900 transition-all duration-500 flex flex-col group relative"
                >
                  <div className="relative bg-neutral-100 dark:bg-neutral-900 pt-[100%] overflow-hidden">
                    <img
                      src={imgSource}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    {hasDiscount && discountPercent > 0 && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-sm">
                        {discountPercent}% OFF
                      </span>
                    )}
                    <span className="absolute top-4 right-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm text-neutral-800 dark:text-neutral-200 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <FiStar className="text-[#C5A059] fill-current" size={10} />
                      {product.rating || '4.5'}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-grow text-left">
                    <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.15em] mb-1">
                      {product.category || 'Streetwear'}
                    </span>
                    <h2 className="text-neutral-800 dark:text-neutral-200 font-bold text-sm tracking-wide line-clamp-1 group-hover:text-[#C5A059] transition-colors duration-300">
                      {product.name}
                    </h2>
                    <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-1.5 line-clamp-2 leading-relaxed flex-grow">
                      {product.description || 'Premium material configurations engineered for performance comfort.'}
                    </p>

                    <div className="flex items-baseline gap-2 mt-4 pt-3 border-t border-neutral-50 dark:border-neutral-900">
                      <span className="text-lg font-black text-neutral-900 dark:text-white tracking-tight">
                        ৳{activePrice.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-600 line-through">
                          ৳{originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <button className="flex-grow bg-neutral-950 hover:bg-neutral-900 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/90 text-white dark:text-neutral-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all duration-300 flex justify-center items-center gap-2 active:scale-95">
                        <FiShoppingBag size={14} />
                        Add to Cart
                      </button>
                      <button className="p-3.5 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800/70 border border-neutral-200/50 dark:border-neutral-800/50 text-neutral-600 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all duration-300 active:scale-95">
                        <FiHeart size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;