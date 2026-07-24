import React from "react";
import { Sparkles, ShieldCheck, Truck, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-200 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 px-3 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Redefining Street Culture for <br className="hidden sm:inline" />
            <span className="text-amber-500">The Next Generation</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            At GEN-Z Export, we bridge the gap between high-end urban aesthetics
            and everyday wearability. Crafted with precision, designed for
            confidence.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-500" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Premium Quality
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              100% export-grade fabrics engineered for comfort, durability, and
              modern fits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <Users className="w-8 h-8 text-amber-500" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Gen-Z Centric
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Inspired by global street trends, dynamic drops, and timeless
              ethnic fusion like Elite Panjabis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Ethical Production
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Fair trade practices and sustainable manufacturing standards from
              Dhaka to the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
