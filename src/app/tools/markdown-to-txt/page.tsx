'use client';

import { useState } from 'react';
import { FileCode, Copy, Download, Check, ArrowRight } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
import { stripMarkdown, stripHtmlTags, computeTextStats } from '@/lib/text-utils';
import { downloadTextFile } from '@/lib/encodings';

export default function MarkdownToTxtPage() {
  const [input, setInput] = useState(`# Project Documentation Overview

Welcome to **TxtCraft Pro**! This document explains how to *cleanly strip* formatting from text.

## Core Features
- [x] Fast client-side conversion
- [x] Supports \`inline code\` and **bold text**
- [x] Removes [hyperlinks](https://example.com) and images

> Plain text is durable, universal, and light!

\`\`\`javascript
console.log("Hello from code block!");
\`\`\`
`);

  const [copied, setCopied] = useState(false);

  const cleanText = stripHtmlTags(stripMarkdown(input));
  const stats = computeTextStats(cleanText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
          <FileCode className="w-3.5 h-3.5" />
          Rich Text & Markdown Stripper
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Markdown & HTML to Plain Text (.txt)
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Instantly convert Markdown syntax, HTML tags, and formatted copy into crisp, clean plain text.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 text-xs font-bold text-purple-400 uppercase tracking-wider">
            Input Markdown / HTML
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            className="w-full bg-slate-950 text-slate-100 p-4 font-mono text-xs sm:text-sm outline-none resize-none custom-scrollbar leading-relaxed"
          />
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Clean Plain Text ({stats.words} words)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => downloadTextFile('cleaned_text.txt', cleanText)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={cleanText}
            rows={14}
            className="w-full flex-1 bg-slate-950 text-slate-100 p-4 font-mono text-xs sm:text-sm outline-none resize-none custom-scrollbar leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}