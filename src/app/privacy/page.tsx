import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - TxtCraft',
  description: 'Our privacy commitment: zero tracking, client-side data isolation, and full transparency.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-700 dark:text-slate-300 transition-colors">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: August 26, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        <p>
          At <strong className="text-slate-900 dark:text-slate-100">TxtCraft</strong>, we believe privacy is a fundamental human right.
          This Privacy Policy outlines how our tools handle your text files and information.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Client-Side Data Processing</h2>
        <p>
          When you use the TxtCraft editor, Case Converter, Line Sorter, or Batch Generator in standard mode,
          all text manipulation and file creation occurs locally inside your web browser’s memory.
          Your text is never sent to, stored on, or inspected by our servers.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. Cookies and Analytics</h2>
        <p>
          We do not use tracking cookies, behavioral tracking pixels, or third-party marketing identifiers.
          We use localStorage solely to remember your theme preference (Dark/Light mode).
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">3. Contact Us</h2>
        <p>
          If you have questions regarding this Privacy Policy, you can reach out via privacy@txtcraft.site.
        </p>
      </div>
    </div>
  );
}