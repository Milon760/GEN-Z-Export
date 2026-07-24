import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../src/context/ProductContext';
import ProductsFilter from '../src/helper/ProductsFilter';
import GlobalLoader from '../src/components/GlobalLoader';

import productsDataJson from './products.json'

const Shop = () => {




  return (
    <div className='m'>
      <h2 className='text-amber-600 text-2xl text-center'>Products page</h2>
       
       <ProductsFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

      <div className=''>
        {
          allProduct.map((product) => (<div key={product._id} className='border border-amber-500 m-5 p-5'>
            <img src={product.image[0]} alt="products image" />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <button>Add to Cart</button>
          </div>))
        }
      </div>
    </div>
  )
}

export default Shop;





// import React, { useState, useEffect, useContext } from 'react';
// import { ProductContext } from '../context/ProductContext';
// import ProductsFilter from '../helper/ProductsFilter';

// const Shop = () => {

//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const { products } = useContext(ProductContext);
 

//   // ক্যাটাগরি ফিল্টার হ্যান্ডলার
//   const filteredProducts = selectedCategory === 'all'
//     ? products
//     : products.filter(p => p.category === selectedCategory);

//   return (
//     <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-12 font-sans">
//       <div className="max-w-7xl mx-auto">

//         {/* Page Title */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
//             Our Premium Collection
//           </h1>
//           <p className="text-gray-500 mt-2 text-sm md:text-base">
//             Discover the best Panjabi, Shirts, Pants, and T-Shirts tailored for you.
//           </p>
//         </div>

//         {/* Category Filters */}
//        <ProductsFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

//         {/* Product Grid */}
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-20 text-gray-500">No products found.</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {filteredProducts.map((product) => {
//               // ডিসকাউন্ট পার্সেন্টেজ হিসাব
//               const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

//               return (
//                 <div
//                   key={product.id || product._id}
//                   className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col group"
//                 >
//                   {/* Product Image & Badge */}
//                   <div className="relative bg-gray-100 pt-[100%] overflow-hidden">
//                     <img
//                       src={product.image || 'https://placeholder.com'}
//                       alt={product.name}
//                       className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     {discount > 0 && (
//                       <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
//                         {discount}% OFF
//                       </span>
//                     )}
//                     <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
//                       ⭐ {product.rating || '4.5'}
//                     </span>
//                   </div>

//                   {/* Product Details */}
//                   <div className="p-5 flex flex-col flex-grow">
//                     <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
//                       {product.category}
//                     </span>
//                     <h2 className="text-gray-800 font-semibold text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
//                       {product.name}
//                     </h2>
//                     <p className="text-gray-400 text-xs mt-1 line-clamp-2 flex-grow">
//                       {product.description}
//                     </p>

//                     {/* Price Block */}
//                     <div className="flex items-baseline gap-2 mt-4">
//                       <span className="text-xl font-bold text-gray-900">
//                         ৳{product.price.toLocaleString()}
//                       </span>
//                       {product.original_price > product.price && (
//                         <span className="text-sm text-gray-400 line-through">
//                           ৳{product.original_price.toLocaleString()}
//                         </span>
//                       )}
//                     </div>

//                     {/* Action Button */}
//                     <button className="w-full mt-5 bg-gray-900 hover:bg-blue-600 text-white font-medium text-sm py-3 rounded-xl transition-colors duration-300 flex justify-center items-center gap-2">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Shop;
