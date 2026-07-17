import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext'; // পাথ ঠিক আছে
import { FiSearch, FiSliders, FiEye, FiShoppingCart, FiChevronDown, FiX } from 'react-icons/fi';
import ShopBanner from '../components/ShopBanner';

const Shop = () => {
  // 💡 ম্যাজিক লাইন: কন্টেক্সট থেকে 'setSearchOuery' (O দিয়ে) নিয়ে সেটিকে 'setSearchQuery' (Q দিয়ে) হিসেবে অ্যাসাইন করা হলো।
  // এর ফলে ইনপুটে টাইপ করলে এখন সরাসরি আপনার কন্টেক্সটের স্টেট আপডেট হবে!
  const { allProduct = [], searchQuery = '', setSearchOuery: setSearchQuery } = useContext(ProductContext);

  // Core Filtering States Configuration
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'price-low' | 'price-high' | 'rating'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Dynamic Unique Categories Mapping
  const categories = useMemo(() => {
    const allCats = allProduct.map(p => p.category).filter(Boolean);
    return ['all', ...new Set(allCats)];
  }, [allProduct]);

  // Dynamic Unique Sizes Mapping
  const sizes = useMemo(() => {
    const allSizes = allProduct.flatMap(p => p.sizes || []);
    return ['all', ...new Set(allSizes)];
  }, [allProduct]);

  // Combined Search, Category Filtering, and Sorting Computation
  const filteredProducts = useMemo(() => {
    let result = [...allProduct];

    // 1. Live Context Search Query Validation
    if (searchQuery.trim() !== '') {
      result = result.filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Target Category Context Filter Mapping
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // 3. Array Size Grid Matching Validation
    if (selectedSize !== 'all') {
      result = result.filter(product => product.sizes?.includes(selectedSize));
    }

    // 4. Multi-Condition Pricing Sorting Matrix
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [allProduct, searchQuery, selectedCategory, selectedSize, sortBy]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        <ShopBanner />

        {/* ================= CONTROLS ACTION UTILITY SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-neutral-200/60 dark:border-neutral-800/60 pb-6">
          
          {/* 🔍 Dynamic Search Input with focus animations & clear button */}
          <div className="md:col-span-4 relative group">
            <FiSearch 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#C5A059] group-focus-within:scale-110 transition-all duration-300" 
              size={16} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // এটি এখন পারফেক্টলি টাইপ নিবে!
              placeholder="Search products..."
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl pl-11 pr-10 py-3 text-xs font-bold tracking-wide transition-all duration-300 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 focus:pl-12"
            />
            {/* সার্চ করার সময় একটা ক্লিয়ার (X) বাটন দেখা যাবে */}
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-rose-500 transition-colors duration-200"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* Filtering Dropdowns Layout Grid (Desktop Control Frame) */}
          <div className="hidden md:flex md:col-span-8 justify-end gap-3 text-left">
            {/* Category Dropdown Selector */}
            <div className="relative group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-4 pr-10 py-3 text-xs font-black uppercase tracking-wider cursor-pointer focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-hover:text-[#C5A059] transition-colors" size={12} />
            </div>

            {/* Sizes Dropdown Selector */}
            <div className="relative group">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="appearance-none bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-4 pr-10 py-3 text-xs font-black uppercase tracking-wider cursor-pointer focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300"
              >
                {sizes.map(sz => (
                  <option key={sz} value={sz}>{sz === 'all' ? 'All Sizes' : `Size: ${sz}`}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-hover:text-[#C5A059] transition-colors" size={12} />
            </div>

            {/* Pricing Matrix Sorter Tool */}
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-4 pr-10 py-3 text-xs font-black uppercase tracking-wider cursor-pointer focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300"
              >
                <option value="default">Default Mappings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-hover:text-[#C5A059] transition-colors" size={12} />
            </div>
          </div>

          {/* Mobile Filter Action Trigger Switch Toggle Button */}
          <div className="md:hidden flex gap-2 w-full">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl py-3 text-xs font-black uppercase tracking-wider active:scale-95 transition-all duration-200"
            >
              <FiSliders size={14} /> Filters Matrix
            </button>
          </div>
        </div>

        {/* ================= EMPTY SEARCH REJECTION FALLBACK INTERFACE ================= */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center space-y-3 animate-[fadeIn_0.3s_ease-out]">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <FiX size={20} />
            </div>
            <h3 className="font-black uppercase tracking-tight text-base sm:text-lg">No Products Found</h3>
            <p className="text-xs text-neutral-400 font-medium max-w-xs mx-auto leading-relaxed">
              We couldn't find any products matching your search criteria. Try adjusting your parameters.
            </p>
          </div>
        )}

        {/* ================= PRIMARY CATALOG STREAM GRID CANVAS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-left">
          {filteredProducts.map((product) => {
            const hasDiscount = product.original_price > product.price;
            const discountPercentage = hasDiscount
              ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
              : 0;

            return (
              <div 
                key={product._id || product.id}
                className="group bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/80 rounded-3xl p-3.5 space-y-4 hover:border-[#C5A059]/40 dark:hover:border-[#C5A059]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 relative flex flex-col justify-between"
              >
                <div>
                  {/* Product Ambient Image Component Frame Layout */}
                  <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-200/30 dark:border-neutral-800/30">
                    
                    {/* Floating Action Badges */}
                    {hasDiscount && (
                      <span className="absolute top-3 left-3 z-10 px-2 py-1 bg-rose-500 text-white font-black text-[9px] tracking-widest uppercase rounded-lg shadow-sm">
                        -{discountPercentage}% DROP
                      </span>
                    )}
                    {product.stock <= 0 && (
                      <span className="absolute inset-0 z-10 bg-neutral-950/40 backdrop-blur-[2px] text-white font-black text-xs tracking-widest uppercase flex items-center justify-center">
                        OUT OF STOCK
                      </span>
                    )}

                    {/* Image Click Area - Redirects to Details page */}
                    <Link to={`/shop/${product.id || product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Action Overlay Controls (Separated from root Link to prevent click conflicts) */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
                      <Link 
                        to={`/shop/${product.id || product._id}`}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-md border border-neutral-200/40 dark:border-neutral-800/60 flex items-center justify-center hover:text-[#C5A059] dark:hover:text-[#C5A059] transition-colors"
                      >
                        <FiEye size={15} />
                      </Link>
                      <button 
                        disabled={product.stock <= 0}
                        className="w-10 h-10 rounded-xl bg-[#C5A059] text-neutral-950 shadow-md flex items-center justify-center hover:bg-[#C5A059]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer"
                      >
                        <FiShoppingCart size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Typography Product Details Meta Group Layer */}
                  <div className="space-y-1.5 px-1 mt-4">
                    <div className="flex items-center justify-between text-[10px] font-black tracking-widest text-[#C5A059] uppercase">
                      <span>{product.category}</span>
                      <span className="text-neutral-400 dark:text-neutral-500 font-bold">⭐ {product.rating || '4.5'}</span>
                    </div>

                    <Link to={`/shop/${product.id || product._id}`}>
                      <h3 className="font-black uppercase text-xs sm:text-sm tracking-tight text-neutral-900 dark:text-white line-clamp-1 group-hover:text-[#C5A059] transition-colors duration-300">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium line-clamp-1">
                      {product.description || 'Premium street culture wear compilation.'}
                    </p>
                  </div>
                </div>

                {/* Pricing Infrastructure Calculation Node */}
                <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-baseline justify-between px-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-black text-sm sm:text-base text-neutral-900 dark:text-white">
                      {product.price} {product.currency || 'BDT'}
                    </span>
                    {hasDiscount && (
                      <span className="font-bold text-xs text-neutral-400 dark:text-neutral-500 line-through">
                        {product.original_price}
                      </span>
                    )}
                  </div>

                  <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase">
                    Stock: {product.stock}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ================= MOBILE FILTERS INTERACTIVE OVERLAY SIDEBAR ================= */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end bg-neutral-950/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-full max-w-xs bg-white dark:bg-neutral-900 h-full p-6 space-y-6 flex flex-col shadow-2xl overflow-y-auto text-left animate-[slideIn_0.3s_ease-out]">

            {/* Mobile Header Menu */}
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <h3 className="font-black uppercase tracking-wider text-sm flex items-center gap-2">
                <FiSliders size={14} /> Filter Settings
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:text-rose-500 transition-colors"
              >
                <FiX size={14} />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Categories Matrix</label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${selectedCategory === cat
                      ? 'bg-[#C5A059] border-[#C5A059] text-neutral-950'
                      : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Sizes Configuration</label>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-2 min-w-[40px] rounded-xl text-xs font-black uppercase transition-all border flex items-center justify-center ${selectedSize === sz
                      ? 'bg-[#C5A059] border-[#C5A059] text-neutral-950'
                      : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {sz === 'all' ? 'All' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorter */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Sort Parameters</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3.5 text-xs font-bold transition-all focus:outline-none focus:border-[#C5A059]"
              >
                <option value="default">Default Mappings</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Complete Reset Button */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSize('all');
                setSortBy('default');
                setSearchQuery('');
                setShowMobileFilters(false);
              }}
              className="w-full bg-neutral-950 hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all mt-auto"
            >
              Reset Filters
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;