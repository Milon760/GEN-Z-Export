import React from "react";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <RefreshCw className="w-10 h-10 text-amber-500 mx-auto" />
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            7-Day Easy Exchange Policy
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Hassle-free size or item replacements for your peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-emerald-500 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Eligible For Exchange</span>
            </div>
            <ul className="text-sm space-y-2 text-zinc-600 dark:text-zinc-400 list-disc list-inside">
              <li>Item has sizing issues.</li>
              <li>Defective or damaged product received.</li>
              <li>Unwashed, unworn, with original tags intact.</li>
              <li>Requested within 7 days of delivery.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-500 font-bold">
              <AlertCircle className="w-5 h-5" />
              <span>Non-Returnable</span>
            </div>
            <ul className="text-sm space-y-2 text-zinc-600 dark:text-zinc-400 list-disc list-inside">
              <li>Items without original tags or packaging.</li>
              <li>Products marked under clearance or final sale.</li>
              <li>Washed, worn, or altered apparel.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
