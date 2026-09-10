import { createContext, useContext, useEffect, useState } from "react";
import API from "../helper/API";

export const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [allUser, setAllUser] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPagination, setUserPagination] = useState({
    totalUser: 0,
    currentPage: 1,
    totalPages: 1,
  });

  console.log(userPagination.totalUser);

  // ------------------- user call function -----------

  // 👥 ১. ইউজার ডাটা fetch করার ফাংশন
  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await API.get(`/admin/users?page=${page}`);
      const data = response.data;

      console.log("data user", data);

      if (data.success) {
        setAllUser(data.payload.users || []);
        if (data.payload.pagination) {
          setUserPagination({
            totalUser: data.payload.pagination.totalUser,
            currentPage: Number(data.payload.pagination.currentPage),
            totalPages: Number(data.payload.pagination.totalPage) || 1,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 👤 ২. নতুন ইউজার অ্যাড
  const addUser = async (userData) => {
    try {
      const response = await API.post("/admin/users/add", userData);

      if (response.data.success) {
        // ১ নম্বর পেজে নতুন ডাটা রিফেচ হবে
        await fetchUsers(1);
        return { success: true, message: "User added successfully!" };
      }
      return {
        success: false,
        message: response.data.message || "Failed to add user",
      };
    } catch (error) {
      console.error("Error adding user:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Server error",
      };
    }
  };

  // ✏️ ৩. ইউজার আপডেট
  const updateUser = async (id, updatedData) => {
    try {
      const response = await API.put(`/admin/users/${id}`, updatedData);
      if (response.data.success) {
        // ইনস্ট্যান্ট লোকাল স্টেট আপডেট (লাইভ ফিডব্যাক)
        setAllUser((prev) =>
          prev.map((u) => (u._id === id ? { ...u, ...updatedData } : u)),
        );
        // ব্যাকএন্ড থেকে তাজা ডাটা ফেচ
        fetchUsers(userPagination.currentPage || 1);
        return { success: true, message: "User updated successfully!" };
      }
      return {
        success: false,
        message: response.data.message || "Update failed",
      };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Server error",
      };
    }
  };

  // 🗑️ ৪. ইউজার ডিলিট
  const deleteUser = async (id) => {
    try {
      const response = await API.delete(`/admin/users/${id}`);
      if (response.data.success) {
        setAllUser((prev) => prev.filter((user) => user._id !== id));
        fetchUsers(userPagination.currentPage || 1);
        return { success: true, message: "User deleted successfully!" };
      }
      return {
        success: false,
        message: response.data.message || "Delete failed",
      };
    } catch (error) {
      console.error("Error deleting user:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Server error",
      };
    }
  };

  // ------------------- user call function -----------

  // ------------------- products call function -----------

  // 📦 ৫. প্রোডাক্ট ও অর্ডার ফেচ
  const fetchProducts = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await API.get(
        `/admin/products?search=${query}&limit=20`,
      );
      console.log("responce products", response);

      if (response.data.success) {
        setAllProduct(response.data.payload.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const response = await API.put(`/admin/products/${id}`, updatedData);
      if (response.data.success || response.status === 200) {
        setAllProduct((prev) =>
          prev.map((p) => (p._id === id ? { ...p, ...updatedData } : p)),
        );
        return { success: true, message: "Product updated successfully!" };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await API.delete(`/admin/products/${id}`);
      if (response.data.success || response.status === 200) {
        setAllProduct((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // -------------- products -------

  const createProduct = async (productData) => {
    try {
      const res = await API.post("/admin/products/create", productData);

      console.log(res, "res create");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------- products call function -----------

  // ------------------- banner call function -----------

  // ------------------- banner call function -----------

  const fetchOrders = async () => {
    try {
      const response = await API.get("/admin/products/orders");
      if (response.data.success) {
        setAllOrder(response.data.payload.orderHistory || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(1);
    fetchProducts();
    fetchOrders();
  }, []);

  const value = {
    allUser,
    allProduct,
    allOrder,
    isLoading,
    userPagination,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    fetchProducts,
    updateProduct,
    deleteProduct,
    fetchOrders,
    //
    createProduct,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
