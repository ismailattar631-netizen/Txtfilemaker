import type { Metadata } from 'next';
import Link from 'next/link';
import TxtEditor from '@/components/editor/TxtEditor';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd, HowToJsonLd } from '@/components/seo/JsonLd';
import { TEMPLATES } from '@/lib/templates-data';
import {
  FileText,
  Download,
  Shield,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  Lock,
  Smartphone,
  Laptop,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  FileCheck2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'TXT File Maker - Create & Download Text Files Online',
  description:
    'Free online TXT file maker and browser notepad. Write, edit, convert text to file, and download plain text (.txt) files instantly. 100% private with UTF-8, ANSI & CRLF/LF support.',
  keywords: [
    'txt file maker',
    'create text file online',
    'online notepad',
    'text to file',
    'text to file maker',
    'download txt file',
    'plain text editor online',
    'create txt file online',
    'save text as txt',
    'free online notepad',
    'browser text editor',
    'convert text to file',
    'utf-8 text file maker',
    'generate txt file',
  ],
  alternates: {
    canonical: 'https://txtcraft.site/tools/txt-file-maker',
  },
  openGraph: {
    title: 'TXT File Maker - Create & Download Text Files Online | TxtCraft',
    description:
      'The modern online notepad and plain text creator. Write notes, code snippets, or configuration files and download them as .txt files with custom encodings.',
    url: 'https://txtcraft.site/tools/txt-file-maker',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TXT File Maker - Create & Download Text Files Online',
    description: 'Fast, secure browser notepad and text to file creator with instant .txt download.',
  },
};

