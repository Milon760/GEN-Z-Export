import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import {
  FiSearch,
  FiSliders,
  FiEye,
  FiShoppingCart,
  FiChevronDown,
  FiX,
  FiGrid,
} from "react-icons/fi"; // আপনার icons ইম্পোর্ট ঠিক রাখুন
import { FiSearch as FiSearchIcon } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCard from "./ProductCart";
import CategoryHeader from "../../components/CategoryBanner";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Local state for Search & Sort inside Category
  const [localSearch, setLocalSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const {
    allProduct = [],
    cart = [],
    addToCart,
    favorites = [],
    addToFavorites,
    removeFromFavorites,
  } = useContext(ProductContext);

  // ১. URL ক্যাটাগরি অনুযায়ী ফিল্টারিং
  // ১. URL ক্যাটাগরি অনুযায়ী নিখুঁত ফিল্টারিং
  let filteredProducts = allProduct.filter((product) => {
    if (!product?.category) return false;

    const cat = product.category.toLowerCase().trim();
    const targetCat = (categoryName || "").toLowerCase().trim();

    // পাঞ্জাবি ফিল্টার
    if (targetCat === "panjabi") {
      return cat.includes("panjabi");
    }

    // টি-শার্ট 필্টার (Cyber Tees)
    if (
      targetCat === "tees" ||
      targetCat === "tshirt" ||
      targetCat === "t-shirt"
    ) {
      return (
        cat.includes("tee") || cat.includes("t-shirt") || cat.includes("tshirt")
      );
    }

    // শার্ট ফিল্টার (Resort Shirts) - এখানে টি-শার্টকে পুরোপুরি বাদ (Exclude) করা হয়েছে
    if (targetCat === "shirt" || targetCat === "shirts") {
      const isTshirt =
        cat.includes("tee") ||
        cat.includes("t-shirt") ||
        cat.includes("tshirt");
      return cat.includes("shirt") && !isTshirt;
    }

    // প্যান্ট ফিল্টার (Cargo Pants)
    if (targetCat === "pant" || targetCat === "pants") {
      return cat.includes("pant") || cat.includes("cargo");
    }

    return cat === targetCat;
  });

  // ২. লোকাল সার্চ ইনপুট ফিল্টারিং (নাম বা ডিসক্রিপশন দিয়ে খুঁজবে)
  if (localSearch.trim() !== "") {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(localSearch.toLowerCase()) ||
        p.description?.toLowerCase().includes(localSearch.toLowerCase()),
    );
  }

  // ৩. সর্টিং (দাম কম/বেশি)
  if (sortBy === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-20 pb-12 text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-500">
      {/* 🌟 Category Header Banner */}
      <CategoryHeader
        categoryName={categoryName}
        totalProducts={filteredProducts.length}
      />
      <div className=" px-4 md:px-12">
        {/* 🔍 Search & Filter Bar Controls */}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 bg-white dark:bg-neutral-900 p-3 sm:p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs transition-colors duration-300">
          {/* 🔍 ১. সার্চ ইনপুট বক্স */}
          <div className="relative w-full sm:w-72 md:w-80 group">
            <FiSearch
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[#C5A059] transition-colors"
              size={16}
            />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={`Search in ${categoryName}...`}
              className="w-full pl-10 pr-9 py-2.5 bg-neutral-100/80 dark:bg-neutral-950/80 text-neutral-900 dark:text-neutral-100 rounded-xl text-xs font-semibold border border-transparent focus:border-[#C5A059] focus:bg-white dark:focus:bg-neutral-950 focus:outline-none transition-all duration-200 placeholder:text-neutral-400"
            />

            {/* ক্লিয়ার বাটন (X) */}
            {localSearch && (
              <button
                onClick={() => setLocalSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                title="Clear search"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* 📊 ২. প্রডাক্ট কাউন্টার ও সর্টিং ড্রপডাউন */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
            {/* প্রোডাক্ট সংখ্যা */}
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span className="text-neutral-900 dark:text-neutral-100 font-extrabold">
                {filteredProducts.length}
              </span>{" "}
              Items
            </span>

            {/* সর্টিং ডাবল বক্স */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-neutral-100/80 dark:bg-neutral-950/80 text-neutral-800 dark:text-neutral-200 text-xs font-bold pl-3.5 pr-8 py-2.5 rounded-xl border border-transparent focus:border-[#C5A059] focus:outline-none cursor-pointer transition-all"
              >
                <option value="default">Sort: Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <FiChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                size={14}
              />
            </div>
          </div>
        </div>

        {/* 📦 Product Grid Layout */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800">
            <p className="text-base font-bold text-neutral-500">
              No products found in this collection.
            </p>
            <button
              onClick={() => setLocalSearch("")}
              className="mt-4 px-4 py-2 bg-[#C5A059] text-neutral-950 font-bold text-xs rounded-xl hover:bg-[#b08e4d] transition-all"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-left">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
