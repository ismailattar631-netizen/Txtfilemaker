'use client';

import { useState } from 'react';
import { Type, Copy, Download, Check, RefreshCw } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
  toAlternatingCase,
  toInverseCase,
  computeTextStats,
} from '@/lib/text-utils';
import { downloadTextFile } from '@/lib/encodings';

export default function CaseConverterPage() {
  const [text, setText] = useState(
    'The quick brown fox jumps over the lazy dog. TXTCRAFT Pro provides precision string transformations!'
  );
  const [copied, setCopied] = useState(false);

  const stats = computeTextStats(text);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const caseActions = [
    { label: 'UPPERCASE', transform: toUpperCase, desc: 'ALL CAPITAL LETTERS' },
    { label: 'lowercase', transform: toLowerCase, desc: 'all small letters' },
    { label: 'Title Case', transform: toTitleCase, desc: 'Capitalize Every Word' },
    { label: 'Sentence case', transform: toSentenceCase, desc: 'Capitalize first letter of sentence' },
    { label: 'camelCase', transform: toCamelCase, desc: 'lowercaseFirstWordThenCapital' },
    { label: 'PascalCase', transform: toPascalCase, desc: 'CapitalizeEveryWordNoSpaces' },
    { label: 'snake_case', transform: toSnakeCase, desc: 'words_separated_by_underscores' },
    { label: 'kebab-case', transform: toKebabCase, desc: 'words-separated-by-hyphens' },
    { label: 'CONSTANT_CASE', transform: toConstantCase, desc: 'UPPERCASE_WITH_UNDERSCORES' },
    { label: 'aLtErNaTiNg cAsE', transform: toAlternatingCase, desc: 'Alternating small and capital' },
    { label: 'InVeRsE CaSe', transform: toInverseCase, desc: 'Invert current letter casing' },
  ];

  const faqs = [
    {
      question: 'What is a Text Case Converter?',
      answer: 'A text case converter transforms the capitalization formatting of letters and words across entire documents, such as converting paragraphs into Title Case, UPPERCASE, camelCase, or snake_case.',
    },
    {
      question: 'Does this tool preserve spaces and punctuation?',
      answer: 'Standard casing formats like UPPERCASE, lowercase, and Title Case preserve all spaces and punctuation. Identifier modes like camelCase and snake_case clean punctuation and convert spacing to appropriate separators.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Type className="w-3.5 h-3.5" />
          Text Casing & Identifier Suite
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Online Text Case Converter
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Instantly convert any text between Title Case, UPPERCASE, lowercase, camelCase, snake_case,
          kebab-case, and Sentence case with real-time character telemetry.
        </p>
      </div>

      <div className="space-y-4">
        {/* Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {caseActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => setText(action.transform(text))}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-left transition-all group"
            >
              <div className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-400">
                {action.label}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">{action.desc}</div>
            </button>
          ))}
        </div>

        {/* Text Area Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400">
              {stats.characters} Chars | {stats.words} Words | {stats.lines} Lines
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
                onClick={() => downloadTextFile('case_converted.txt', text)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Type or paste your text here to convert case..."
            className="w-full bg-slate-950 text-slate-100 p-4 font-mono text-sm outline-none resize-none custom-scrollbar leading-relaxed"
          />
        </div>
      </div>

      <FaqSection faqs={faqs} />
    </div>
  );
}