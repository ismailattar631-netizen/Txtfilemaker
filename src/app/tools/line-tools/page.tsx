'use client';

import { useState } from 'react';
import { ListTree, Copy, Download, Check, Sparkles, Filter } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
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
      answer: 'Click "Remove Duplicate Lines". The tool compares every line in your document and removes repeated lines while maintaining initial ordering.',
    },
    {
      question: 'How do I sort lines alphabetically?',
      answer: 'Use "Sort A to Z" or "Sort Z to A" for alphabetical ordering, or "Sort Natural" which correctly handles numbers like Item 2 before Item 10.',
    },
    {
      question: 'Can I add prefix or suffix to every line simultaneously?',
      answer: 'Yes! Type your prefix or suffix in the Line Formatting panel and click "Apply Prefix / Suffix".',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold">
          <ListTree className="w-3.5 h-3.5" />
          Line Sorter, Filter & Formatter
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Line Tools & Sorter Studio
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Sort lines alphabetically, eliminate duplicate records, trim whitespace, add prefixes,
          and number lists with zero latency.
        </p>
      </div>

      {/* Control Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sorting Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Sorting</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setText(sortLines(text, 'az'))}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-sky-400 text-left"
            >
              Sort A &rarr; Z
            </button>
            <button
              onClick={() => setText(sortLines(text, 'za'))}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-sky-400 text-left"
            >
              Sort Z &rarr; A
            </button>
            <button
              onClick={() => setText(sortLines(text, 'natural'))}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-sky-400 text-left"
            >
              Sort Natural
            </button>
            <button
              onClick={() => setText(reverseLines(text))}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-sky-400 text-left"
            >
              Reverse Lines
            </button>
          </div>
        </div>

        {/* Cleaning Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Cleaning</h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => setText(removeDuplicateLines(text))}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-sky-400 text-left"
            >
              Remove Duplicate Lines
            </button>
            <button
              onClick={() => setText(removeEmptyLines(text))}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-sky-400 text-left"
            >
              Remove Empty / Blank Lines
            </button>
            <button
              onClick={() => setText(trimLines(text))}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-sky-400 text-left"
            >
              Trim Leading / Trailing Spaces
            </button>
          </div>
        </div>

        {/* Prefix / Suffix / Numbering */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Line Numbering</h3>
          <div className="flex gap-1.5">
            <select
              value={numberFormat}
              onChange={(e) => setNumberFormat(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
            >
              <option value="1.">1. Item</option>
              <option value="1)">1) Item</option>
              <option value="[1]">[1] Item</option>
              <option value="001.">001. Item</option>
            </select>
            <button
              onClick={() => setText(numberLines(text, numberFormat))}
              className="flex-1 p-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold"
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
              className="bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs text-slate-200 font-mono"
            />
            <input
              type="text"
              placeholder="Suffix..."
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs text-slate-200 font-mono"
            />
          </div>
          <button
            onClick={() => setText(addPrefixSuffix(text, prefix, suffix))}
            className="w-full py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium"
          >
            Apply Prefix & Suffix
          </button>
        </div>
      </div>

      {/* Editor & Stats */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
          <span className="text-xs font-mono text-slate-400">
            {stats.lines} Lines | {stats.words} Words | {stats.characters} Characters
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => downloadTextFile('line_processed.txt', text)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors"
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
          className="w-full bg-slate-950 text-slate-100 p-4 font-mono text-sm outline-none resize-none custom-scrollbar leading-relaxed"
        />
      </div>

      <FaqSection faqs={faqs} />
    </div>
  );
}