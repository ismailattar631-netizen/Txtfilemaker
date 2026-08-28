import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - TxtCraft Pro',
  description: 'Terms and conditions governing the use of TxtCraft Pro web utilities.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-700 dark:text-slate-300 transition-colors">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Terms of Service</h1>
        <p className="text-xs text-slate-500">Effective Date: August 26, 2026</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        <p>
          By accessing or using <strong className="text-slate-900 dark:text-slate-100">TxtCraft Pro</strong>, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Permitted Use</h2>
        <p>
          TxtCraft Pro provides free online tools for text file generation, conversion, and editing.
          You may use these services for personal, educational, commercial, and enterprise tasks.
        </p>

        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. Disclaimer of Warranties</h2>
        <p>
          The services and templates are provided &quot;as is&quot; without warranties of any kind.
          Always maintain backups of important data and verify robots.txt crawler rules before deploying to production.
        </p>
      </div>
    </div>
  );
}