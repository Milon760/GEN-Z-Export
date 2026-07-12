import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ১. ডাটা ফেচ করার কমন ফাংশন
  const fetchProducts = async (query = '') => {
    setIsLoading(true);
    try {
      // আপনার ব্যাকএন্ড যেভাবে সার্চ হ্যান্ডেল করে সেই অনুযায়ী URL
      const url = `http://localhost:5000/api/products?search=${query}&limit=5`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.payload && data.payload.products) {
        setProducts(data.payload.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ২. প্রথমবার পেজ লোড হলে সব প্রোডাক্ট আসবে
  useEffect(() => {
    fetchProducts();
  }, []);

  // ৩. সার্চ বাটনে ক্লিক করলে কাজ করবে
  const handleSearch = () => {
    fetchProducts(searchQuery);
  };

  return (
    <div className="p-5">
      <h2 className='text-amber-600 text-2xl text-center font-bold'>Admin Dashboard</h2>

      <div className='flex justify-center my-10'>
        <input
          type="text"
          placeholder='Search by Title or Description...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // স্টেট আপডেট
          className='border w-full max-w-xl outline-0 py-2 px-4 rounded-l-xl'
        />
        <button
          onClick={handleSearch}
          className='bg-amber-600 text-white rounded-r-xl px-6 py-2 hover:bg-amber-700 transition'
        >
          Search
        </button>
      </div>

      <div className='overflow-x-auto'>
        {isLoading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <table className='w-full text-left border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border p-3'>Product Name</th>
                <th className='border p-3 text-center'>Price</th>
                <th className='border p-3 text-center'>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className='p-3 border'>{product.title}</td>
                    <td className='p-3 border text-center'>${product.price}</td>
                    <td className='p-3 border text-center'>{product.stock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-5 text-red-500">No products found!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;
