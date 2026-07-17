import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { FaSearch, FaBoxOpen, FaTrash, FaEdit, FaPlus, FaTimes, FaSave } from 'react-icons/fa';

const Products = () => {
  // 🌟 useContext থেকে গ্লোবাল স্টেট ও মেথডগুলো নিয়ে আসা
  const { allProduct, isLoading, fetchProducts, updateProduct, deleteProduct } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState('');

  // 📝 প্রোডাক্ট এডিট মোডের জন্য আলাদা লোকাল স্টেট
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState({ _id: '', title: '', price: '', stock: '', description: '', image: '' });

  // সার্চ বাটন ট্রিগার
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(searchQuery);
  };

  // রিয়েল-টাইম ক্লিয়ার বা রিস্টোর যখন সার্চ ইনপুট খালি করা হয়
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      fetchProducts('');
    }
  };

  // ✏️ টেবিলে বা কার্ডে এডিট বাটনে ক্লিক করলে এই ফাংশনটি মডাল ওপেন করবে
  const handleEditClick = (product) => {
    setEditingProduct({
      _id: product._id,
      title: product.title || '',
      price: product.price || '',
      stock: product.stock || '',
      description: product.description || '',
      image: product.image || ''
    });
    setIsEditModalOpen(true);
  };

  // 💾 মডাল ফর্ম সাবমিট (আপডেট এপিআই কল ট্রিল)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    // কনটেক্সটের আপডেট ফাংশনে আইডি এবং নতুন ডেটা পাঠানো
    const response = await updateProduct(editingProduct._id, {
      title: editingProduct.title,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      description: editingProduct.description,
      image: editingProduct.image
    });

    // আপনার কনটেক্সট যদি অবজেক্ট রিটার্ন করে তবে মেসেজ দেখাবে, নতুবা সফল হলে মডাল অফ হবে
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full space-y-6 relative">
      
      {/* 📊 হেডার পার্ট এবং অ্যাড বাটন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <FaBoxOpen className="text-[#C5A059]" /> Product Inventory
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Total Available Items: <strong className="text-slate-800 dark:text-zinc-200">{allProduct?.length || 0}</strong>
          </p>
        </div>

        {/* কুইক প্রোডাক্ট ক্রিয়েট বাটন */}
        <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl text-zinc-950 bg-[#C5A059] hover:bg-[#b08e4f] active:scale-95 transition-all shadow-md shadow-[#C5A059]/10">
          <FaPlus size={12} /> <span>Add Product</span>
        </button>
      </div>

      {/* 🔍 মডার্ন সার্চ বার */}
      <form onSubmit={handleSearch} className="flex max-w-xl w-full shadow-sm rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800">
        <div className="relative flex-1 bg-white dark:bg-zinc-900">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FaSearch size={14} />
          </span>
          <input
            type="text"
            placeholder="Search by Title, SKU or Tag..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-transparent outline-none text-slate-800 dark:text-zinc-100 placeholder-slate-400"
          />
        </div>
        <button
          type="submit"
          className="bg-zinc-950 dark:bg-zinc-800 text-[#C5A059] px-6 text-xs font-bold hover:bg-zinc-900 dark:hover:bg-zinc-700/80 transition-colors"
        >
          Search
        </button>
      </form>

      {/* ⏳ লোডিং ও এম্পটি কন্ডিশন চেকার */}
      {isLoading ? (
        <div className="w-full py-20 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <div className="w-8 h-8 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-slate-400">Syncing database products...</p>
        </div>
      ) : !allProduct || allProduct.length === 0 ? (
        <div className="w-full py-16 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 text-slate-400">
          <FaBoxOpen className="mx-auto size-8 mb-2 opacity-50 text-slate-400" />
          <p className="text-sm font-medium">No matching products found</p>
        </div>
      ) : (
        <>
          {/* 💻 ১. ডেস্কটপ ও ট্যাবলেট ভিউ: লাক্সারি ডেটা টেবিল */}
          <div className="hidden md:block w-full bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800/80 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-800/50 text-slate-600 dark:text-zinc-400 text-xs font-bold uppercase border-b border-slate-200 dark:border-zinc-800">
                    <th className="px-6 py-4">Product Info</th>
                    <th className="px-6 py-4 text-center">Price</th>
                    <th className="px-6 py-4 text-center">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm font-medium text-slate-700 dark:text-zinc-300">
                  {allProduct.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 overflow-hidden flex-shrink-0 flex items-center justify-center text-xs text-slate-400">
                            {product.image ? (
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                              <span>No Img</span>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-slate-900 dark:text-white font-bold">{product.title}</span>
                            <span className="text-[10px] text-slate-400 truncate max-w-[250px]">{product.description || 'No description provided'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-900 dark:text-white font-bold">
                        ৳{product.price}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold 
                          ${product.stock > 0 
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400' 
                            : 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                          }`}
                        >
                          {product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* ✏️ এডিট ক্লিক হ্যান্ডলার পরিবর্তন করা হয়েছে */}
                          <button onClick={() => handleEditClick(product)} title="Edit Item" className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition-colors">
                            <FaEdit size={12} />
                          </button>
                          <button 
                            onClick={() => deleteProduct(product._id)}
                            title="Delete Item" 
                            className="p-2 rounded-xl border border-transparent hover:border-rose-200 dark:hover:border-rose-900/40 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 transition-colors"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📱 ২. মোবাইল ভিউ: রেসপন্সিভ কাস্টম প্রোডাক্ট কার্ড গ্রিড */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {allProduct.map((product) => (
              <div 
                key={product._id} 
                className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/80 overflow-hidden flex-shrink-0 flex items-center justify-center text-[10px] text-slate-400">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>No Img</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{product.title}</h3>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{product.description || 'No description'}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm font-black text-slate-900 dark:text-white">৳{product.price}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded
                        ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/10' : 'bg-rose-50 text-rose-600'}`}
                      >
                        {product.stock > 0 ? `${product.stock} Pcs` : 'Out'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100 dark:border-zinc-800">
                  {/* ✏️ মোবাইলের জন্যও এডিট মডাল ট্রিগার */}
                  <button onClick={() => handleEditClick(product)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400">
                    <FaEdit size={10} /> Edit
                  </button>
                  <button 
                    onClick={() => deleteProduct(product._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg text-rose-500 bg-rose-50 dark:bg-rose-950/20"
                  >
                    <FaTrash size={10} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🛠️ ৩. প্রিমিয়াম ওভারলে পপ-আপ এডিট মডাল (Popup Form) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* ব্লার ব্যাকড্রপ ওভারলে */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
          
          {/* মডাল উইন্ডো */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 w-full max-w-md rounded-2xl p-6 relative z-10 shadow-2xl transition-all duration-300 transform scale-100">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Update Product Specifications</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Product Title */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Product Title</label>
                <input 
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl focus:outline-none focus:border-[#C5A059] text-slate-900 dark:text-white transition-all"
                />
              </div>

              {/* Price & Stock inline input */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Price (৳)</label>
                  <input 
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl focus:outline-none focus:border-[#C5A059] text-slate-900 dark:text-white transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Stock Count</label>
                  <input 
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl focus:outline-none focus:border-[#C5A059] text-slate-900 dark:text-white transition-all"
                  />
                </div>
              </div>

              {/* Image URL String input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Product Image URL</label>
                <input 
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl focus:outline-none focus:border-[#C5A059] text-slate-900 dark:text-white transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Description field */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-500 dark:text-zinc-400">Description</label>
                <textarea 
                  rows="3"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl focus:outline-none focus:border-[#C5A059] text-slate-900 dark:text-white resize-none transition-all"
                  placeholder="Describe your product specs..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)} 
                  className="px-4 py-2 text-xs font-bold border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-zinc-950 bg-[#C5A059] hover:bg-[#b08e4f] rounded-xl shadow-md transition-all active:scale-95"
                >
                  <FaSave size={12} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;