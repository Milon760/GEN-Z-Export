import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            Have a question about a drop, order status, or partnership? Drop us
            a line below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Side */}
          <div className="space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Contact Info
            </h2>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Headquarters
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Phone & WhatsApp
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  +880 1234-567890
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  Email Support
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  support@genzexport.com
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2 bg-zinc-50 dark:bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Order Inquiry #1024"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
