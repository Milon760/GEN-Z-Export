import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";

import { useAdmin } from "../../context/AdminContext";

const Users = () => {
  const {
    allUser = [],
    isLoading,
    userPagination = { totalUser: 0, currentPage: 1, totalPages: 1 },
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Open Modal For Add
  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", phone: "", address: "" });
    setIsModalOpen(true);
  };

  // Open Modal For Edit
  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });
    setIsModalOpen(true);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let res;
      if (editingUser) {
        res = await updateUser(editingUser._id, formData);
      } else {
        res = await addUser(formData);
      }

      if (res?.success) {
        setIsModalOpen(false);
        setFormData({ name: "", email: "", phone: "", address: "" });
      } else {
        alert(res?.message || "Operation failed!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteUser(id);
    }
  };

  // Page Click Handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= userPagination.totalPages) {
      fetchUsers(page);
    }
  };

  // Filtered List
  const filteredUsers = allUser.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phone?.toString().includes(searchTerm),
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
              <FaUsers className="size-6" />
            </div>
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Total Users:{" "}
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {userPagination.totalUser || allUser.length || 0}
            </span>
          </p>
        </div>

        {/* Search & Add Action */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700/60 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-20 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <FaSpinner className="animate-spin text-amber-500 size-8 mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <FaUser className="mx-auto size-10 mb-2 text-slate-300 dark:text-zinc-700" />
          <p className="text-sm font-semibold text-slate-600 dark:text-zinc-400">
            No Users Found
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200 dark:border-zinc-800">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-xs sm:text-sm">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-500/15 text-amber-600 font-bold flex items-center justify-center text-sm">
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-zinc-100">
                            {user.name || "N/A"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            ID: {user._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-3.5 space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-300">
                        <FaEnvelope className="text-slate-400 size-3" />
                        <span>{user.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-300 font-mono">
                        <FaPhone className="text-slate-400 size-3" />
                        <span>{user.phone || "N/A"}</span>
                      </div>
                    </td>

                    <td className="px-6 py-3.5 text-xs text-slate-500 dark:text-zinc-400 max-w-[200px] truncate">
                      {user.address || "No address provided"}
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-all"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-all"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-600 font-bold flex items-center justify-center text-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-zinc-100">
                        {user.name || "N/A"}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-mono">
                        #{user._id?.slice(-6)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(user)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id, user.name)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-zinc-300">
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-slate-400 size-3 shrink-0" />
                    <span className="truncate">{user.email || "N/A"}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono">
                    <FaPhone className="text-slate-400 size-3 shrink-0" />
                    <span>{user.phone || "N/A"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-slate-400 size-3 shrink-0" />
                    <span className="truncate">{user.address || "N/A"}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 📄 Pagination Navigation (Fixed Number & Action Buttons) */}
          {userPagination.totalPages >= 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
              <span className="text-xs text-slate-500 dark:text-zinc-400">
                Page{" "}
                <strong className="text-slate-900 dark:text-zinc-100">
                  {userPagination.currentPage}
                </strong>{" "}
                of{" "}
                <strong className="text-slate-900 dark:text-zinc-100">
                  {userPagination.totalPages}
                </strong>
              </span>

              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <button
                  onClick={() =>
                    handlePageChange(userPagination.currentPage - 1)
                  }
                  disabled={userPagination.currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 disabled:opacity-40"
                >
                  <FaChevronLeft size={10} /> Prev
                </button>

                {/* Page Numbers */}
                {Array.from(
                  { length: userPagination.totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-7 h-7 text-xs font-bold rounded-xl transition-all ${
                      page === userPagination.currentPage
                        ? "bg-amber-500 text-zinc-950 shadow-xs"
                        : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() =>
                    handlePageChange(userPagination.currentPage + 1)
                  }
                  disabled={
                    userPagination.currentPage === userPagination.totalPages
                  }
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 disabled:opacity-40"
                >
                  Next <FaChevronRight size={10} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingUser ? "Edit User" : "Add New User"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Address
                </label>
                <textarea
                  placeholder="Full address"
                  rows={2}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs rounded-xl shadow-md active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting && <FaSpinner className="animate-spin" />}
                  {editingUser ? "Update User" : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