export default function TxtFileMakerPage() {
  const toolFaqs = [
    {
      question: 'What is an online TXT file maker?',
      answer:
        'An online TXT file maker (also known as a browser notepad or text-to-file creator) is a web utility that allows you to write, edit, and format plain text directly in your web browser and save or download it as a standardized .txt document to your device without installing software.',
    },
    {
      question: 'How do I convert text to a .txt file and download it?',
      answer:
        'Simply type or paste your content into the editor above, set your desired filename (e.g., notes.txt), choose your character encoding (UTF-8, ANSI, or UTF-16) and line endings (CRLF or LF), then click the "Download" button or press Ctrl+S. Your .txt file is created and downloaded immediately.',
    },
    {
      question: 'Is my text safe and private when using this online notepad?',
      answer:
        'Yes, 100%. TxtCraft processes all text manipulation, encoding conversions, and file creation entirely in client-side JavaScript within your browser. No text is ever uploaded, transmitted to, or stored on remote servers.',
    },
    {
      question: 'Can I use this TXT file maker on mobile devices (Android & iOS)?',
      answer:
        'Yes! The TxtCraft editor is fully responsive and optimized for mobile viewports. You can draft notes, code, or documents on your smartphone or tablet and download them as .txt files directly to your device storage or files app.',
    },
    {
      question: 'What character encodings and line endings are supported?',
      answer:
        'TxtCraft supports UTF-8, UTF-8 with Byte Order Mark (BOM for legacy Excel/Windows Notepad compatibility), UTF-16LE, UTF-16BE, Windows-1252 (ANSI), and 7-bit ASCII, alongside Windows CRLF (\\r\\n) and Linux/macOS LF (\\n) line endings.',
    },
    {
      question: 'How does this tool differ from default desktop Notepad or TextEdit?',
      answer:
        'Unlike basic desktop apps, TxtCraft provides live metric analytics (character, word, line, and byte size counts), instant line-ending conversions, regex find & replace, casing transformations, duplicate line removers, and ready-to-use structured templates like README, robots.txt, and licenses.',
    },
  ];

  return (
    <div className="space-y-16 pb-16 transition-colors">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Tools', url: 'https://txtcraft.site/tools/batch-generator' },
          { name: 'TXT File Maker', url: 'https://txtcraft.site/tools/txt-file-maker' },
        ]}
      />
      <HowToJsonLd
        name="How to Create and Download a TXT File Online"
        description="Step-by-step instructions to create, format, and save plain text as a .txt file online."
      />

      {/* Hero Header */}
      <section className="relative pt-10 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            Free Online Notepad & Text to File Creator
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight max-w-4xl mx-auto leading-tight">
            TXT File Maker –{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Create & Download Text Files
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Write notes, code snippets, lists, and configuration files in an ultra-clean online notepad.
            Convert text to .txt files with UTF-8 encoding, custom line endings, and instant 1-click download.
          </p>
        </div>
      </section>

      {/* Editor Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <TxtEditor
          initialFilename="notes.txt"
          initialText={`# My Plain Text Document
Created with TxtCraft TXT File Maker (https://txtcraft.site)

Start typing your notes, task list, or code here...
* Clean monospace editor with live character, word, and line telemetry
* Support for UTF-8, UTF-16, ANSI encodings and CRLF/LF line endings
* 100% private: Processed directly in your browser with zero server uploads

Click 'Download' in the toolbar (or press Ctrl+S) to save as a .txt file!`}
          className="shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800"
        />

        {/* Quick Templates Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">
            Load Quick Template:
          </span>
          {TEMPLATES.slice(0, 6).map((template) => (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-teal-600 border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-teal-400 dark:border-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              {template.title.split(' ')[0]} {template.defaultFilename}
            </Link>
          ))}
          <Link
            href="/templates"
            className="text-xs px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 transition-colors font-medium"
          >
            All 25+ Templates &rarr;
          </Link>
        </div>
      </section>

      {/* Step-by-Step How-To Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            How to Create & Download a TXT File Online
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Generate clean, machine-readable plain text files in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Type or Paste Text in Notepad
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Write notes, checklists, code, or documentation directly into the distraction-free monospace canvas, or drop an existing file to edit.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Customize Encoding & Line Breaks
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Set your target filename, select your character encoding (UTF-8, UTF-16, ANSI), and choose between Windows CRLF or Unix LF line terminators.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Download Clean .TXT File
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Click the Download button or use the keyboard shortcut <kbd className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">Ctrl+S</kbd> to save your text file instantly to your device.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive & Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-50 via-slate-100 to-emerald-50 border border-teal-200/80 p-8 sm:p-12 dark:from-teal-950/40 dark:via-slate-900 dark:to-emerald-950/40 dark:border-teal-500/20 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">Client-Side Privacy</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero server tracking or cloud uploads. All text editing and file downloads occur 100% locally in your browser memory.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">Universal Encodings</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Seamlessly export text in standard UTF-8, UTF-8 with BOM, UTF-16, ANSI Windows-1252, or pure 7-bit ASCII without corruption.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">Line Ending Control</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Switch between Windows CRLF (\r\n) and Unix/Linux/macOS LF (\n) to prevent cross-platform script syntax errors.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">Live Text Telemetry</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Real-time character tally, word count, line count, paragraph metrics, exact byte size calculation, and reading time estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Online Notepad vs Traditional Desktop Apps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-700 dark:text-slate-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Why Use an Online TXT File Maker?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Traditional desktop text editors like Windows Notepad or macOS TextEdit often convert plain text to rich formatted text (.rtf), corrupt character encodings upon saving, or lack cross-platform accessibility on mobile phones and Chromebooks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Zero Installation & Mobile Ready
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Access your notepad on iOS, Android, macOS, Windows, Linux, and ChromeOS without installing native desktop software or third-party apps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Guaranteed Plain Text Purity
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Ensure your downloaded files contain zero hidden rich-text tags, binary artifacts, or formatting corruption that break developer pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection
        title="TXT File Maker FAQs"
        subtitle="Common questions about creating, formatting, converting, and downloading .txt files online."
        faqs={toolFaqs}
      />
    </div>
  );
}
