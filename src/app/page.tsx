import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Code2, FileCode2, FileText,
  GitCompareArrows, Layers3, ListFilter, LockKeyhole, MousePointerClick,
  ShieldCheck, Sparkles, WandSparkles, Zap, BookOpen, Type, Bot,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Online Text Tools & Utilities - TxtCraft',
  description: 'Discover TxtCraft, a free browser-based text tools workspace. Create TXT files, convert case, clean lines, compare text, generate files in bulk and more.',
  alternates: { canonical: 'https://txtcraft.site/' },
  openGraph: {
    title: 'TxtCraft - Your Online Text Tools Workspace',
    description: 'A streamlined collection of free browser-based text utilities for writing, formatting, comparing and exporting text.',
    url: 'https://txtcraft.site/',
    type: 'website',
  },
};

const tools = [
  { title: 'TXT File Maker', description: 'Turn your notes or pasted content into downloadable .txt files with flexible encoding options.', href: '/tools/txt-file-maker', icon: FileText, label: 'Create' },
  { title: 'Case Converter', description: 'Switch between uppercase, lowercase, title case and developer-friendly text formats.', href: '/tools/case-converter', icon: Type, label: 'Format' },
  { title: 'Line Tools & Sorter', description: 'Sort lines, remove duplicates, clean whitespace and organize lists in seconds.', href: '/tools/line-tools', icon: ListFilter, label: 'Clean' },
  { title: 'Batch TXT Generator', description: 'Create multiple text files efficiently with reusable patterns and templates.', href: '/tools/batch-generator', icon: Layers3, label: 'Generate' },
  { title: 'Text Diff Checker', description: 'Compare two text blocks and spot changes with a dedicated comparison workflow.', href: '/tools/diff-checker', icon: GitCompareArrows, label: 'Compare' },
  { title: 'Markdown to TXT', description: 'Convert formatted Markdown content into clean plain text.', href: '/tools/markdown-to-txt', icon: FileCode2, label: 'Convert' },
  { title: 'Robots.txt Generator', description: 'Prepare robots.txt directives for your website using a guided builder.', href: '/tools/robots-txt-generator', icon: Bot, label: 'Webmaster' },
];

const benefits = [
  { title: 'Built for your browser', description: 'Open a tool and get started without installing a desktop application.', icon: Zap },
  { title: 'Privacy-minded workflows', description: 'Work with text directly in your browser using lightweight utilities.', icon: ShieldCheck },
  { title: 'One focused workspace', description: 'Find the right utility quickly, with a dedicated page for every task.', icon: WandSparkles },
];

const steps = [
  { number: '01', title: 'Choose a tool', description: 'Browse the collection and open the utility for your task.' },
  { number: '02', title: 'Work with your text', description: 'Paste, write, clean, format or compare content.' },
  { number: '03', title: 'Use your result', description: 'Copy the output or download files where supported.' },
];

const faqs = [
  { question: 'What is TxtCraft?', answer: 'TxtCraft is a free online text tools workspace with dedicated utilities for creating TXT files, converting case, cleaning lines, comparing text and more.' },
  { question: 'Do I need to install software?', answer: 'No. TxtCraft tools run in a modern web browser, so you can get started without a desktop installation.' },
  { question: 'Where can I create a TXT file?', answer: 'Open the dedicated TXT File Maker to write or paste content, select your filename and download a plain text file.' },
  { question: 'Can I use TxtCraft on mobile?', answer: 'Yes. TxtCraft is designed for mobile and desktop browsers, although complex editing is often more comfortable on a larger screen.' },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate border-b border-slate-200/70 dark:border-slate-800/70">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(20,184,166,0.14),transparent_62%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-300">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              YOUR EVERYDAY TEXT WORKSPACE
            </div>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
              Better tools. <span className="bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">Less busywork.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
              A clean, powerful collection of free online text utilities. Create, format, clean, compare and export content in your browser — without a complicated workflow.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="#tools" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5 hover:bg-teal-400">
                Explore all tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/tools/txt-file-maker" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                Create a TXT file <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-500" /> Free to use</span>
              <span className="inline-flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-teal-500" /> No account required</span>
              <span className="inline-flex items-center gap-2"><Code2 className="h-4 w-4 text-teal-500" /> Built for everyday workflows</span>
            </div>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75">
              <div className="mb-3 inline-flex rounded-xl bg-teal-500/10 p-2.5 text-teal-600 dark:text-teal-400"><FileText className="h-5 w-5" /></div>
              <p className="font-semibold text-slate-900 dark:text-white">Create & export</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">From plain text to ready-to-use files.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75">
              <div className="mb-3 inline-flex rounded-xl bg-teal-500/10 p-2.5 text-teal-600 dark:text-teal-400"><ListFilter className="h-5 w-5" /></div>
              <p className="font-semibold text-slate-900 dark:text-white">Clean & transform</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Simplify repetitive formatting tasks.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/75">
              <div className="mb-3 inline-flex rounded-xl bg-teal-500/10 p-2.5 text-teal-600 dark:text-teal-400"><GitCompareArrows className="h-5 w-5" /></div>
              <p className="font-semibold text-slate-900 dark:text-white">Compare & review</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Understand differences at a glance.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">The toolkit</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">Find your next shortcut.</h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">Each utility has its own focused workspace. Pick what you need and get straight to work.</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">{tools.length} free utilities</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-400/60 hover:shadow-xl hover:shadow-teal-500/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-teal-500/60">
                <div className="flex items-start justify-between">
                  <span className="inline-flex rounded-xl bg-teal-500/10 p-3 text-teal-600 dark:text-teal-400"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{tool.label}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">{tool.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">{tool.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-400">Open tool <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Why TxtCraft</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">A simpler way to get things done.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return <div key={benefit.title} className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-950/70">
                <Icon className="h-7 w-7 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{benefit.description}</p>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">How it works</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">Three steps. Zero friction.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => <div key={step.number} className="rounded-2xl border border-slate-200 p-7 dark:border-slate-800">
            <span className="text-3xl font-black text-teal-500/65">{step.number}</span>
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{step.description}</p>
          </div>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 via-slate-100 to-cyan-500/10 p-8 sm:flex-row sm:items-center sm:p-10 dark:via-slate-900">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Keep learning</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">Go beyond the basics.</h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">Explore practical guides and ready-to-use templates for common text workflows.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400"><BookOpen className="h-4 w-4" /> Read guides</Link>
            <Link href="/templates" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"><MousePointerClick className="h-4 w-4" /> Templates</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Frequently asked questions</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Quick answers about the TxtCraft workspace.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => <details key={faq.question} className="group rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-slate-900 marker:hidden dark:text-white">{faq.question}</summary>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{faq.answer}</p>
          </details>)}
        </div>
      </section>
    </div>
  );
}
