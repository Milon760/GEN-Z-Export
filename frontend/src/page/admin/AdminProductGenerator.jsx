// import React, { useState } from "react";
// import axios from "axios";
// import {
//   FiZap,
//   FiCopy,
//   FiCheck,
//   FiEdit3,
//   FiRefreshCw,
//   FiTag,
//   FiLayers,
//   FiFileText,
//   FiShare2,
// } from "react-icons/fi";

// const AdminProductGenerator = () => {
//   const [productName, setProductName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [copiedField, setCopiedField] = useState(null);

//   const handleGenerate = async (e) => {
//     e?.preventDefault();
//     if (!productName.trim() || loading) return;
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/ai/admin/generate-product",
//         { productName },
//       );
//       if (res.data.success) {
//         setResult(res.data.data);
//       }
//     } catch (err) {
//       alert("Generation failed! Please check backend API.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ক্লিপবোর্ডে কপি করার হেল্পার ফাংশন
//   const handleCopy = (text, fieldName) => {
//     if (!text) return;
//     navigator.clipboard.writeText(Array.isArray(text) ? text.join(", ") : text);
//     setCopiedField(fieldName);
//     setTimeout(() => setCopiedField(null), 2000);
//   };

//   // জেনারেট করা রেজাল্ট এডিট করার জন্য হ্যান্ডলার
//   const handleFieldChange = (field, value) => {
//     setResult((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <div className="max-w-2xl mx-auto my-6 p-5 sm:p-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl transition-all duration-300">
//       {/* 🔝 হেডার সেকশন */}
//       <div className="flex items-center justify-between pb-5 mb-6 border-b border-neutral-200 dark:border-neutral-800">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
//             <FiZap size={20} />
//           </div>
//           <div>
//             <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white">
//               AI Product Generator
//             </h3>
//             <p className="text-xs text-neutral-500 dark:text-neutral-400">
//               Generate titles, SEO tags, and descriptions instantly
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* 🔍 ইনপুট ফর্ম */}
//       <form onSubmit={handleGenerate} className="flex gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="e.g. Premium Oversized Blue Denim Jacket"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           className="flex-1 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border border-transparent focus:border-[#C5A059] focus:bg-white dark:focus:bg-neutral-950 focus:outline-none transition-all placeholder:text-neutral-400"
//         />
//         <button
//           type="submit"
//           disabled={loading || !productName.trim()}
//           className="px-5 py-3 bg-neutral-950 dark:bg-[#C5A059] text-white dark:text-neutral-950 rounded-xl font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md"
//         >
//           {loading ? (
//             <>
//               <FiRefreshCw className="animate-spin" size={16} />
//               <span>Generating...</span>
//             </>
//           ) : (
//             <>
//               <FiZap size={16} />
//               <span>Generate</span>
//             </>
//           )}
//         </button>
//       </form>

//       {/* 📦 জেনারেটেড রেজাল্ট কার্ডস */}
//       {result && (
//         <div className="space-y-4 pt-2 animate-fadeIn">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
//               Generated Metadata
//             </span>
//             <span className="text-[11px] text-neutral-400">
//               Review & edit before saving
//             </span>
//           </div>

//           {/* ১. প্রোডাক্ট টাইটেল */}
//           <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
//             <div className="flex items-center justify-between">
//               <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <FiEdit3 size={13} className="text-[#C5A059]" /> Optimized Title
//               </label>
//               <button
//                 onClick={() => handleCopy(result.title, "title")}
//                 className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
//                 title="Copy Title"
//               >
//                 {copiedField === "title" ? (
//                   <FiCheck className="text-emerald-500" size={14} />
//                 ) : (
//                   <FiCopy size={14} />
//                 )}
//               </button>
//             </div>
//             <input
//               type="text"
//               value={result.title || ""}
//               onChange={(e) => handleFieldChange("title", e.target.value)}
//               className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059]"
//             />
//           </div>

