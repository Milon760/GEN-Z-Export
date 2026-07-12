import React from 'react';
import { FiSliders, FiDollarSign, FiChevronDown } from 'react-icons/fi';

const ProductsFilter = ({ 
    selectedCategory, 
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
}) => {

    const categories = ['all', 'panjabi', 'shirt', 'pant', 't-shirt'];

    return (
        <div className="w-full bg-white dark:bg-neutral-950 border border-gray-200/80 dark:border-neutral-800/60 rounded-3xl p-6 mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-colors duration-500 font-sans">
            
            {/* Filter Header Section */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-neutral-900">
                <FiSliders className="text-[#C5A059] animate-pulse" size={18} />
                <h3 className="font-black text-sm uppercase tracking-[0.15em] text-neutral-900 dark:text-white">
                    Filter & Refine
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                
                {/* 1. Categories Grid List Control (Takes 6 cols) */}
                <div className="lg:col-span-6 space-y-3 text-left">
                    <span className="text-xs font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Select Category
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((item) => {
                            const isActive = selectedCategory === item;
                            return (
                                <button
                                    key={item}
                                    onClick={() => setSelectedCategory(item)}
                                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 transform active:scale-95 ${
                                        isActive
                                            ? 'bg-neutral-900 text-white dark:bg-[#C5A059] dark:text-neutral-950 shadow-[0_4px_15px_rgba(197,160,89,0.3)] font-extrabold'
                                            : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-950 dark:hover:text-white border border-gray-200/40 dark:border-neutral-800/40'
                                    }`}
                                >
                                    {item === 'all' ? 'All Drops' : item}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Custom Pricing Range Track Module (Takes 3 cols) */}
                <div className="lg:col-span-3 space-y-3 text-left">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                            Max Price
                        </span>
                        <span className="text-xs font-black tracking-wide text-neutral-900 dark:text-white flex items-center bg-neutral-50 dark:bg-neutral-900 px-2 py-0.5 rounded-md border border-gray-200/50 dark:border-neutral-800/50">
                            ৳{priceRange || 5000}
                        </span>
                    </div>
                    <div className="relative pt-2 flex items-center">
                        <input
                            type="range"
                            min="500"
                            max="5000"
                            step="100"
                            value={priceRange || 5000}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-950 dark:accent-[#C5A059]"
                        />
                    </div>
                </div>

                {/* 3. Dropdown Sorting Engine Selector Box (Takes 3 cols) */}
                <div className="lg:col-span-3 space-y-3 text-left">
                    <span className="text-xs font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Sort Timeline
                    </span>
                    <div className="relative">
                        <select
                            value={sortBy || 'default'}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-neutral-50 dark:bg-neutral-900 pl-4 pr-10 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase text-neutral-700 dark:text-neutral-300 border border-gray-200/80 dark:border-neutral-800/60 focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/10 shadow-sm appearance-none transition-all duration-300 cursor-pointer"
                        >
                            <option value="default">Default Match</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-400">
                            <FiChevronDown size={14} className="transition-transform duration-300" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductsFilter;
