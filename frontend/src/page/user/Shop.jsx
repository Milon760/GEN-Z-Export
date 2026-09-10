import { useState, useMemo } from "react";

import { useProducts } from "../../context/ProductContext"; // পাথ ঠিক আছে
import { FiSearch, FiSliders, FiChevronDown, FiX } from "react-icons/fi";
import ShopBanner from "../../components/ShopBanner";

import ProductCard from "./ProductCart";
import CustomerChat from "../../components/CustomerChatbot";

const Shop = () => {
  const {
    allProduct = [],
    searchQuery = "",
    setSearchOuery: setSearchQuery,
  } = useProducts();

  // Core Filtering States Configuration
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [sortBy, setSortBy] = useState("default"); // 'default' | 'price-low' | 'price-high' | 'rating'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Dynamic Unique Categories Mapping
  const categories = useMemo(() => {
    const allCats = allProduct.map((p) => p.category).filter(Boolean);
    return ["all", ...new Set(allCats)];
  }, [allProduct]);

  // Dynamic Unique Sizes Mapping
  const sizes = useMemo(() => {
    const allSizes = allProduct.flatMap((p) => p.sizes || []);
    return ["all", ...new Set(allSizes)];
  }, [allProduct]);

  // Combined Search, Category Filtering, and Sorting Computation
  const filteredProducts = useMemo(() => {
    let result = [...allProduct];

    // 1. Live Context Search Query Validation
    if (searchQuery.trim() !== "") {
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 2. Target Category Context Filter Mapping
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // 3. Array Size Grid Matching Validation
    if (selectedSize !== "all") {
      result = result.filter((product) =>
        product.sizes?.includes(selectedSize),
      );
    }

    // 4. Multi-Condition Pricing Sorting Matrix
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [allProduct, searchQuery, selectedCategory, selectedSize, sortBy]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500 pt-20 sm:pt-24 pb-10 md:pb-20">
      <ShopBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
                onClick={() => setSearchQuery("")}
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
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <FiChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-hover:text-[#C5A059] transition-colors"
                size={12}
              />
            </div>

            {/* Sizes Dropdown Selector */}
            <div className="relative group">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="appearance-none bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-4 pr-10 py-3 text-xs font-black uppercase tracking-wider cursor-pointer focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300"
              >
                {sizes.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz === "all" ? "All Sizes" : `Size: ${sz}`}
                  </option>
                ))}
              </select>
              <FiChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-hover:text-[#C5A059] transition-colors"
                size={12}
              />
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
              <FiChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-hover:text-[#C5A059] transition-colors"
                size={12}
              />
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
            <h3 className="font-black uppercase tracking-tight text-base sm:text-lg">
              No Products Found
            </h3>
            <p className="text-xs text-neutral-400 font-medium max-w-xs mx-auto leading-relaxed">
              We couldn't find any products matching your search criteria. Try
              adjusting your parameters.
            </p>
          </div>
        )}

        {/* ================= PRIMARY CATALOG STREAM GRID CANVAS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-left">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
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
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Categories Matrix
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      (setSelectedCategory(cat), setShowMobileFilters(false));
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                      selectedCategory === cat
                        ? "bg-[#C5A059] border-[#C5A059] text-neutral-950"
                        : "bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Sizes Configuration
              </label>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-2 min-w-[40px] rounded-xl text-xs font-black uppercase transition-all border flex items-center justify-center ${
                      selectedSize === sz
                        ? "bg-[#C5A059] border-[#C5A059] text-neutral-950"
                        : "bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {sz === "all" ? "All" : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorter */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Sort Parameters
              </label>
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
                setSelectedCategory("all");
                setSelectedSize("all");
                setSortBy("default");
                setSearchQuery("");
                setShowMobileFilters(false);
              }}
              className="w-full bg-neutral-950 hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all mt-auto"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 sm:space-x-2.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B38F48] hover:from-[#B38F48] hover:via-[#C5A059] hover:to-[#A37E37] text-neutral-950 px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-[0_10px_25px_-5px_rgba(197,160,89,0.4)] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/40 font-bold group cursor-pointer border border-[#FFE29A]/30"
      >
        <div className="relative flex items-center justify-center">
          {/* গোল্ডেন পিং প্যাকগ্রাউন্ড অ্যানিমেশন */}
          <span className="absolute inline-flex h-4 sm:h-5 w-4 sm:w-5 rounded-full bg-[#FFE29A] opacity-75 animate-ping group-hover:opacity-100"></span>
          <span className="relative text-base transform group-hover:rotate-6 transition-transform duration-300">
            ✨
          </span>
        </div>
        <span className="text-sm font-semibold tracking-wide uppercase">
          Ask AI
        </span>
      </button>

      {/* AI Chat Modal */}
      <CustomerChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
      {/*  */}
    </div>
  );
};

export default Shop;