//           {/* ২. ডেসক্রিপশন */}
//           <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
//             <div className="flex items-center justify-between">
//               <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <FiFileText size={13} className="text-[#C5A059]" /> Description
//               </label>
//               <button
//                 onClick={() => handleCopy(result.description, "description")}
//                 className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
//                 title="Copy Description"
//               >
//                 {copiedField === "description" ? (
//                   <FiCheck className="text-emerald-500" size={14} />
//                 ) : (
//                   <FiCopy size={14} />
//                 )}
//               </button>
//             </div>
//             <textarea
//               rows="3"
//               value={result.description || ""}
//               onChange={(e) => handleFieldChange("description", e.target.value)}
//               className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-3 rounded-lg text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] resize-none"
//             />
//           </div>

//           {/* ৩. সাইজ ও ট্যাগস (Grid Layout) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* সাইজ */}
//             <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
//               <div className="flex items-center justify-between">
//                 <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                   <FiLayers size={13} className="text-[#C5A059]" /> Available
//                   Sizes
//                 </label>
//                 <button
//                   onClick={() => handleCopy(result.sizes, "sizes")}
//                   className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
//                   title="Copy Sizes"
//                 >
//                   {copiedField === "sizes" ? (
//                     <FiCheck className="text-emerald-500" size={14} />
//                   ) : (
//                     <FiCopy size={14} />
//                   )}
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-1.5 pt-1">
//                 {result.sizes?.map((size, index) => (
//                   <span
//                     key={index}
//                     className="px-2.5 py-1 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-md text-[11px] font-bold"
//                   >
//                     {size}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* ট্যাগস */}
//             <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
//               <div className="flex items-center justify-between">
//                 <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                   <FiTag size={13} className="text-[#C5A059]" /> SEO Tags
//                 </label>
//                 <button
//                   onClick={() => handleCopy(result.tags, "tags")}
//                   className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
//                   title="Copy Tags"
//                 >
//                   {copiedField === "tags" ? (
//                     <FiCheck className="text-emerald-500" size={14} />
//                   ) : (
//                     <FiCopy size={14} />
//                   )}
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-1.5 pt-1">
//                 {result.tags?.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded text-[10px] font-medium"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ৪. ফেসবুক ক্যাপশন */}
//           <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
//             <div className="flex items-center justify-between">
//               <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
//                 <FiShare2 size={13} className="text-[#C5A059]" /> Social / FB
//                 Caption
//               </label>
//               <button
//                 onClick={() => handleCopy(result.fbCaption, "fbCaption")}
//                 className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
//                 title="Copy FB Caption"
//               >
//                 {copiedField === "fbCaption" ? (
//                   <FiCheck className="text-emerald-500" size={14} />
//                 ) : (
//                   <FiCopy size={14} />
//                 )}
//               </button>
//             </div>
//             <textarea
//               rows="3"
//               value={result.fbCaption || ""}
//               onChange={(e) => handleFieldChange("fbCaption", e.target.value)}
//               className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-3 rounded-lg text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] resize-none"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProductGenerator;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiZap,
  FiCopy,
  FiCheck,
  FiEdit3,
  FiRefreshCw,
  FiTag,
  FiLayers,
  FiFileText,
  FiShare2,
  FiPlus,
  FiTrash2,
  FiMenu,
  FiX,
  FiClock,
} from "react-icons/fi";

