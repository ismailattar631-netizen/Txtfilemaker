import type { Metadata } from 'next';
import Link from 'next/link';
import TxtEditor from '@/components/editor/TxtEditor';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd, SoftwareAppJsonLd } from '@/components/seo/JsonLd';
import { TEMPLATES } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';
import {
  RelatedToolsSection,
  RelatedTemplatesSection,
  RelatedGuidesSection,
} from '@/components/seo/InternalLinks';
import {
  FileText,
  Shield,
  Zap,
  Globe,
  Sliders,
  Lock,
  Smartphone,
  Laptop,
  CheckCircle2,
  FileCheck2,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'TXT File Maker - Convert Text to .txt & Download Online',
  description:
    'Convert text to a downloadable .txt file in your browser. Choose your filename, encoding and LF/CRLF line endings, then save instantly without an account.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/txt-file-maker',
  },
  openGraph: {
    title: 'TXT File Maker - Convert Text to .txt & Download Online',
    description:
      'The modern online notepad and plain text creator. Write notes, code snippets, or configuration files and download them as .txt files with custom encodings.',
    url: 'https://txtcraft.site/tools/txt-file-maker',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - TXT File Maker & Online Notepad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TXT File Maker - Convert Text to .txt & Download Online',
    description: 'Fast, secure browser notepad and text to file creator with instant .txt download.',
    images: ['/og-image.png'],
  },
};

