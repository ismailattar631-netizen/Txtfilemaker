'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Type, Copy, Download, Check } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import { TEMPLATES } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';
import {
  RelatedToolsSection,
  RelatedTemplatesSection,
  RelatedGuidesSection,
} from '@/components/seo/InternalLinks';
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
    'The quick brown fox jumps over the lazy dog. TXTCRAFT provides precision string transformations!'
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Tools', url: 'https://txtcraft.site/tools/txt-file-maker' },
          { name: 'Text Case Converter', url: 'https://txtcraft.site/tools/case-converter' },
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
        <span className="text-slate-900 dark:text-slate-200 font-medium">Text Case Converter</span>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Type className="w-3.5 h-3.5" />
          Text Casing & Identifier Suite
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Online Text Case Converter
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
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
              className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-amber-500 dark:bg-slate-900/80 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:border-amber-500/40 text-left transition-all group"
            >
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                {action.label}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">{action.desc}</div>
            </button>
          ))}
        </div>

        {/* Text Area Card */}
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden shadow-xl">
          <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
              {stats.characters} Chars | {stats.words} Words | {stats.lines} Lines
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
                onClick={() => downloadTextFile('case_converted.txt', text)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
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
            className="w-full bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-600 p-4 font-mono text-sm outline-none resize-none custom-scrollbar leading-relaxed"
          />
        </div>
      </div>

      {/* Internal Linking: Related Tools */}
      <RelatedToolsSection
        title="More Text Transformation Tools"
        subtitle="Sort lines, remove duplicates, or compare different versions of your text."
        excludeHref="/tools/case-converter"
        maxItems={3}
      />

      {/* Internal Linking: Related Templates */}
      <RelatedTemplatesSection
        title="Popular Plain Text Templates"
        subtitle="Load pre-formatted developer templates and convert strings as needed."
        templates={TEMPLATES.slice(0, 3)}
      />

      {/* Internal Linking: Related Guides */}
      <RelatedGuidesSection
        title="Plain Text Guides & Standards"
        subtitle="Read in-depth articles on text formatting, typography, and machine readability."
        articles={ARTICLES.slice(0, 3)}
      />

      <FaqSection faqs={faqs} />
    </div>
  );
}