const AdminProductGenerator = () => {
  // ১. লোকাল স্টোরেজ থেকে হিস্ট্রি লোড করা
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("ai_product_history");
    return saved ? JSON.parse(saved) : [];
  });

  // ২. বর্তমানে সিলেক্টেড হিস্ট্রি সেশনের ID
  const [activeSessionId, setActiveSessionId] = useState(() => {
    const saved = localStorage.getItem("ai_product_active_id");
    return saved ? saved : null;
  });

  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false); // মোবাইলের জন্য সাইডবার

  // ব্রাউজারে হিস্ট্রি সিঙ্ক রাখা
  useEffect(() => {
    localStorage.setItem("ai_product_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem("ai_product_active_id", activeSessionId);
    } else {
      localStorage.removeItem("ai_product_active_id");
    }
  }, [activeSessionId]);

  // বর্তমান সেশনের রেজাল্ট বের করা
  const activeSession = history.find((item) => item.id === activeSessionId);
  const result = activeSession ? activeSession.data : null;

  // নতুন জেনারেশন সেশন শুরু করা
  const handleNewGeneration = () => {
    setActiveSessionId(null);
    setProductName("");
    setShowSidebar(false);
  };

  // AI মেটাডেটা জেনারেট করার ফাংশন
  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!productName.trim() || loading) return;
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/admin/generate-product",
        { productName },
      );

      if (res.data.success) {
        const newSession = {
          id: "gen_" + Date.now(),
          query: productName,
          data: res.data.data,
          createdAt: new Date().toLocaleDateString("bn-BD", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setHistory((prev) => [newSession, ...prev]);
        setActiveSessionId(newSession.id);
      }
    } catch (err) {
      alert("Generation failed! Please check backend API.");
    } finally {
      setLoading(false);
    }
  };

  // ক্লিপবোর্ডে কপি করার হেল্পার ফাংশন
  const handleCopy = (text, fieldName) => {
    if (!text) return;
    const contentToCopy = Array.isArray(text) ? text.join(", ") : text;
    navigator.clipboard.writeText(contentToCopy);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // জেনারেট করা রেজাল্ট এডিট করা ও স্টোরেজে আপডেট রাখা
  const handleFieldChange = (field, value) => {
    if (!activeSessionId) return;

    setHistory((prev) =>
      prev.map((item) => {
        if (item.id === activeSessionId) {
          const updatedValue =
            field === "sizes" || field === "tags"
              ? value.split(",").map((s) => s.trim())
              : value;

          return {
            ...item,
            data: {
              ...item.data,
              [field]: updatedValue,
            },
          };
        }
        return item;
      }),
    );
  };

  // হিস্ট্রি থেকে কোনো আইটেম ডিলিট করা
  const deleteHistoryItem = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this history log?")) {
      const filtered = history.filter((item) => item.id !== id);
      setHistory(filtered);
      if (activeSessionId === id) {
        setActiveSessionId(filtered.length > 0 ? filtered[0].id : null);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex h-[720px] transition-colors duration-300 font-sans relative">
      {/* 📜 বামপাশের হিস্ট্রি সাইডবার */}
      <div
        className={`w-72 bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full transition-all duration-300 md:relative absolute inset-y-0 left-0 z-30 ${
          showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* সাইডবার হেডার */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <FiClock size={14} /> Generation History
          </span>
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* নতুন জেনারেশন বাটন */}
        <div className="p-3">
          <button
            onClick={handleNewGeneration}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-xs font-bold transition-all cursor-pointer"
          >
            <FiPlus size={14} /> Generate New Product
          </button>
        </div>

        {/* হিস্ট্রি লিস্ট */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {history.length === 0 ? (
            <p className="text-center text-[11px] text-neutral-400 mt-8">
              No history yet
            </p>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveSessionId(item.id);
                  setProductName(item.query);
                  setShowSidebar(false);
                }}
                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  item.id === activeSessionId
                    ? "bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20"
                    : "hover:bg-neutral-200/50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                <div className="overflow-hidden pr-2">
                  <p className="text-xs font-semibold truncate">{item.query}</p>
                  <span className="text-[10px] text-neutral-400">
                    {item.createdAt}
                  </span>
                </div>
                <button
                  onClick={(e) => deleteHistoryItem(item.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-500 transition-all rounded-md"
                  title="Delete Log"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ⚡ মূল জেনারেটর প্যানেল (Right Panel) */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-neutral-900 relative overflow-y-auto">
        {/* 🔝 হেডার সেকশন */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(true)}
              className="md:hidden p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              <FiMenu size={20} />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <FiZap size={20} />
            </div>
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-neutral-900 dark:text-white">
                AI Product Generator
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Generate titles, SEO tags, and descriptions instantly
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6 flex-1">
          {/* 🔍 ইনপুট ফর্ম */}
          <form onSubmit={handleGenerate} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Premium Oversized Blue Denim Jacket"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="flex-1 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white px-4 py-3 rounded-xl text-xs sm:text-sm font-medium border border-transparent focus:border-[#C5A059] focus:bg-white dark:focus:bg-neutral-950 focus:outline-none transition-all placeholder:text-neutral-400"
            />
            <button
              type="submit"
              disabled={loading || !productName.trim()}
              className="px-5 py-3 bg-neutral-950 dark:bg-[#C5A059] text-white dark:text-neutral-950 rounded-xl font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md"
            >
              {loading ? (
                <>
                  <FiRefreshCw className="animate-spin" size={16} />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FiZap size={16} />
                  <span>Generate</span>
                </>
              )}
            </button>
          </form>

          {/* 📦 জেনারেটেড রেজাল্ট কার্ডস */}
          {result ? (
            <div className="space-y-4 pt-2 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  Generated Metadata
                </span>
                <span className="text-[11px] text-neutral-400">
                  Review & edit before saving
                </span>
              </div>

              {/* ১. প্রোডাক্ট টাইটেল */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                    <FiEdit3 size={13} className="text-[#C5A059]" /> Optimized
                    Title
                  </label>
                  <button
                    onClick={() => handleCopy(result.title, "title")}
                    className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
                    title="Copy Title"
                  >
                    {copiedField === "title" ? (
                      <FiCheck className="text-emerald-500" size={14} />
                    ) : (
                      <FiCopy size={14} />
                    )}
                  </button>
                </div>
                <input
                  type="text"
                  value={result.title || ""}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* ২. ডেসক্রিপশন */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                    <FiFileText size={13} className="text-[#C5A059]" />{" "}
                    Description
                  </label>
                  <button
                    onClick={() =>
                      handleCopy(result.description, "description")
                    }
                    className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
                    title="Copy Description"
                  >
                    {copiedField === "description" ? (
                      <FiCheck className="text-emerald-500" size={14} />
                    ) : (
                      <FiCopy size={14} />
                    )}
                  </button>
                </div>
                <textarea
                  rows="3"
                  value={result.description || ""}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-3 rounded-lg text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] resize-none"
                />
              </div>

              {/* ৩. সাইজ ও ট্যাগস (Grid Layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* সাইজ */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                      <FiLayers size={13} className="text-[#C5A059]" />{" "}
                      Available Sizes
                    </label>
                    <button
                      onClick={() => handleCopy(result.sizes, "sizes")}
                      className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
                      title="Copy Sizes"
                    >
                      {copiedField === "sizes" ? (
                        <FiCheck className="text-emerald-500" size={14} />
                      ) : (
                        <FiCopy size={14} />
                      )}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={
                      Array.isArray(result.sizes)
                        ? result.sizes.join(", ")
                        : result.sizes || ""
                    }
                    onChange={(e) => handleFieldChange("sizes", e.target.value)}
                    placeholder="S, M, L, XL"
                    className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-2 rounded-lg text-xs font-semibold border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* ট্যাগস */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                      <FiTag size={13} className="text-[#C5A059]" /> SEO Tags
                    </label>
                    <button
                      onClick={() => handleCopy(result.tags, "tags")}
                      className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
                      title="Copy Tags"
                    >
                      {copiedField === "tags" ? (
                        <FiCheck className="text-emerald-500" size={14} />
                      ) : (
                        <FiCopy size={14} />
                      )}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={
                      Array.isArray(result.tags)
                        ? result.tags.join(", ")
                        : result.tags || ""
                    }
                    onChange={(e) => handleFieldChange("tags", e.target.value)}
                    placeholder="denim, jacket, mens fashion"
                    className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-2 rounded-lg text-xs font-semibold border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* ৪. ফেসবুক ক্যাপশন */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                    <FiShare2 size={13} className="text-[#C5A059]" /> Social /
                    FB Caption
                  </label>
                  <button
                    onClick={() => handleCopy(result.fbCaption, "fbCaption")}
                    className="text-neutral-400 hover:text-[#C5A059] transition-colors p-1"
                    title="Copy FB Caption"
                  >
                    {copiedField === "fbCaption" ? (
                      <FiCheck className="text-emerald-500" size={14} />
                    ) : (
                      <FiCopy size={14} />
                    )}
                  </button>
                </div>
                <textarea
                  rows="3"
                  value={result.fbCaption || ""}
                  onChange={(e) =>
                    handleFieldChange("fbCaption", e.target.value)
                  }
                  className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 p-3 rounded-lg text-xs sm:text-sm font-medium border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mb-2">
                <FiZap size={24} />
              </div>
              <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                Ready to generate product metadata
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Type a product name above and click Generate to start.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductGenerator;
