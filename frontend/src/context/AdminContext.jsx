import React, { createContext, useEffect, useState } from 'react';
import API from '../helper/API'; // আপনার নিজস্ব Axios ইন্টারসেপ্টর/হেল্পার

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  // 📦 গ্লোবাল স্টেটসমূহ
  const [allUser, setAllUser] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPagination, setUserPagination] = useState({ totalUser: 0, currentPage: 1, totalPages: 1 });

  // 👥 ১. ইউজার ডাটা ফেচ করার ফাংশন (পেজিনেশন সাপোর্ট সহ)
  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await API.get(`http://localhost:5000/auth/users?page=${page}`);
      const data = response.data;

      if (data.success) {
        setAllUser(data.payload.users || []);
        if (data.payload.pagination) {
          setUserPagination(data.payload.pagination);
        }
      } else {
        console.log('Users fetch failed');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 📦 ২. প্রোডাক্ট ডাটা ফেচ এবং লাইভ সার্চ করার ফাংশন
  const fetchProducts = async (query = '') => {
    setIsLoading(true);
    try {
      // সার্চ কুয়েরি থাকলে সেটি ব্যাকএন্ডে পাঠানো হবে
      const response = await API.get(`http://localhost:5000/api/products?search=${query}&limit=20`);
      const data = response.data;

      if (data.success) {
        setAllProduct(data.payload.products || []);
      } else {
        setAllProduct([]);
        console.log('Products fetch failed');
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setAllProduct([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🚚 ৩. অর্ডার হিস্ট্রি ফেচ করার ফাংশন
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await API.get('http://localhost:5000/api/products/orders');
      const data = response.data;

      if (data.success) {
        setAllOrder(data.payload.orderHistory || []);
      } else {
        console.log('Orders fetch failed');
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 📝 ৫. প্রোডাক্ট আপডেট করার অ্যাকশন ফাংশন
  const updateProduct = async (id, updatedData) => {
    setIsLoading(true);
    try {
      const response = await API.put(`http://localhost:5000/api/products/${id}`, updatedData);

      if (response.data.success || response.status === 200) {
        // স্টেট থেকে ওই প্রোডাক্টের ডেটা ইনস্ট্যান্ট আপডেট করা
        setAllProduct((prev) =>
          prev.map((product) => (product._id === id ? { ...product, ...updatedData } : product))
        );
        return { success: true, message: "Product updated successfully!" };
      } else {
        return { success: false, message: response.data.message || "Update failed" };
      }
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: error.message || "Server Error" };
    } finally {
      setIsLoading(false);
    }
  };

  // 🗑️ ৪. প্রোডাক্ট ডিলিট করার অ্যাকশন ফাংশন
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await API.delete(`http://localhost:5000/api/products/${id}`);
      if (response.data.success || response.status === 200) {
        // স্টেট থেকে সাথে সাথে প্রোডাক্টটি রিমুভ করা
        setAllProduct((prev) => prev.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 🔄 প্রথমবার পেজ লোড হলে সব ডেটা একসাথে কল হবে
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []);

  // 🤝 গ্লোবাল কন্টেক্সট ভ্যালু যা সব কম্পোনেন্ট ব্যবহার করতে পারবে
  const allAdminData = {
    allUser,
    allProduct,
    allOrder,
    isLoading,
    userPagination,
    fetchUsers,
    fetchProducts,
    fetchOrders,
    updateProduct,
    deleteProduct
  };

  return (
    <AdminContext.Provider value={allAdminData}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;