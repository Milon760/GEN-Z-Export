import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
// Sonner থেকে Toaster ইমপোর্ট করুন
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className="bg-white dark:bg-black">
      {/* ১. টোস্টারটি এখানে রাখুন যেন পুরো ওয়েবসাইটের সব পেজ থেকে এটি কাজ করে */}
      <Toaster position="top-right" richColors closeButton />

      <Navbar />
      <ScrollRestoration />

      {/* আপনার সব পেজ বা রাউট এই Outlet এর জায়গায় লোড হবে */}
      <Outlet />

      <Footer />
    </div>
  );
};

export default Root;
