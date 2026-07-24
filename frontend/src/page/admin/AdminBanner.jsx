import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaPlus, FaTrash, FaSave, FaImage, FaLink, FaTag,
  FaParagraph, FaHeading, FaSlidersH, FaLayerGroup,
  FaEye, FaCheckCircle, FaExclamationCircle, FaSpinner,
  FaPalette, FaFont, FaToggleOn, FaToggleOff, FaSun, FaMoon, FaAlignLeft
} from 'react-icons/fa';

const AdminBannerDashboard = () => {
  const API_URL = 'http://localhost:5000/api/banner';

  // স্টেটস ম্যানেজমেন্ট
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // নতুন আপডেটেড ফর্ম ইনপুট স্টেট
  const [formData, setFormData] = useState({
    tagline: '',
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    bgImage: '',
    badge: '',
    isActive: true,            // ব্যানার শো/হাইড ফিচার
    bgColor: '#09090b',        // ব্যাকগ্রাউন্ড কালার কাস্টমাইজ
    textColor: '#ffffff',      // টেক্সট কালার
    fontFamily: 'font-sans',   // ফন্ট কাস্টমাইজ
    alignment: 'text-left',    // অ্যালাইনমেন্ট কাস্টমাইজ
    autoPlaySpeed: 6000        // স্লাইড শো স্পীড কন্ট্রোল
  });

  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ type: '', message: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert.message]);

  const fetchSlides = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data && res.data.success) {
        setSlides(res.data.slides || []);
        if (res.data.slides && res.data.slides.length > 0) {
          handleSelectSlide(res.data.slides[0]);
        } else {
          resetForm();
        }
      }
    } catch (err) {
      showAlert('error', 'ব্যানার ডাটা লোড করতে ব্যর্থ হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const handleSelectSlide = (slide) => {
    setSelectedSlide(slide);
    setIsEditMode(true);
    setFormData({
      tagline: slide.tagline || '',
      title: slide.title || '',
      description: slide.description || '',
      buttonText: slide.buttonText || '',
      buttonLink: slide.buttonLink || '',
      bgImage: slide.bgImage || '',
      badge: slide.badge || '',
      isActive: slide.isActive !== false,
      bgColor: slide.bgColor || '#09090b',
      textColor: slide.textColor || '#ffffff',
      fontFamily: slide.fontFamily || 'font-sans',
      alignment: slide.alignment || 'text-left',
      autoPlaySpeed: slide.autoPlaySpeed || 6000
    });
  };

  const resetForm = () => {
    setSelectedSlide(null);
    setIsEditMode(false);
    setFormData({
      tagline: '',
      title: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      bgImage: '',
      badge: '',
      isActive: true,
      bgColor: '#09090b',
      textColor: '#ffffff',
      fontFamily: 'font-sans',
      alignment: 'text-left',
      autoPlaySpeed: 6000
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.buttonText) {
      showAlert('error', 'দয়া করে প্রয়োজনীয় ফিল্ডগুলো পূরণ করুন!');
      return;
    }

    setActionLoading(true);
    try {
      if (isEditMode && selectedSlide) {
        const res = await axios.put(`${API_URL}/update/${selectedSlide._id}`, formData);
        if (res.data.success) {
          showAlert('success', 'ব্যানারটি সফলভাবে কাস্টমাইজড আপডেট করা হয়েছে!');
          fetchSlides();
        }
      } else {
        const res = await axios.post(`${API_URL}/create`, formData);
        if (res.data.success) {
          showAlert('success', 'নতুন কাস্টমাইজড ব্যানার তৈরি হয়েছে!');
          resetForm();
          fetchSlides();
        }
      }
    } catch (err) {
      showAlert('error', 'সার্ভার অপারেশনে সমস্যা হয়েছে!');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই ব্যানারটি ডিলিট করতে চান?')) return;
    setActionLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/delete/${id}`);
      if (res.data.success) {
        showAlert('success', 'ব্যানারটি সফলভাবে ডিলিট করা হয়েছে!');
        resetForm();
        fetchSlides();
      }
    } catch (err) {
      showAlert('error', 'ব্যানারটি ডিলিট করা সম্ভব হয়নি!');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-[#C5A059] font-bold gap-4">
        <FaSpinner className="animate-spin text-3xl" />
        <span className="tracking-widest text-xs uppercase">Loading Advanced Control System...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans transition-colors duration-300 dark:bg-zinc-950 dark:text-white bg-gray-50 text-zinc-900"
    >

      {/* 🔔 গলোবাল নোটিফিকেশন টোস্ট */}
      {alert.message && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all ${alert.type === 'success' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400' : 'bg-rose-950/80 border-rose-500 text-rose-400'
          }`}>
          {alert.type === 'success' ? <FaCheckCircle size={18} /> : <FaExclamationCircle size={18} />}
          <span className="text-xs font-bold tracking-wide">{alert.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">

        {/* 🏷️ ড্যাশবোর্ড মেনু হেডার এবং লাইট/ডার্ক মোড কুইক সুইচ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 dark:border-zinc-900 border-gray-200">
          <div className="text-left">
            <h1 className="text-2xl font-black flex items-center gap-3 uppercase tracking-wider">
              <FaSlidersH className="text-[#C5A059]" /> Advanced Banner Manager
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Control backgrounds, fonts, display status, alignment, and auto-play triggers instantly.
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="border rounded-xl px-4 py-2.5 flex items-center gap-2.5 dark:bg-zinc-900 dark:border-zinc-800 bg-white border-gray-300">
              <FaLayerGroup className="text-[#C5A059]" />
              <div className="text-left">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Total</p>
                <p className="text-sm font-black mt-0.5">{slides.length}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-black rounded-xl transition-all border ${!isEditMode ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059]' : 'bg-zinc-900 border-zinc-800 text-white'
                }`}
            >
              <FaPlus size={10} /> Add New
            </button>
          </div>
        </div>

        {/* 📦 ড্যাশবোর্ড মেইন টু-কলাম গ্রিড লেআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* 📁 বাম কলাম (৪ কলাম): ইনভেন্টরি ও লাইভ ফর্ম প্রিভিউ */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border rounded-2xl p-4 text-left dark:bg-zinc-900/40 dark:border-zinc-900 bg-white border-gray-200">
              <h2 className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-widest pb-3 border-b mb-3 border-zinc-700/30">
                Live Banners List ({slides.length})
              </h2>

              <div className="space-y-2.5 max-h-[40vh] overflow-y-auto">
                {slides.map((slide) => (
                  <div
                    key={slide._id}
                    onClick={() => handleSelectSlide(slide)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${selectedSlide?._id === slide._id ? 'bg-[#C5A059]/10 border-[#C5A059]' : 'bg-transparent border-transparent'
                      } ${slide.isActive === false ? 'opacity-40' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-8 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                        {slide.bgImage && <img src={slide.bgImage} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="text-left truncate">
                        <p className="font-bold text-xs truncate max-w-[140px] dark:text-white text-zinc-900">{slide.title || "Untitled"}</p>
                        <span className="text-[9px] text-zinc-400 block">{slide.isActive !== false ? '🟢 Active' : '🔴 Disabled'}</span>
                      </div>
                    </div>
                    <button type="button" onClick={(e) => { e.stopPropagation(); handleDelete(slide._id); }} className="text-zinc-400 hover:text-rose-500 p-2"><FaTrash size={12} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* 📸 কাস্টমাইজড লাইভ প্রিভিউ বক্স */}
            <div className="border rounded-2xl p-4 text-left space-y-3 dark:bg-zinc-900/40 dark:border-zinc-900 bg-white border-gray-200">
              <h2 className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-widest pb-2 border-b border-zinc-700/30 flex items-center gap-2">
                <FaEye size={12} className="text-[#C5A059]" /> Dynamic Form Live Preview
              </h2>
              <div
                style={{ backgroundColor: formData.bgColor }}
                className={`relative w-full h-44 rounded-xl overflow-hidden border border-zinc-800 flex flex-col justify-end p-4 text-left ${formData.fontFamily}`}
              >
                {formData.bgImage && <img src={formData.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                <div style={{ color: formData.textColor }} className={`relative z-20 space-y-1 ${formData.alignment}`}>
                  <div className={`flex items-center gap-1.5 ${formData.alignment === 'text-center' ? 'justify-center' : formData.alignment === 'text-right' ? 'justify-end' : 'justify-start'}`}>
                    {formData.isActive ? <span className="text-[8px] bg-emerald-500 text-white px-1 rounded font-bold">LIVE</span> : <span className="text-[8px] bg-rose-500 text-white px-1 rounded font-bold">DISABLED</span>}
                    {formData.badge && <span className="bg-[#C5A059] text-zinc-950 text-[7px] font-black px-1.5 py-0.5 rounded">{formData.badge}</span>}
                  </div>
                  <h4 className="text-sm font-black uppercase truncate">{formData.title || 'HEADING TITLE'}</h4>
                  <p className="text-[9px] opacity-70 truncate">{formData.description || 'No description...'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 📝 ডান কলাম (৮ কলাম): ডাইনামিক CRUD ফর্ম ম্যানেজার */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="border rounded-3xl p-6 space-y-6 text-left dark:bg-zinc-900/20 dark:border-zinc-900 bg-white border-gray-200 shadow-sm"
            >

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-3 dark:border-zinc-800 border-gray-200">
                <h3 className="text-xs font-black uppercase tracking-widest">
                  {isEditMode ? `⚙️ Edit Settings Mode` : '✨ Create Custom Banner'}
                </h3>

                {/* 🚫 ব্যানার অ্যাক্টিভ/ডিজেবল টগল সুইচ */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Banner Status:</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black transition-all ${formData.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                      }`}
                  >
                    {formData.isActive ? <><FaToggleOn size={14} /> ACTIVE / SHOWN</> : <><FaToggleOff size={14} /> HIDDEN / DISABLED</>}
                  </button>
                </div>
              </div>

              {/* 🎨 অ্যাডভান্সড কাস্টমাইজেশনツールキット (FIXED OPACITY & LIGHT/DARK SUPPORT) */}
              <div className="p-4 rounded-2xl border grid grid-cols-1 md:grid-cols-4 gap-4 text-xs dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-white bg-gray-50 border-gray-250 text-zinc-900">
                {/* ব্যাকগ্রাউন্ড কালার */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"><FaPalette className="text-[#C5A059]" /> BG Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" name="bgColor" value={formData.bgColor} onChange={handleInputChange} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" />
                    <input type="text" name="bgColor" value={formData.bgColor} onChange={handleInputChange} className="w-full text-[10px] bg-transparent border-b p-1 focus:outline-none focus:border-[#C5A059] dark:border-zinc-700 dark:text-white border-gray-300 text-zinc-900"/>
                  </div>
                </div>

                {/* টেক্সট কালার */}
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"><FaPalette className="text-blue-400" /> Text Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" name="textColor" value={formData.textColor} onChange={handleInputChange} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" />
                    <input type="text" name="textColor" value={formData.textColor} onChange={handleInputChange} className="w-full text-[10px] bg-transparent border-b p-1 focus:outline-none focus:border-blue-400 dark:border-zinc-700 dark:text-white border-gray-300 text-zinc-900"/>
                  </div>
                </div>

                {/* ফন্ট ফ্যামিলি সিলেক্টর */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"><FaFont className="text-purple-400" /> Font Style</label>
                  <select
                    name="fontFamily"
                    value={formData.fontFamily}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b p-1 focus:outline-none text-[11px] dark:border-zinc-700 dark:text-white dark:bg-zinc-950 border-gray-300 text-zinc-900 bg-white"
                  >
                    <option value="font-sans" className="dark:bg-zinc-950 dark:text-white bg-white text-zinc-900">Sans Serif (Clean)</option>
                    <option value="font-serif" className="dark:bg-zinc-950 dark:text-white bg-white text-zinc-900">Serif (Elegant)</option>
                    <option value="font-mono" className="dark:bg-zinc-950 dark:text-white bg-white text-zinc-900">Monospace (Tech)</option>
                  </select>
                </div>

                {/* টেক্সট অ্যালাইনমেন্ট */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"><FaAlignLeft className="text-teal-400" /> Alignment</label>
                  <select
                    name="alignment"
                    value={formData.alignment}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b p-1 focus:outline-none text-[11px] dark:border-zinc-700 dark:text-white dark:bg-zinc-950 border-gray-300 text-zinc-900 bg-white"
                  >
                    <option value="text-left" className="dark:bg-zinc-950 dark:text-white bg-white text-zinc-900">Left Aligned</option>
                    <option value="text-center" className="dark:bg-zinc-950 dark:text-white bg-white text-zinc-900">Center Aligned</option>
                    <option value="text-right" className="dark:bg-zinc-950 dark:text-white bg-white text-zinc-900">Right Aligned</option>
                  </select>
                </div>
              </div>

              {/* কন্টেন্ট ফিল্ডস গ্রিড */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"><FaTag size={10} className="text-[#C5A059]" /> Badge Text</label>
                  <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} placeholder="e.g. HOT DEAL" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] dark:bg-zinc-950 dark:border-zinc-900 dark:text-white bg-white border-gray-300 text-zinc-900" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"><FaTag size={10} className="text-[#C5A059]" /> Tagline</label>
                  <input type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} placeholder="e.g. Premium Drop" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] dark:bg-zinc-950 dark:border-zinc-900 dark:text-white bg-white border-gray-300 text-zinc-900" />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"><FaHeading size={10} className="text-[#C5A059]" /> Main Heading Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="ENTER CAMPAIGN TITLE" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] dark:bg-zinc-950 dark:border-zinc-900 dark:text-white bg-white border-gray-300 text-zinc-900" required />
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"><FaParagraph size={10} className="text-[#C5A059]" /> Short Description</label>
                <textarea name="description" rows="2" value={formData.description} onChange={handleInputChange} placeholder="Enter campaign details here..." className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] resize-none dark:bg-zinc-950 dark:border-zinc-900 dark:text-white bg-white border-gray-300 text-zinc-900" required></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"><FaLink size={10} className="text-[#C5A059]" /> Button Text</label>
                  <input type="text" name="buttonText" value={formData.buttonText} onChange={handleInputChange} placeholder="e.g. Shop Now" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] dark:bg-zinc-950 dark:border-zinc-900 dark:text-white bg-white border-gray-300 text-zinc-900" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"><FaLink size={10} className="text-[#C5A059]" /> Redirect Link</label>
                  <input type="text" name="buttonLink" value={formData.buttonLink} onChange={handleInputChange} placeholder="/shop" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] dark:bg-zinc-950 dark:border-zinc-900 dark:text-white bg-white border-gray-300 text-zinc-900" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">⏱️ Auto-play Delay (ms)</label>
                  <input type="number" name="autoPlaySpeed" value={formData.autoPlaySpeed} onChange={handleInputChange} placeholder="6000" className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] dark:bg-zinc-950 dark:border-zinc-900 dark:text-white bg-white border-gray-300 text-zinc-900" />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"><FaImage size={10} className="text-[#C5A059]" /> Background Image URL (Optional)</label>
                <input type="text" name="bgImage" value={formData.bgImage} onChange={handleInputChange} placeholder="https://images.unsplash.com/photo-..." className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] dark:bg-zinc-950 dark:border-zinc-900 dark:text-white bg-white border-gray-300 text-zinc-900" />
              </div>

              {/* ফর্ম সাবমিশন এবং ডিলিট কন্ট্রোল অ্যাকশন প্যানেল */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t dark:border-zinc-900 border-gray-200">
                {isEditMode && selectedSlide && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedSlide._id)}
                    disabled={actionLoading}
                    className="w-full sm:w-auto px-5 py-3.5 bg-rose-950/40 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold rounded-xl border border-rose-950 flex items-center justify-center gap-2 transition-all"
                  >
                    <FaTrash size={10} /> Delete Entry
                  </button>
                )}

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#C5A059] hover:bg-[#b08e4f] disabled:bg-zinc-800 text-zinc-950 text-xs font-black rounded-xl shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
                >
                  {actionLoading ? <><FaSpinner className="animate-spin" /> Processing...</> : isEditMode ? <><FaSave size={12} /> Save Changes</> : <><FaPlus size={10} /> Save New Banner</>}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminBannerDashboard;