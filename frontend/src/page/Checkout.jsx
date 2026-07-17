import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingBag, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaTruck, FaMoneyBillWave, FaMobileAlt, FaCopy, FaClipboardCheck } from 'react-icons/fa';

const Checkout = () => {
  // ১. ডামি কার্ট ডাটা (যা আপনার গ্লোবাল স্টেট থেকে পাবেন)
  const [cartItems] = useState([
    {
      id: 1,
      name: "Premium Slim Fit Cotton Shirt",
      category: "shirt",
      price: 1450,
      currency: "BDT",
      size: "M",
      color: "Sky Blue",
      quantity: 1,
      image: "/shirt.jpg",
    },
    {
      id: 2,
      name: "Casual Denim Jacket",
      category: "jacket",
      price: 2450,
      currency: "BDT",
      size: "XL",
      color: "Navy Blue",
      quantity: 2,
      image: "/jacket.jpg",
    }
  ]);

  // ২. স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dhaka',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod or mobile_pay
  const [copied, setCopied] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // ৩. ডেলিভারি ও অর্ডার হিসাব নিকাশ
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = formData.city === 'Dhaka' ? 60 : 120; // ঢাকা সিটির ভেতর ৬০ টাকা, বাইরে ১২০ টাকা
  const total = subtotal + shippingFee;

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ৪. অর্ডার প্লেস বাটন লজিক
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('অনুগ্রহ করে নাম, ফোন নাম্বার এবং ঠিকানা সঠিকভাবে পূরণ করুন।');
      return;
    }

    // ইউনিক অর্ডার আইডি জেনারেট (উদা: PKG-2026-X83F)
    const randomId = `PKG-2026-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setOrderId(randomId);
    
    // কার্ট ক্লিয়ার লজিক এখানে কল করবেন (উদা: clearCart())
    setOrderSuccess(true);
  };

  // ৫. কপি ট্র্যাকিং আইডি ফাংশন
  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ==========================================================
     🎉 অর্ডার কনফার্মেশন সফল হলে এই ডিজাইনটি দেখাবে
     ========================================================== */
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-6 md:p-8 rounded-3xl shadow-lg text-center space-y-6">
          
          {/* সাকসেস অ্যানিমেটেড আইকন */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-100 dark:border-emerald-900/30">
              <FaCheckCircle size={32} className="animate-bounce" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white">Order Confirmed!</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Thank you, <span className="font-bold text-slate-800 dark:text-zinc-200">{formData.name}</span>! Your order has been placed successfully and is being processed.
            </p>
          </div>

          {/* 🎫 অর্ডার মেমো বক্স */}
          <div className="bg-slate-50 dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-4 text-left space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-zinc-800 text-xs">
              <span className="text-slate-400">Order ID:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-800 dark:text-zinc-100">{orderId}</span>
                <button 
                  onClick={copyToClipboard}
                  className="text-slate-400 hover:text-[#C5A059] transition-colors p-1"
                  title="Copy ID"
                >
                  {copied ? <FaClipboardCheck className="text-emerald-500" /> : <FaCopy />}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                <FaUser size={10} className="text-[#C5A059]" /> <strong>Name:</strong> {formData.name}
              </p>
              <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                <FaPhone size={10} className="text-[#C5A059]" /> <strong>Phone:</strong> {formData.phone}
              </p>
              <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                <FaMapMarkerAlt size={10} className="text-[#C5A059]" /> <strong>Address:</strong> {formData.address}, {formData.city}
              </p>
              <p className="text-slate-500 dark:text-zinc-400 flex items-center gap-2">
                <FaTruck size={10} className="text-[#C5A059]" /> <strong>Delivery Mode:</strong> {formData.city === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'} (2-4 Days)
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/40 dark:border-zinc-800 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Total Paid/COD:</span>
              <span className="text-base font-black text-[#C5A059]">{total} BDT</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              to="/" 
              className="flex-1 py-3 bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-900 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold rounded-xl transition-all shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================
     ✍️ অর্ডার সম্পন্ন করার আগের চেকআউট ফর্ম ডিজাইন
     ========================================================== */
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 🏷️ পেজ হেডার */}
        <div className="mb-8 border-b border-slate-200/40 dark:border-zinc-800 pb-5">
          <h1 className="text-2xl font-black text-slate-950 dark:text-white">Checkout</h1>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">Please provide your valid delivery information to place your order.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 📝 ১. বাম পাশ (২ কলাম): ডেলিভারি ইনফরমেশন ও পেমেন্ট */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ডেলিভারি ডিটেইলস কার্ড */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
                <FaTruck className="text-[#C5A059]" /> Delivery Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* নাম */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <FaUser size={10} /> Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name" 
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* ফোন */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <FaPhone size={10} /> Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 017XXXXXXXX" 
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* ইমেইল */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <FaEnvelope size={10} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. name@example.com" 
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* ডেলিভারি এলাকা (সিটি) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <FaMapMarkerAlt size={10} /> City / Region <span className="text-rose-500">*</span>
                  </label>
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Dhaka">Inside Dhaka (60 BDT)</option>
                    <option value="Outside Dhaka">Outside Dhaka (120 BDT)</option>
                  </select>
                </div>

                {/* বিস্তারিত ঠিকানা */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <FaMapMarkerAlt size={10} /> Detailed Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="House no, Road no, Area details..." 
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-[#C5A059] resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* পেমেন্ট মেথড কার্ড */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
                <FaMoneyBillWave className="text-[#C5A059]" /> Choose Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* ক্যাশ অন ডেলিভারি */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`border-2 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all
                    ${paymentMethod === 'cod' 
                      ? 'border-[#C5A059] bg-[#C5A059]/5' 
                      : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'}`}
                >
                  <div className="text-slate-700 dark:text-zinc-300">
                    <FaMoneyBillWave size={22} className={paymentMethod === 'cod' ? 'text-[#C5A059]' : ''} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-950 dark:text-white">Cash On Delivery</h3>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">Pay after receiving order</p>
                  </div>
                </div>

                {/* মোবাইল ব্যাংকিং পেমেন্ট */}
                <div 
                  onClick={() => setPaymentMethod('mobile_pay')}
                  className={`border-2 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer transition-all
                    ${paymentMethod === 'mobile_pay' 
                      ? 'border-[#C5A059] bg-[#C5A059]/5' 
                      : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'}`}
                >
                  <div className="text-slate-700 dark:text-zinc-300">
                    <FaMobileAlt size={22} className={paymentMethod === 'mobile_pay' ? 'text-[#C5A059]' : ''} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-950 dark:text-white">bKash / Nagad / Rocket</h3>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">Online secure mobile banking</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 💵 ২. ডান পাশ (১ কলাম): অর্ডার সামারি প্যানেল */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 p-5 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-950 dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800">
                Product Summary
              </h3>

              {/* শর্ট কার্ট আইটেম প্রিভিউ */}
              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-slate-200/35 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-zinc-200 line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Qty: {item.quantity} | Size: {item.size}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-zinc-100 shrink-0">
                      {item.price * item.quantity} BDT
                    </span>
                  </div>
                ))}
              </div>

              {/* সামারি ম্যাথ ক্যালকুলেশন */}
              <div className="space-y-2.5 text-xs pt-3 border-t border-slate-100 dark:border-zinc-800">
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">{subtotal} BDT</span>
                </div>
                
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">{shippingFee} BDT</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-baseline">
                <span className="text-xs font-black text-slate-950 dark:text-white">Grand Total</span>
                <span className="text-lg font-black text-[#C5A059]">{total} BDT</span>
              </div>

              {/* সাবমিট বাটন */}
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A059] hover:bg-[#b08e4f] text-zinc-950 text-xs font-black rounded-xl transition-all shadow-md shadow-[#C5A059]/10"
              >
                <FaShoppingBag size={11} /> Place Order ({total} BDT)
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;