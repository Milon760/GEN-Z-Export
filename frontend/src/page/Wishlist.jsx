import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaArrowLeft, FaHeart, FaChevronRight } from 'react-icons/fa';
import { ProductContext } from '../context/ProductContext';

const Wishlist = () => {

  const { favorites, removeFromFavorites } = useContext(ProductContext);



  // খালি উইশলিস্টের জন্য চমৎকার ইলাস্ট্রেটিভ ভিউ
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950 text-center">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <FaHeart size={36} />
        </div>
        <h2 className="text-xl font-black text-slate-950 dark:text-white mb-2">Your Wishlist is Empty</h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 max-w-xs mx-auto mb-6 leading-relaxed">
          Seems like you haven't added any premium outfits to your wishlist yet. Explore our shop to find something beautiful!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-zinc-950 font-bold text-xs rounded-xl hover:bg-[#b08e4f] active:scale-95 transition-all shadow-md shadow-[#C5A059]/10"
        >
          <FaArrowLeft size={10} /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* 🏷️ পেজ হেডার এবং টাইটেল */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">
              <span>My Account</span>
              <FaChevronRight size={8} />
              <span className="text-[#C5A059]">Wishlist</span>
            </div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white flex items-center gap-2.5">
              My Wishlist <span className="text-sm font-bold bg-[#C5A059]/10 text-[#C5A059] px-2.5 py-0.5 rounded-full">{favorites.length}</span>
            </h1>
          </div>

          <Link
            to="/"
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:text-[#C5A059] transition-colors group"
          >
            <FaArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
          </Link>
        </div>

        {/* 🛒 উইশলিস্ট আইটেম লিস্ট */}
        <div className="space-y-4">
          {favorites.map((item) => {
            const discountPercent = item.original_price
              ? Math.round(((item.original_price - item.price) / item.original_price) * 100)
              : 0;

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-4 rounded-2xl shadow-sm hover:shadow-md/5 transition-all group relative overflow-hidden"
              >

                {/* ১. বাম পাশ: ইমেজ ও প্রোডাক্ট ইনফো */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* ইমেজ */}
                  <div className="w-20 h-20 bg-slate-100 dark:bg-zinc-800/40 rounded-xl overflow-hidden border border-slate-200/30 dark:border-zinc-800/50 shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {discountPercent > 0 && (
                      <span className="absolute top-1 left-1 bg-rose-500 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* টেক্সট ইনফো */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059]">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white line-clamp-1 group-hover:text-[#C5A059] transition-colors">
                      {item.name}
                    </h3>

                    {/* দাম */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-950 dark:text-white">
                        {item.price} {item.currency}
                      </span>
                      {item.original_price && (
                        <span className="text-xs font-semibold line-through text-slate-400">
                          {item.original_price} {item.currency}
                        </span>
                      )}
                    </div>

                    {/* স্টক স্ট্যাটাস */}
                    <span className={`inline-block text-[10px] font-bold ${item.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* ২. ডান পাশ: অ্যাকশন বাটনসমূহ */}
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-zinc-800">

                  {/* রিমুভ বাটন */}
                  <button
                    onClick={() => removeFromFavorites(item._id)}
                    className="p-2.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                    title="Remove from wishlist"
                  >
                    <FaTrash size={14} />
                  </button>

                  {/* অ্যাড টু কার্ট বাটন */}
                  <button
                    disabled={item.stock === 0}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold rounded-xl hover:bg-zinc-900 dark:hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    <FaShoppingBag size={11} /> Add to Bag
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;