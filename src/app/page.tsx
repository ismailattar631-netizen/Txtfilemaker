'use client';

import { useState } from 'react';
import Link from 'next/link';
import TxtEditor from '@/components/editor/TxtEditor';
import FaqSection from '@/components/seo/FaqSection';
import { TEMPLATES } from '@/lib/templates-data';
import {
  Sparkles,
  Layers,
  FileCheck2,
  Cpu,
  Shield,
  Zap,
  Globe,
  Sliders,
  ArrowRight,
  Type,
  ListTree,
  Bot,
  FileCode,
  GitCompare,
} from 'lucide-react';

const SAMPLE_TEXT = `========================================================================
                      WELCOME TO TXTCRAFT PRO
            The High-Performance Plain Text (.txt) Studio
========================================================================

TxtCraft Pro is a fast, full-featured online workspace designed for 
developers, webmasters, writers, and data specialists.

[KEY CAPABILITIES]
* Real-time metrics: Character counts, word tally, line count & exact bytes
* Custom Encodings : UTF-8, UTF-8 with BOM, UTF-16LE, Windows-1252 & ASCII
* Line Endings     : Seamless toggle between Windows CRLF (\\r\\n) & Unix LF (\\n)
* Line Manipulation: Sort alphabetically, remove duplicates, trim whitespace
* Find & Replace   : Regex support with live match counter and case toggle
* Batch Creator    : Generate up to 500+ text files with custom variables & zip

[GET STARTED]
1. Edit or replace this text directly in the monospace editor above.
2. Choose your preferred file name, encoding, and line ending in the toolbar.
3. Click "Download .txt" (or press Ctrl+S) to save instantly to your computer.
4. Try loading ready-to-use templates like robots.txt or README below!
========================================================================`;

export default function HomePage() {
  const [editorText, setEditorText] = useState(SAMPLE_TEXT);
  const [currentFilename, setCurrentFilename] = useState('welcome.txt');

  const loadTemplate = (slug: string) => {
    const t = TEMPLATES.find((item) => item.slug === slug);
    if (t) {
      setEditorText(t.content);
      setCurrentFilename(t.defaultFilename);
    }
  };

  const homeFaqs = [
    {
      question: 'What is TxtCraft Pro?',
      answer: 'TxtCraft Pro is a professional browser-based plain text file maker and manipulation studio. It enables users to create, format, clean, convert, and batch-produce .txt files with precision encoding and line-ending controls.',
    },
    {
      question: 'Are my text files uploaded or stored on any server?',
      answer: 'No! When using the standard TxtCraft text editor and client tools, 100% of the processing happens directly in your browser using modern Web APIs. Your text never leaves your device unless you explicitly invoke backend streaming endpoints.',
    },
    {
      question: 'Can I choose between Windows CRLF and Linux LF line breaks?',
      answer: 'Yes. The status bar and toolbar include an instant line-ending switch between Windows CRLF (\\r\\n) and Unix/Linux/macOS LF (\\n), eliminating cross-platform shell script errors.',
    },
    {
      question: 'How do I generate text files in bulk?',
      answer: 'Visit our dedicated Batch TXT Generator tool. You can define a custom pattern with placeholder tokens (such as {id} or {name}) and generate hundreds of unique text files compiled into a single downloadable .ZIP archive.',
    },
    {
      question: 'What character encodings are supported?',
      answer: 'TxtCraft Pro supports standard UTF-8, UTF-8 with Byte Order Mark (BOM for legacy Excel/Notepad), UTF-16LE, UTF-16BE, Windows-1252 (ANSI), and 7-bit ASCII.',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Generation Plain Text Studio & Generator
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight max-w-4xl mx-auto leading-tight">
            Create, Edit & Batch Generate{' '}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Plain Text (.txt) Files
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The ultra-fast online text file maker. Precision encoding support (UTF-8, UTF-16, ANSI),
            CRLF/LF line endings, deduplication, regex find-and-replace, and instant batch exports.
          </p>
        </div>
      </section>

      {/* Main Interactive Studio Editor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <TxtEditor
          initialText={editorText}
          initialFilename={currentFilename}
          className="shadow-2xl ring-1 ring-slate-800"
        />

        {/* Quick Template Switcher Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Load Quick Template:
          </span>
          {TEMPLATES.slice(0, 6).map((template) => (
            <button
              key={template.slug}
              onClick={() => loadTemplate(template.slug)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-teal-400 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-teal-400" />
              {template.title.split(' ')[0]} {template.defaultFilename}
            </button>
          ))}
          <Link
            href="/templates"
            className="text-xs px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 transition-colors font-medium"
          >
            Explore All 25+ Templates &rarr;
          </Link>
        </div>
      </section>

      {/* Specialized Tool Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Specialized Text Processing Suites
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Dedicated tools optimized for specific plain text generation and formatting workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/tools/batch-generator"
            className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/5"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Batch TXT Generator
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Generate 1 to 500+ text files simultaneously using dynamic variable substitution and download directly as a ZIP archive.
            </p>
          </Link>

          <Link
            href="/tools/case-converter"
            className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/5"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Type className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Text Case Converter
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Transform strings instantly into UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and CONSTANT_CASE.
            </p>
          </Link>

          <Link
            href="/tools/line-tools"
            className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/5"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ListTree className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Line Sorter & Deduplicator
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Sort lines alphabetically (A-Z / Z-A), remove duplicate lines, trim whitespace, and add prefix/suffix counters to all lines.
            </p>
          </Link>

          <Link
            href="/tools/robots-txt-generator"
            className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/5"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Robots.txt Builder
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Visual generator for search engine crawler directives, Disallow rules, crawl delays, and XML sitemap declarations.
            </p>
          </Link>

          <Link
            href="/tools/markdown-to-txt"
            className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/5"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Markdown to Plain Text
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Strip Markdown symbols, HTML tags, and rich formatting from blog articles or documentation into clean plain text.
            </p>
          </Link>

          <Link
            href="/tools/diff-checker"
            className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/5"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GitCompare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Text Diff Checker
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Compare two plain text documents side-by-side to highlight added, removed, and modified lines instantly.
            </p>
          </Link>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-emerald-950/40 border border-teal-500/20 p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Multi-Encoding Architecture</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Export text in universal UTF-8, UTF-8 with BOM for Microsoft Excel, UTF-16 Unicode, ANSI Windows-1252, or pure 7-bit ASCII.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Line Ending Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Effortlessly resolve carriage return discrepancies between Windows (CRLF) and Linux/macOS (LF) line terminators.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">100% Client-Side Privacy</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Your data is processed locally inside your web browser. No text logs, no external telemetry, zero storage on remote servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Deep-Dive Content: Why Plain Text */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Why Plain Text (.txt) Remains the Foundation of Computing
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-400">
          In an era where proprietary cloud documents and complex binary files dominate modern software,
          plain text files (<code className="text-teal-400 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-xs">.txt</code>)
          remain the single most durable, portable, and machine-readable data format ever engineered.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <Cpu className="w-4 h-4 text-teal-400" />
              Immune to Format Deprecation
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Unlike word processor files that break across versions, a plain text file written decades ago can still be read seamlessly today.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Frictionless Scripting & Automation
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Unix pipes, Python scripts, PowerShell cmdlets, and CI/CD pipelines can ingest and transform .txt files with zero library overhead.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection faqs={homeFaqs} />
    </div>
  );
}