export default function TxtFileMakerPage() {
  const toolFaqs = [
    {
      question: 'What is an online TXT file maker?',
      answer:
        'An online TXT file maker is a web page where you can write, edit, and format plain text, then save it as a .txt file on your device — no software installation needed.',
    },
    {
      question: 'How do I convert text to a .txt file and download it?',
      answer:
        'Simply type or paste your content into the editor above, set your desired filename (e.g., notes.txt), choose your character encoding (UTF-8, ANSI, or UTF-16) and line endings (CRLF or LF), then click the "Download" button or press Ctrl+S. Your .txt file is created and downloaded immediately.',
    },
    {
      question: 'How to create a TXT file online for free?',
      answer:
        'To create a TXT file online for free, open the TxtCraft editor, type or paste your notes, enter your preferred filename, and click Download. The entire file creation runs in your browser — no subscriptions, no sign-ups, and nothing is uploaded.',
    },
    {
      question: 'Best free TXT file maker for Windows, Mac, Android and iPhone?',
      answer:
        'TxtCraft works the same on Windows, Mac, Android, and iPhone — it is fully responsive, runs entirely in the browser, and needs no app installation. Encoding and line endings stay consistent (UTF-8, CRLF or LF) on every device.',
    },
    {
      question: 'Convert notes to a plain text file without installing software?',
      answer:
        'You can convert notes to a plain text file without installing software by pasting content from Word, Google Docs, Apple Notes, or sticky notes into the TxtCraft editor. TxtCraft automatically strips hidden rich-text formatting tags and exports a clean, pure .txt document.',
    },
    {
      question: 'Is my text safe and private when using this online notepad?',
      answer:
        'Yes. All text editing, encoding conversions, and file creation happen entirely in JavaScript inside your browser. No text is ever uploaded to or stored on any server.',
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
        'Unlike basic desktop apps, TxtCraft gives you live counters (characters, words, lines, and byte size), instant line-ending conversion, regex find & replace, case conversion, a duplicate-line remover, and ready-to-use templates like README, robots.txt, and licenses.',
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-14 pb-16 transition-colors">
      <SoftwareAppJsonLd
        name="TXT File Maker"
        applicationCategory="Utility"
        operatingSystem="Any"
        price="0"
        priceCurrency="USD"
        description="Free online plain text editor and TXT file maker. Write, format, and download .txt files with UTF-8, ANSI, and CRLF/LF support."
        url="https://txtcraft.site/tools/txt-file-maker"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Tools', url: 'https://txtcraft.site/#tools' },
          { name: 'TXT File Maker', url: 'https://txtcraft.site/tools/txt-file-maker' },
        ]}
      />

      {/* Compact Hero Header - Lifts tool above the fold */}
      <section className="relative pt-4 sm:pt-6 pb-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] font-semibold">
            <FileText className="w-3 h-3" />
            Free Online Notepad & Text to File Creator
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight max-w-4xl mx-auto leading-tight">
            TXT File Maker –{' '}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Create & Download Text Files
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Browser-based plain text editor. Write, format, and download clean .txt files with UTF-8, ANSI, and CRLF/LF support.
          </p>
        </div>
      </section>

      {/* Editor Component - Positioned above the fold */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
        <TxtEditor
          initialFilename="notes.txt"
          initialText={`# My Plain Text Document
Created with TxtCraft TXT File Maker (https://txtcraft.site)

Start typing your notes, task list, or code here...
* Clean monospace editor with live character, word, and line counts
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
            All 12 Templates &rarr;
          </Link>
        </div>
      </section>

      {/* Step-by-Step How-To Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            How to Create & Download a TXT File Online
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Generate clean, machine-readable plain text files in three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/70 dark:border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Type or Paste Text in Notepad
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Write notes, checklists, code, or documentation directly into the distraction-free monospace editor, or drop an existing file to edit.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/70 dark:border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Customize Encoding & Line Breaks
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Set your target filename, select your character encoding (UTF-8, UTF-16, ANSI), and choose between Windows CRLF or Unix LF line endings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/70 dark:border-slate-800 space-y-3 relative overflow-hidden">
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
                Export text in standard UTF-8, UTF-8 with BOM, UTF-16, ANSI Windows-1252, or pure 7-bit ASCII.
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
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">Live Character & Word Counts</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Live character and word counts, line and paragraph counts, byte size for your chosen encoding, and reading time estimates.
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
          Traditional desktop text editors can surprise you: macOS TextEdit saves as rich text (.rtf) by default, and neither it nor Windows Notepad is there for you on a phone or Chromebook when you need a quick plain-text file.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/70 dark:border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Zero Installation & Mobile Ready
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Access your notepad on iOS, Android, macOS, Windows, Linux, and ChromeOS without installing native desktop software or third-party apps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/70 dark:border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-slate-200 text-sm sm:text-base flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Guaranteed Plain Text
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Ensure your downloaded files contain zero hidden rich-text tags, binary artifacts, or formatting corruption that break developer pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* Target Search Intent Guide Section (US/UK English) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 dark:text-slate-300">
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            <BookOpen className="w-4 h-4" />
            Comprehensive Guide & Workflows
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Plain Text Creation Made Simple
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Whether you need a quick online scratchpad, a script sanitizer, or a cross-device file creator, here is how TxtCraft handles your essential text workflows.
          </p>
        </div>

        <div className="space-y-6">
          {/* Query 1: How to create a TXT file online for free */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/70 dark:border-slate-800 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
              How to create a TXT file online for free
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              You don't need any software, accounts, or subscriptions. Just open the TxtCraft editor, type or paste your content, and rename the file in the filename box (e.g., <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">notes.txt</code>). Pick your character encoding (standard UTF-8, ANSI Windows-1252, or UTF-16) and line endings (Windows CRLF or Unix LF). When you click <strong>Download</strong> (or press <kbd className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-300 dark:border-slate-700">Ctrl+S</kbd>), the browser saves the pure text document straight to your device.
            </p>
          </div>

          {/* Query 2: Best free TXT file maker for Windows, Mac, Android and iPhone */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/70 dark:border-slate-800 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              Best free TXT file maker for Windows, Mac, Android and iPhone
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Finding a text editor that behaves the same on every device is often frustrating. Desktop utilities like Windows Notepad and macOS TextEdit use different default line endings, and most phones have no plain-text editor built in at all. TxtCraft runs entirely in the web browser across Windows, macOS, Linux, ChromeOS, Android, and iOS (iPhone/iPad), so your files stay private, and a file made on a phone still opens correctly on Windows and Mac.
            </p>
          </div>

          {/* Query 3: Convert notes to a plain text file without installing software */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/70 dark:border-slate-800 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-sky-600 dark:text-sky-400 flex-shrink-0" />
              Convert notes to a plain text file without installing software
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              When copying text from Google Docs, Microsoft Word, email threads, or mobile notes apps, hidden metadata, XML tags, and non-standard quote marks can break scripts and database imports. To convert notes to a plain text file without installing software, just paste your copy into the TxtCraft editor. All rich formatting is stripped away, leaving clean plain text.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800/60">
              For a deeper look at plain text standards, UTF-8 encodings, and CRLF vs LF line endings, read our in-depth{' '}
              <Link
                href="/guides/complete-guide-to-txt-files"
                className="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                Complete Guide to Plain Text (.TXT) Files
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Task-specific editorial guidance */}
      <section aria-labelledby="practical-guidance-txt-file-maker" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50">
          <h2 id="practical-guidance-txt-file-maker" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">TXT file encoding and portability</h2>
          <div className="mt-4 space-y-4 text-sm sm:text-base leading-7 text-slate-600 dark:text-slate-300">
            <p>For ordinary notes and configuration files, UTF-8 is a practical default because it supports international characters. Choose CRLF when a Windows-specific workflow requires it, and LF for Unix-style scripts or repositories. A .txt file does not preserve bold text, fonts, images or document layout.</p>
            <p><strong className="text-slate-900 dark:text-white">Practical example:</strong> paste meeting notes, name the file meeting-notes.txt, keep UTF-8, then download it. If a downstream system expects a particular encoding or newline format, confirm its requirements before exporting.</p>
            <p><strong className="text-slate-900 dark:text-white">Important limitation:</strong> A file named .txt is still plain text: changing the extension does not convert a Word or PDF document into a compatible format. If you need rich formatting, use a document editor instead.</p>
          </div>
        </div>
      </section>

      {/* Internal Linking: Related Tools */}
      <RelatedToolsSection
        title="Explore More Text Tools"
        subtitle="Process strings, sort lines, build robots.txt files, or batch-produce documents."
        excludeHref="/tools/txt-file-maker"
        maxItems={3}
      />

      {/* Internal Linking: Related Templates */}
      <RelatedTemplatesSection
        title="Ready-to-Use Plain Text Templates"
        subtitle="Load pre-built templates directly into the editor for instant customization."
        templates={TEMPLATES.slice(0, 3)}
      />

      {/* Internal Linking: Related Guides */}
      <RelatedGuidesSection
        title="Recommended Plain Text Guides"
        subtitle="Learn how to handle line endings, Unicode encodings, and shell script compatibility."
        articles={ARTICLES.slice(0, 3)}
      />

      {/* FAQ Section with Crawlable DOM Answers */}
      <FaqSection
        title="TXT File Maker FAQs"
        subtitle="Common questions about creating, formatting, converting, and downloading .txt files online."
        faqs={toolFaqs}
      />
    </div>
  );
}
