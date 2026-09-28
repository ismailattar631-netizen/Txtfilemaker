'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ListTree, Copy, Download, Check } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { TEMPLATES } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';
import {
  RelatedToolsSection,
  RelatedTemplatesSection,
  RelatedGuidesSection,
} from '@/components/seo/InternalLinks';
import {
  sortLines,
  reverseLines,
  removeDuplicateLines,
  removeEmptyLines,
  trimLines,
  addPrefixSuffix,
  numberLines,
  computeTextStats,
} from '@/lib/text-utils';
import { downloadTextFile } from '@/lib/encodings';

export default function LineToolsPage() {
  const [text, setText] = useState(`Delta Operations
Beta Logistics
Alpha Enterprise
Gamma Robotics
Beta Logistics
Alpha Enterprise

Epsilon Cloud`);

  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [numberFormat, setNumberFormat] = useState<'1.' | '1)' | '[1]' | '001.'>('1.');
  const [copied, setCopied] = useState(false);

  const stats = computeTextStats(text);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const faqs = [
    {
      question: 'How do I remove duplicate lines from a text file?',
      answer:
        'Click "Remove Duplicate Lines". The tool compares every line in your document and removes repeated lines while keeping the first occurrence exactly where it was, so your original order is preserved.',
    },
    {
      question: 'How do I sort lines alphabetically?',
      answer:
        'Use "Sort A to Z" or "Sort Z to A" for alphabetical ordering. For lists with numbers, choose "Sort Natural" instead — otherwise plain alphabetical sorting puts "Item 10" before "Item 2".',
    },
    {
      question: 'What does "Sort Natural" mean?',
      answer:
        'Natural sorting reads numbers the way people do, so "Item 2" comes before "Item 10". Use it for numbered lists, chapter names, product codes, or filenames where plain alphabetical sorting would order the digits incorrectly.',
    },
    {
      question: 'How do I trim extra spaces from the start and end of each line?',
      answer:
        'Click "Trim Leading / Trailing Spaces". This removes stray spaces and tabs from the beginning and end of every line without touching anything in the middle — handy for copied text with uneven indentation.',
    },
    {
      question: 'How do I remove blank lines from my text?',
      answer:
        'Click "Remove Empty / Blank Lines". Lines that contain nothing (or only spaces) are deleted, closing the gaps so your list runs together cleanly.',
    },
    {
      question: 'Can I add line numbers to my list?',
      answer:
        'Yes. Pick a format in the Line Numbering panel — "1.", "1)", "[1]", or "001." — then click "Number Lines". Each line gets its number added to the front, in order from top to bottom.',
    },
    {
      question: 'Can I add a prefix or suffix to every line at the same time?',
      answer:
        'Yes! Type your prefix or suffix in the Line Formatting panel and click "Apply Prefix & Suffix". It is applied to every line at once — useful for wrapping list items in quotes, adding bullet markers, or appending file extensions.',
    },
    {
      question: 'Is my text uploaded anywhere when I use this tool?',
      answer:
        'No. All sorting, filtering, and formatting runs directly in your browser. Your text is never sent to a server — you can even disconnect from the internet and keep using the tool.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Tools', url: 'https://txtcraft.site/tools/txt-file-maker' },
          { name: 'Line Tools & Sorter', url: 'https://txtcraft.site/tools/line-tools' },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools/txt-file-maker" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          Tools
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium">Line Tools & Sorter</span>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-semibold">
          <ListTree className="w-3.5 h-3.5" />
          Line Sorter, Filter & Formatter
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Line Tools & Sorter Studio
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          Sort lines alphabetically, remove duplicate lines, trim whitespace, add prefixes,
          and number lists instantly.
        </p>
      </div>

      {/* Control Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sorting Card */}
        <div className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 rounded-2xl p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Sorting</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setText(sortLines(text, 'az'))}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:text-sky-600 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:hover:text-sky-400 text-left"
            >
              Sort A &rarr; Z
            </button>
            <button
              onClick={() => setText(sortLines(text, 'za'))}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:text-sky-600 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:hover:text-sky-400 text-left"
            >
              Sort Z &rarr; A
            </button>
            <button
              onClick={() => setText(sortLines(text, 'natural'))}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:text-sky-600 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:hover:text-sky-400 text-left"
            >
              Sort Natural
            </button>
            <button
              onClick={() => setText(reverseLines(text))}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:text-sky-600 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:hover:text-sky-400 text-left"
            >
              Reverse Lines
            </button>
          </div>
        </div>

        {/* Cleaning Card */}
        <div className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 rounded-2xl p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Cleaning</h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => setText(removeDuplicateLines(text))}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:text-sky-600 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:hover:text-sky-400 text-left"
            >
              Remove Duplicate Lines
            </button>
            <button
              onClick={() => setText(removeEmptyLines(text))}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:text-sky-600 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:hover:text-sky-400 text-left"
            >
              Remove Empty / Blank Lines
            </button>
            <button
              onClick={() => setText(trimLines(text))}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 hover:text-sky-600 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200 dark:hover:text-sky-400 text-left"
            >
              Trim Leading / Trailing Spaces
            </button>
          </div>
        </div>

        {/* Prefix / Suffix / Numbering */}
        <div className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 rounded-2xl p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Line Numbering</h3>
          <div className="flex gap-1.5">
            <select
              value={numberFormat}
              onChange={(e) => setNumberFormat(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-2 py-1.5 text-xs text-slate-800 dark:text-slate-200 font-mono focus:outline-none shadow-sm"
            >
              <option value="1.">1. Item</option>
              <option value="1)">1) Item</option>
              <option value="[1]">[1] Item</option>
              <option value="001.">001. Item</option>
            </select>
            <button
              onClick={() => setText(numberLines(text, numberFormat))}
              className="flex-1 p-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-400 border border-sky-500/30 text-xs font-semibold"
            >
              Number Lines
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <input
              type="text"
              placeholder="Prefix..."
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-2 py-1 text-xs text-slate-800 dark:text-slate-200 font-mono shadow-sm"
            />
            <input
              type="text"
              placeholder="Suffix..."
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-2 py-1 text-xs text-slate-800 dark:text-slate-200 font-mono shadow-sm"
            />
          </div>
          <button
            onClick={() => setText(addPrefixSuffix(text, prefix, suffix))}
            className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300 text-xs font-medium shadow-sm"
          >
            Apply Prefix & Suffix
          </button>
        </div>
      </div>

      {/* Editor & Stats */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden shadow-xl">
        <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
            {stats.lines} Lines | {stats.words} Words | {stats.characters} Characters
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => downloadTextFile('line_processed.txt', text)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Paste or type lines to sort and process..."
          className="w-full bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-600 p-4 font-mono text-sm outline-none resize-none custom-scrollbar leading-relaxed"
        />
      </div>

      {/* How to Use - Step by Step */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            How to Sort and Clean Lines in 3 Steps
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Tidy up any list — email addresses, names, filenames, or notes — in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Paste Your Lines
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Paste or type your list into the editor box above. Every line is treated as one
              item, and the live counter shows your line, word, and character totals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Click a Line Tool
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Use the panels above the editor: sort A to Z or Z to A, remove duplicates or blank
              lines, trim extra spaces, add line numbers, or apply a prefix or suffix to every
              line at once.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Copy or Download
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Click Copy to grab the cleaned list, or Download .txt to save it as a plain text
              file. Everything runs in your browser — nothing is uploaded anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Example - Before & After */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight text-center">
          A Quick Example
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Before — messy list
            </h3>
            <pre className="font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 whitespace-pre-wrap">
{`Beta Logistics
Alpha Enterprise
Beta Logistics

Gamma Robotics`}
            </pre>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 p-5 space-y-2">
            <h3 className="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              After — Remove Duplicates + Sort A→Z
            </h3>
            <pre className="font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-sky-500/5 border border-sky-500/20 rounded-xl p-3 whitespace-pre-wrap">
{`Alpha Enterprise
Beta Logistics
Gamma Robotics`}
            </pre>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-center max-w-2xl mx-auto">
          Two clicks removed the repeated line, deleted the blank line, and sorted everything
          alphabetically. This is how most people use the tool: paste a rough list, clean it,
          and paste the result wherever it is needed.
        </p>
      </section>

      {/* Internal Linking: Related Tools */}
      <RelatedToolsSection
        title="More Specialized Text Utilities"
        subtitle="Compare document differences, transform word casing, or batch-generate text files."
        excludeHref="/tools/line-tools"
        maxItems={3}
      />

      {/* Internal Linking: Related Templates */}
      <RelatedTemplatesSection
        title="Text Templates for Lists & Task Management"
        subtitle="Load pre-structured templates such as TODO.txt, meeting notes, and system specs."
        templates={TEMPLATES.slice(0, 3)}
      />

      {/* Internal Linking: Related Guides */}
      <RelatedGuidesSection
        title="Guides on Line Formatting & DevOps Standards"
        subtitle="Understand CRLF vs LF line endings and best practices for shell script compatibility."
        articles={ARTICLES.slice(0, 3)}
      />

      <FaqSection
        title="Line Tools & Sorter FAQs"
        subtitle="Common questions about sorting lines, removing duplicates, trimming spaces, and numbering lists."
        faqs={faqs}
      />
    </div>
  );
}