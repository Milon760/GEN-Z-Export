import React, { useState } from 'react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // আপলোডের আগে ছবির প্রিভিউ দেখার জন্য
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে আপনার ফর্ম ডাটা এবং ইমেজ Backend API-তে পাঠানোর লজিক লিখবেন (FormData ব্যবহার করে)
    console.log("Form Data:", formData);
    console.log("Uploaded Image:", image);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
            Create New Product
          </h2>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1 text-center sm:text-left">
            Fill up the details below to add a new product to your inventory.
          </p>
        </div>

        {/* Form Starts */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Grid Layout: Mobile = 1 column, Tablet/Laptop = 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
              <input
                type="text" name="id" required value={formData.id} onChange={handleInputChange}
                placeholder="e.g. 2005"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text" name="name" required value={formData.name} onChange={handleInputChange}
                placeholder="e.g. Premium Panjabi"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category" required value={formData.category} onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none bg-white"
              >
                <option value="">Select Category</option>
                <option value="panjabi">Panjabi</option>
                <option value="shirt">Shirt</option>
                <option value="tshirt">T-Shirt</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (BDT) *</label>
              <input
                type="number" name="price" required value={formData.price} onChange={handleInputChange}
                placeholder="e.g. 850"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (BDT) *</label>
              <input
                type="number" name="original_price" required value={formData.original_price} onChange={handleInputChange}
                placeholder="e.g. 1020"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
              <input
                type="number" name="stock" required value={formData.stock} onChange={handleInputChange}
                placeholder="e.g. 80"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colors (Comma separated) *</label>
              <input
                type="text" name="colors" required value={formData.colors} onChange={handleInputChange}
                placeholder="blue, red, white"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (Comma separated) *</label>
              <input
                type="text" name="size" required value={formData.size} onChange={handleInputChange}
                placeholder="M, L, XL"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            {/* Rating */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0 - 5) *</label>
              <input
                type="number" step="0.1" max="5" min="0" name="rating" required value={formData.rating} onChange={handleInputChange}
                placeholder="e.g. 4.5"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
              />
            </div>

            {/* Image Upload Area */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition cursor-pointer relative">
                <input
                  type="file" accept="image/*" required onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center text-center sm:text-left sm:items-start">
                  <span className="text-indigo-600 font-medium text-sm">Click to upload image</span>
                  <span className="text-gray-500 text-xs mt-1">Supports PNG, JPG (Max 3MB)</span>
                </div>
                
                {/* Image Preview Box */}
                {preview && (
                  <div className="mt-2 sm:mt-0 sm:ml-auto w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex-shrink-0">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description" required rows="4" value={formData.description} onChange={handleInputChange}
                placeholder="Write product description here..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none resize-none"
              ></textarea>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
            >
              Publish Product
            </button>
          </div>

        </form>
        {/* Form Ends */}

      </div>
    </div>
  );
};

export default ProductCreate;
