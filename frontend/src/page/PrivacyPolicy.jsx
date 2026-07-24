import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Last Updated: July 2026</p>
        </div>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              1. Information We Collect
            </h2>
            <p>
              When you visit GEN-Z Export or place an order, we collect
              information such as your name, shipping address, phone number, and
              payment details (via bKash, Nagad, or Cards) to process your order
              seamlessly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              2. How We Use Your Data
            </h2>
            <p>
              Your data is strictly used to fulfill purchases, process
              exchanges, provide order tracking, and keep you updated on
              upcoming limited drops if you subscribe to our crew list.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              3. Data Security
            </h2>
            <p>
              We implement industry-standard encryption to protect your personal
              details during checkout and account creation. We never sell or
              share your private data with unauthorized third parties.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
