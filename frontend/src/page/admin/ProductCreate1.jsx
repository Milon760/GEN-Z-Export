import React, { useState } from 'react';
import { 
  Package, 
  Tag, 
  CircleDollarSign, 
  Layers, 
  FileText, 
  Palette, 
  Maximize, 
  Star, 
  UploadCloud, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  X,
  Sparkles
} from 'lucide-react';

const ProductCreate = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    original_price: '',
    stock: '',
    rating: '',
    description: '',
    colors: '',
    size: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // Status Pipelines
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: null, text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setStatusMessage({ type: 'error', text: 'Image size should be less than 3MB!' });
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      if (statusMessage.type === 'error') setStatusMessage({ type: null, text: '' });
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: null, text: '' });

    const dataToSend = new FormData();
    
    Object.keys(formData).forEach((key) => {
      if (key === 'colors' || key === 'size') {
        const arrayData = formData[key].split(',').map(item => item.trim()).filter(Boolean);
        arrayData.forEach(item => dataToSend.append(`${key}[]`, item));
      } else {
        dataToSend.append(key, formData[key]);
      }
    });

    if (image) {
      dataToSend.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: dataToSend,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMessage({ type: 'success', text: result.message || 'Product published successfully!' });
        setFormData({ id: '', name: '', category: '', price: '', original_price: '', stock: '', rating: '', description: '', colors: '', size: '' });
        setImage(null);
        setPreview(null);
      } else {
        throw new Error(result.message || 'Something went wrong while creating the product.');
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: error.message || 'Failed to connect to the server.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500 antialiased font-sans select-none">
      <div className="w-full max-w-4xl bg-white dark:bg-neutral-950 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.3)] overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 transition-all duration-500 backdrop-blur-sm">
        
        {/* ================= HEADER SEGMENT ================= */}
        <div className="relative bg-neutral-950 dark:bg-neutral-950 border-b border-neutral-800 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 uppercase">
              <Package className="w-5 h-5 sm:w-6 h-6 text-[#C5A059]" /> HQ Core: Deploy Drop
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-medium max-w-xl">
              Populate the structural attributes mapping pipeline below to initialize database synchronization.
            </p>
          </div>
          
          <div className="relative z-10 self-start sm:self-auto inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-[10px] text-[#C5A059] font-black uppercase tracking-wider shadow-inner">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} /> Active Matrix
          </div>
        </div>

        {/* ================= SYSTEM NOTIFICATIONS STATUS MAP ================= */}
        {statusMessage.type && (
          <div className={`mx-6 sm:mx-10 mt-6 p-4 rounded-2xl flex items-start gap-3 border transition-all duration-300 transform scale-100 ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
              : 'bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm font-bold tracking-wide text-left">{statusMessage.text}</div>
            <button 
              type="button" 
              onClick={() => setStatusMessage({ type: null, text: '' })}
              className="ml-auto p-1 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 opacity-70" />
            </button>
          </div>
        )}

        {/* ================= CORE TRANSACTION INVENTORY FORM ================= */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            
            {/* Product ID Input Layer */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-neutral-400" /> Identifier SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="id" required value={formData.id} onChange={handleInputChange} disabled={isLoading}
                placeholder="e.g. GZ-2005"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Product Name Input Layer */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-neutral-400" /> Drop Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="name" required value={formData.name} onChange={handleInputChange} disabled={isLoading}
                placeholder="e.g. Cyber Premium Silk Panjabi"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Category Component Box */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-neutral-400" /> Cluster Segment <span className="text-red-500">*</span>
              </label>
              <select
                name="category" required value={formData.category} onChange={handleInputChange} disabled={isLoading}
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                <option value="" className="text-neutral-400">Select Track</option>
                <option value="panjabi">Panjabi</option>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="tshirt">T-Shirt</option>
              </select>
            </div>

            {/* Price Processing Hub Block */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <CircleDollarSign className="w-3.5 h-3.5 text-neutral-400" /> Active Price (৳) <span className="text-red-500">*</span>
              </label>
              <input
                type="number" name="price" required value={formData.price} onChange={handleInputChange} disabled={isLoading}
                placeholder="1850" min="0"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Original Compare Price Block */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <CircleDollarSign className="w-3.5 h-3.5 text-neutral-400" /> Ceiling Price (৳) <span className="text-red-500">*</span>
              </label>
              <input
                type="number" name="original_price" required value={formData.original_price} onChange={handleInputChange} disabled={isLoading}
                placeholder="2400" min="0"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Inventory Count Box */}
            <div className="text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-neutral-400" /> Stock Configuration <span className="text-red-500">*</span>
              </label>
              <input
                type="number" name="stock" required value={formData.stock} onChange={handleInputChange} disabled={isLoading}
                placeholder="100" min="0"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Color Matrix Tracking Field */}
            <div className="text-left space-y-1">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-neutral-400" /> Aesthetic Hues <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-neutral-400 font-medium block">Split nodes using comma separators</span>
              <input
                type="text" name="colors" required value={formData.colors} onChange={handleInputChange} disabled={isLoading}
                placeholder="Black, Olive, Sand"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Sizes Tracking Field */}
            <div className="text-left space-y-1">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Maximize className="w-3.5 h-3.5 text-neutral-400" /> Dimension Scaling <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-neutral-400 font-medium block">Split nodes using comma separators</span>
              <input
                type="text" name="size" required value={formData.size} onChange={handleInputChange} disabled={isLoading}
                placeholder="M, L, XL, XXL"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* Custom Rating Input Framework */}
            <div className="md:col-span-2 text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Metric Ranking Verification (0.0 to 5.0) <span className="text-red-500">*</span>
              </label>
              <input
                type="number" step="0.1" max="5" min="0" name="rating" required value={formData.rating} onChange={handleInputChange} disabled={isLoading}
                placeholder="4.8"
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            {/* High-Fidelity File Dropper Track */}
            <div className="md:col-span-2 text-left space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Integrated Image Manifest <span className="text-red-500">*</span></label>
              
              <div className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-500 flex flex-col items-center justify-center min-h-[160px] transform ${
                preview 
                  ? 'border-[#C5A059] bg-[#C5A059]/5 dark:bg-[#C5A059]/5' 
                  : 'border-neutral-300 dark:border-neutral-800 hover:border-[#C5A059] hover:bg-neutral-50 dark:hover:bg-neutral-900/40'
              }`}>
                {!preview ? (
                  <>
                    <input
                      type="file" accept="image/*" required onChange={handleImageChange} disabled={isLoading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                    />
                    <UploadCloud className="w-8 h-8 text-[#C5A059] mb-2 stroke-[1.5]" />
                    <div className="text-center space-y-0.5">
                      <p className="text-neutral-950 dark:text-white font-black text-xs uppercase tracking-wider">Mount New Media File</p>
                      <p className="text-neutral-400 text-[10px] font-medium">Supports High-res PNG, JPG, WEBP formats (Max 3MB)</p>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 shrink-0 shadow-md">
                        <img src={preview} alt="Upload drop preview" className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-neutral-900 dark:text-white font-bold text-xs truncate max-w-[180px] sm:max-w-xs">{image?.name}</p>
                        <p className="text-neutral-400 text-[10px] font-bold">{(image?.size / (1024 * 1024)).toFixed(2)} MB</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500">Staged</span>
                      </div>
                    </div>
                    
                    <button
                      type="button" onClick={handleRemoveImage} disabled={isLoading}
                      className="px-4 py-2 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-wider rounded-xl hover:bg-red-500/10 active:scale-95 transition-all duration-300 disabled:opacity-50"
                    >
                      Purge Media
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Textarea Description Configuration Layer */}
            <div className="md:col-span-2 text-left space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-neutral-400" /> Elaborate Specifications <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description" required rows="4" value={formData.description} onChange={handleInputChange} disabled={isLoading}
                placeholder="Elaborate specs regarding material configurations, tailored fitting details, or drop identity markers..."
                className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all duration-300 resize-none disabled:opacity-50"
              ></textarea>
            </div>

          </div>

          {/* ================= BUTTON CONTROLLER INTERACTION ROW ================= */}
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button" disabled={isLoading}
              onClick={() => {
                setFormData({ id: '', name: '', category: '', price: '', original_price: '', stock: '', rating: '', description: '', colors: '', size: '' });
                handleRemoveImage();
                setStatusMessage({ type: null, text: '' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-white active:scale-95 transition-all duration-300 disabled:opacity-50"
            >
              Reset Terminal
            </button>
            
            <button
              type="submit" disabled={isLoading}
              className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-900 dark:bg-[#C5A059] dark:hover:bg-[#C5A059]/90 text-white dark:text-neutral-950 font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-md active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Syncing System API...
                </>
              ) : (
                'Publish Drop Asset'
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ProductCreate;