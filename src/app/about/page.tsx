import type { Metadata } from 'next';
import { FileText, Shield, Zap, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About TxtCraft Team',
  description: 'Learn what TxtCraft is, how it works, and how the TxtCraft Team handles your text.',
  alternates: {
    canonical: 'https://txtcraft.site/about',
  },
  openGraph: {
    title: 'About TxtCraft Team',
    description: 'Learn what TxtCraft is, how it works, and how the TxtCraft Team handles your text.',
  },
  twitter: {
    card: 'summary',
    title: 'About TxtCraft Team',
    description: 'Learn what TxtCraft is, how it works, and how the TxtCraft Team handles your text.',
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
          TxtCraft is a free collection of online plain-text tools. You can write, convert, sort,
          clean up, and download .txt files right in your browser — no sign-up, no downloads,
          no cost. The site is run by the TxtCraft Team, who keep the tools working and easy to use.
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Why Plain Text</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Plain text is the simplest, most reliable file format there is. It opens on every computer,
          phone, and operating system, it never becomes unreadable because some company discontinued
          a program, and it is easy to copy, edit, and share. Writers, developers, students,
          and office workers all use .txt files every day — and that is exactly who these tools
          are made for.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Your Text Stays on Your Device
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Editing, case conversions, find-and-replace, and line sorting all happen inside your
              browser. Your text is never sent to our servers, stored anywhere, or looked at by us.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Simple and Fast
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              The tools are kept lightweight on purpose, so pages load quickly and files download
              instantly — even on slower connections.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">What You Can Do Here</h2>
        <p className="text-slate-600 dark:text-slate-400">
          The site includes a free online notepad for writing and downloading .txt files, a batch
          generator for creating many files at once, and small helpers like a case converter,
          line sorter and deduplicator, text diff checker, markdown-to-plain-text converter, and
          a robots.txt builder. There are also ready-made templates and guides if you want a
          starting point. Everything is free to use, and you can find more details in our{' '}
          <a href="/privacy" className="text-teal-600 dark:text-teal-400 underline underline-offset-2">
            Privacy Policy
          </a>.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Contact</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Have a question about the tools, spot a bug, or want to suggest a new feature? The
          TxtCraft Team would like to hear from you. Reach us at{' '}
          <a
            href="mailto:privacy@txtcraft.site"
            className="text-teal-600 dark:text-teal-400 underline underline-offset-2 inline-flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            privacy@txtcraft.site
          </a>.
        </p>
      </div>
    </div>
  );
}
