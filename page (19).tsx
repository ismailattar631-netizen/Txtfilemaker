'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitCompare } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
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
      question: 'How does the text diff algorithm work?',
      answer:
        'The diff tool analyzes both input documents line-by-line, computing differences using longest common subsequence (LCS) logic to highlight lines that have been added (+) in green or removed (-) in red.',
    },
    {
      question: 'Is my data transmitted or stored during diffing?',
      answer:
        'No. 100% of the diff calculation happens locally inside your browser memory with complete privacy.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      <FaqJsonLd faqs={faqs} />
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

      <FaqSection faqs={faqs} />
    </div>
  );
}