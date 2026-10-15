'use client';

import { useState } from 'react';
import Link from 'next/link';
import TxtEditor from '@/components/editor/TxtEditor';
import FaqSection from '@/components/seo/FaqSection';
import { HowToJsonLd } from '@/components/seo/JsonLd';
import { TEMPLATES } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';
import { RelatedGuidesSection } from '@/components/seo/InternalLinks';
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
  FileText,
  Lock,
  Download,
  Smartphone,
} from 'lucide-react';

const SAMPLE_TEXT = `========================================================================
                      WELCOME TO TXTCRAFT
            Online TXT File Maker & Plain Text Studio
========================================================================

TxtCraft is a fast, free online notepad and text-to-file creator designed
for developers, webmasters, writers, students, and data specialists.

[KEY CAPABILITIES]
* Create & Download: Write notes and download clean .txt files with 1 click
* Real-time Metrics: Character count, word tally, line count & exact byte size
* Custom Encodings : UTF-8, UTF-8 with BOM, UTF-16LE, Windows-1252 & ASCII
* Line Endings     : Seamless toggle between Windows CRLF (\\r\\n) & Unix LF (\\n)
* Line Manipulation: Sort alphabetically, remove duplicates, trim whitespace
* Find & Replace   : Regex support with live match counter and case toggle
* Batch Creator    : Generate up to 500 text files with custom variables & zip

[GET STARTED]
1. Edit or replace this text directly in the monospace editor above.
2. Choose your preferred file name, encoding, and line ending in the toolbar.
3. Click "Download" (or press Ctrl+S) to save instantly to your computer.
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
      question: 'What is a TXT file maker?',
      answer:
        'A TXT file maker is a browser-based text editor and online notepad that allows you to type or paste text and instantly convert it into a downloadable plain text (.txt) file with your chosen character encoding and line terminators.',
    },
    {
      question: 'How do I create and download a text file online?',
      answer:
        'Write or paste your content in the editor above, specify a filename (e.g. document.txt), choose your character encoding (UTF-8, ANSI, UTF-16) and line endings (CRLF or LF), and click "Download" or press Ctrl+S to save your .txt file directly to your device.',
    },
    {
      question: 'Are my notes and text files uploaded to any server?',
      answer:
        'No. Everything — editing, formatting, and file generation — happens locally inside your browser. Your text never leaves your device and is never stored on any server.',
    },
    {
      question: 'Can I choose between Windows CRLF and Linux LF line breaks?',
      answer:
        'Yes. The toolbar has a line-ending switch that converts your text between Windows CRLF (\\r\\n) and Unix/Linux/macOS LF (\\n), so scripts keep working when they move between operating systems.',
    },
    {
      question: 'How do I generate multiple text files in bulk?',
      answer:
        'You can use our dedicated Batch TXT Generator tool to define dynamic templates with variable tokens (like {id} or {name}) and produce hundreds of custom text files bundled into a single ZIP download.',
    },
    {
      question: 'What character encodings are supported?',
      answer:
        'TxtCraft supports standard UTF-8, UTF-8 with Byte Order Mark (BOM for legacy Excel/Notepad), UTF-16LE, UTF-16BE, Windows-1252 (ANSI), and 7-bit ASCII.',
    },
  ];

  return (
    <div className="space-y-12 pb-16 transition-colors">
      {/* Hero Section */}
      <section className="relative isolate pt-12 sm:pt-16 pb-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-500/10 via-sky-500/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Free Online Text Tools
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Free Online Text Tools &{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Browser Text Studio
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Your browser workspace for plain text. Edit notes, convert text case, clean and sort lines, compare text differences, or generate TXT files in bulk. For a dedicated text-to-file workflow, open our TXT File Maker.
          </p>
        </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="#text-editor" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/20 transition hover:bg-teal-400">
              <FileText className="h-4 w-4" /> Start creating <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/tools/txt-file-maker" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-teal-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-teal-500">
              Open Dedicated TXT File Maker
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-teal-500" /> Instant download</span>
            <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-teal-500" /> Browser-based editing</span>
            <span className="inline-flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5 text-teal-500" /> Mobile friendly</span>
          </div>
      </section>

      {/* Main Interactive Studio Editor */}
      <section id="text-editor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <TxtEditor
          initialText={editorText}
          initialFilename={currentFilename}
          className="shadow-2xl shadow-slate-900/10 dark:shadow-black/40 ring-1 ring-slate-200 dark:ring-teal-500/20"
        />

        {/* Quick Template Switcher Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">
            Load Quick Template:
          </span>
          {TEMPLATES.slice(0, 6).map((template) => (
            <button
              key={template.slug}
              onClick={() => loadTemplate(template.slug)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-teal-600 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-teal-400 dark:border-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              {template.title.split(' ')[0]} {template.defaultFilename}
            </button>
          ))}
          <Link
            href="/templates"
            className="text-xs px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 transition-colors font-medium"
          >
            Explore All 12 Templates &rarr;
          </Link>
        </div>
      </section>

      {/* 3-Step How-To Section */}
      <HowToJsonLd
        name="How to Make a Text File Online in 3 Steps"
        description="No installs or sign-ups \u2014 just type, format, and download your .txt file."
        steps={[
          {
            name: 'Write or Paste in Notepad',
            text: 'Enter your plain text, code, notes, or configuration into the editor with real-time character and word count tracking.',
          },
          {
            name: 'Select Encoding & Format',
            text: 'Choose your filename, character encoding (UTF-8, UTF-16, ANSI), and switch line breaks between Windows CRLF and Unix LF.',
          },
          {
            name: 'Download .TXT File',
            text: 'Click the Download button (or press Ctrl+S) to instantly save your clean, ready-to-use .txt file to your device.',
          },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            How to Make a Text File Online in 3 Steps
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            No installs or sign-ups \u2014 just type, format, and download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Write or Paste in Notepad
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter your plain text, code, notes, or configuration into the editor with real-time character and word count tracking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Select Encoding & Format
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose your filename, character encoding (UTF-8, UTF-16, ANSI), and switch line breaks between Windows CRLF and Unix LF.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Download .TXT File
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Click the Download button (or press Ctrl+S) to instantly save your clean, ready-to-use .txt file to your device.
            </p>
          </div>
        </div>
      </section>

      {/* Specialized Tool Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Free Text Tools
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Seven simple tools for everyday plain-text work — making .txt files, converting case, sorting lines, building robots.txt files, and comparing text.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/tools/txt-file-maker"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
              TXT File Maker Page
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Standalone full-screen text editor & online notepad for creating and downloading custom .txt files.
            </p>
          </Link>

          <Link
            href="/tools/batch-generator"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Batch TXT Generator
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Generate 1 to 500 text files at once using dynamic variable substitution and download them as a ZIP.
            </p>
          </Link>

          <Link
            href="/tools/case-converter"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Type className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Text Case Converter
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Transform strings instantly into UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.
            </p>
          </Link>

          <Link
            href="/tools/line-tools"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ListTree className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Line Sorter & Deduplicator
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Sort lines alphabetically (A-Z / Z-A), remove duplicate lines, trim whitespace, and add line numbers.
            </p>
          </Link>

          <Link
            href="/tools/robots-txt-generator"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Robots.txt Builder
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Visual generator for search engine crawler directives, Disallow rules, crawl delays, and XML sitemaps.
            </p>
          </Link>

          <Link
            href="/tools/markdown-to-txt"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Markdown to Plain Text
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Strip Markdown syntax, HTML tags, and rich formatting from blog articles or documentation into clean text.
            </p>
          </Link>

          <Link
            href="/tools/diff-checker"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GitCompare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
              Text Diff Checker
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Compare two plain text documents side-by-side to visually inspect additions, deletions, and edits.
            </p>
          </Link>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-50 via-slate-100 to-emerald-50 border border-teal-200/80 p-6 sm:p-10 dark:from-teal-950/40 dark:via-slate-900 dark:to-emerald-950/40 dark:border-teal-500/20 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Choose the Right Encoding</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Pick the encoding your target app needs: plain UTF-8, UTF-8 with BOM for Microsoft Excel, UTF-16, Windows-1252 (ANSI), or plain 7-bit ASCII.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Pick Your Line Endings</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Switch between Windows (CRLF) and Linux/macOS (LF) line endings so scripts and config files work on any system.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">100% Client-Side Privacy</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Your data is processed locally inside your web browser. Nothing is tracked, nothing is uploaded, and nothing is stored on remote servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Deep-Dive Content: Why Plain Text */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700 dark:text-slate-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Why Plain Text (.txt) Remains the Foundation of Computing
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
          While proprietary cloud documents and binary formats come and go,
          plain text files (<code className="text-teal-600 bg-slate-100 dark:text-teal-400 dark:bg-slate-900 px-1.5 py-0.5 rounded font-mono text-xs">.txt</code>)
          remain the most durable, portable, and machine-readable format there is.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Readable Decades From Now
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Unlike word processor files that break across versions, a plain text file written decades ago can still be opened today.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Simple Scripting & Automation
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Unix pipes, Python scripts, PowerShell cmdlets, and CI/CD pipelines can read and transform .txt files with no extra libraries.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Linking: Featured Technical Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RelatedGuidesSection
          title="Plain Text Guides"
          subtitle="Short, practical guides on encodings, line endings, robots.txt, and everyday text workflows."
          articles={ARTICLES.slice(0, 3)}
        />
      </section>

      {/* FAQ Section */}
      <FaqSection faqs={homeFaqs} />
    </div>
  );
}