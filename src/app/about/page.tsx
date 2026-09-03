import type { Metadata } from 'next';
import { FileText, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About TxtCraft - High Performance Plain Text Studio',
  description: 'Learn about the mission, engineering philosophy, and privacy-first architecture of TxtCraft.',
  alternates: {
    canonical: 'https://txtcraft.site/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 transition-colors">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          Our Mission & Standards
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          About TxtCraft
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          TxtCraft was created with a single objective: to build the most versatile, high-precision,
          and privacy-respecting plain text workspace on the web.
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">The Plain Text Philosophy</h2>
        <p className="text-slate-600 dark:text-slate-400">
          In an era where document formats are increasingly bloated with complex binary abstractions and vendor lock-in,
          plain text remains the universal gold standard for transparency, durability, and computational efficiency.
          Every developer, system administrator, copywriter, and data engineer relies on text files daily.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Engineering Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              100% Privacy by Default
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              All editing, character conversions, regex find-and-replace, and line sorting occur client-side in your browser.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Zero Bloat & Peak Speed
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Ultra-lean Web Worker pipelines ensure instant file downloads and smooth 60fps typing responsiveness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}