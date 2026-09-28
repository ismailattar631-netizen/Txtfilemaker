'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitCompare } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { TEMPLATES } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';
import {
  RelatedToolsSection,
  RelatedTemplatesSection,
  RelatedGuidesSection,
} from '@/components/seo/InternalLinks';
import { computeLineDiff } from '@/lib/text-utils';

export default function DiffCheckerPage() {
  const [original, setOriginal] = useState(`Server Name: prod-node-01
IP Address: 192.168.1.10
Status: ACTIVE
Max Connections: 500
Timeout: 30s
SSL: Enabled`);

  const [modified, setModified] = useState(`Server Name: prod-node-01
IP Address: 192.168.1.15
Status: ACTIVE
Max Connections: 1000
Timeout: 30s
SSL: Enabled
Region: us-east-1`);

  const diffLines = computeLineDiff(original, modified);

  const faqs = [
    {
      question: 'How do I compare two texts?',
      answer:
        'Paste the older version of your text into the "Original Text Document" box and the newer version into the "Modified Text Document" box. The comparison updates automatically below, with every added, removed, and unchanged line marked.',
    },
    {
      question: 'What counts as an added or removed line?',
      answer:
        'The tool compares both documents line by line. A line that exists only in the new text is added and shown with a green + marker. A line that exists only in the old text is removed and shown with a red - marker. A line you edited appears as one red line followed by its green replacement.',
    },
    {
      question: 'Does it ignore extra spaces or letter case?',
      answer:
        'No. The comparison is exact, so a trailing space, extra indent, or changed capital letter counts as a difference. If spacing and casing do not matter to you, standardize both texts first and then compare them.',
    },
    {
      question: 'Is my pasted text uploaded or stored anywhere?',
      answer:
        'No. The comparison runs entirely in your browser using JavaScript. Your text is never sent to a server, saved, or shared, so you can safely compare private notes, documents, or configuration files.',
    },
    {
      question: 'What can I use a diff checker for?',
      answer:
        'Reviewing what changed between two drafts, checking config file updates, comparing versions of notes, essays, or code, and spotting accidental edits before you publish or share a file.',
    },
    {
      question: 'Can it compare long documents?',
      answer:
        'Yes. You can paste long documents and the result box scrolls through the output. Keep in mind it compares line by line, so it will not highlight single changed words inside an otherwise identical line.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Tools', url: 'https://txtcraft.site/tools/txt-file-maker' },
          { name: 'Text Diff Checker', url: 'https://txtcraft.site/tools/diff-checker' },
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
        <span className="text-slate-900 dark:text-slate-200 font-medium">Text Diff Checker</span>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <GitCompare className="w-3.5 h-3.5" />
          Text Comparison & Visual Diff
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Plain Text Diff & Comparison Tool
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          Compare two plain text documents line-by-line to detect changes, additions, and deletions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden shadow-xl">
          <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Original Text Document
          </div>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            rows={8}
            className="w-full bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-600 p-3 font-mono text-xs outline-none resize-none custom-scrollbar leading-relaxed"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden shadow-xl">
          <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Modified Text Document
          </div>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            rows={8}
            className="w-full bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-600 p-3 font-mono text-xs outline-none resize-none custom-scrollbar leading-relaxed"
          />
        </div>
      </div>

      {/* Diff Result Box */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden shadow-xl space-y-0">
        <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Visual Line Diff Output
        </div>
        <div className="p-4 font-mono text-xs space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
          {diffLines.map((line, idx) => {
            if (line.type === 'added') {
              return (
                <div key={idx} className="flex items-center gap-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-500/20">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold select-none">+</span>
                  <span className="truncate">{line.content}</span>
                </div>
              );
            }
            if (line.type === 'removed') {
              return (
                <div key={idx} className="flex items-center gap-3 bg-rose-500/10 text-rose-700 dark:text-rose-300 px-2 py-1 rounded border border-rose-500/20">
                  <span className="text-rose-600 dark:text-rose-400 font-bold select-none">-</span>
                  <span className="truncate">{line.content}</span>
                </div>
              );
            }
            return (
              <div key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-2 py-1">
                <span className="opacity-40 select-none"> </span>
                <span className="truncate">{line.content}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Use: 3-Step Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            How to Compare Two Texts
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            See exactly what changed between two versions in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Paste Your Original Text
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Put the older version of your text into the left box ("Original Text Document"). You can type it, paste it from another app, or clear the sample and start fresh.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Paste the Modified Text
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Put the newer version into the right box ("Modified Text Document"). The diff result updates automatically as you type or paste, with no button to press.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Read the Highlighted Result
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Green <span className="font-mono font-bold">+</span> lines were added, red <span className="font-mono font-bold">-</span> lines were removed, and plain lines are unchanged. An edited line shows as a red line followed by its green replacement.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Diff Examples */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Diff Result Examples
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Here is what the output looks like for common real-world comparisons.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Example 1: Server config update
          </h3>
          <div className="p-4 font-mono text-xs space-y-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-3 bg-rose-500/10 text-rose-700 dark:text-rose-300 px-2 py-1 rounded border border-rose-500/20 whitespace-nowrap">
              <span className="font-bold select-none">-</span>
              <span>IP Address: 192.168.1.10</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
              <span className="font-bold select-none">+</span>
              <span>IP Address: 192.168.1.15</span>
            </div>
            <div className="flex items-center gap-3 bg-rose-500/10 text-rose-700 dark:text-rose-300 px-2 py-1 rounded border border-rose-500/20 whitespace-nowrap">
              <span className="font-bold select-none">-</span>
              <span>Max Connections: 500</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
              <span className="font-bold select-none">+</span>
              <span>Max Connections: 1000</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-2 py-1 whitespace-nowrap">
              <span className="opacity-40 select-none"> </span>
              <span>Timeout: 30s</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
              <span className="font-bold select-none">+</span>
              <span>Region: us-east-1</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Two settings were edited (each appears as a red line followed by its green replacement), one new line was added at the end, and the unchanged line stays plain.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Example 2: Shopping list changes
          </h3>
          <div className="p-4 font-mono text-xs space-y-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-2 py-1 whitespace-nowrap">
              <span className="opacity-40 select-none"> </span>
              <span>Buy milk</span>
            </div>
            <div className="flex items-center gap-3 bg-rose-500/10 text-rose-700 dark:text-rose-300 px-2 py-1 rounded border border-rose-500/20 whitespace-nowrap">
              <span className="font-bold select-none">-</span>
              <span>Buy eggs</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
              <span className="font-bold select-none">+</span>
              <span>Buy free-range eggs</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
              <span className="font-bold select-none">+</span>
              <span>Buy bread</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-2 py-1 whitespace-nowrap">
              <span className="opacity-40 select-none"> </span>
              <span>Call dentist</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            One item was reworded, one brand-new item was added, and the rest of the list stayed the same.
          </p>
        </div>
      </section>

      {/* Internal Linking: Related Tools */}
      <RelatedToolsSection
        title="Related Text Processing Tools"
        subtitle="Sort lines, transform word casing, or strip Markdown formatting."
        excludeHref="/tools/diff-checker"
        maxItems={3}
      />

      {/* Internal Linking: Related Templates */}
      <RelatedTemplatesSection
        title="Popular Plain Text Templates"
        subtitle="Compare revisions of your configuration and documentation templates."
        templates={TEMPLATES.slice(0, 3)}
      />

      {/* Internal Linking: Related Guides */}
      <RelatedGuidesSection
        title="Technical Guides & Articles"
        subtitle="Learn how to handle line endings, Unicode encodings, and shell script compatibility."
        articles={ARTICLES.slice(0, 3)}
      />

      <FaqSection
        title="Text Diff Checker FAQs"
        subtitle="Common questions about comparing two texts, reading diff results, and privacy."
        faqs={faqs}
      />
    </div>
  );
}