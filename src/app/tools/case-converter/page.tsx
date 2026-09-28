'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Type, Copy, Download, Check } from 'lucide-react';
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
    {
      question: 'When should I use Title Case vs camelCase vs snake_case vs kebab-case?',
      answer: 'Use Title Case for headings, blog titles, and document names. For code, follow the conventions of your language: camelCase for variable and function names in JavaScript, PascalCase for class names, snake_case for Python variables and database fields, and kebab-case for URLs, file names, and CSS class names. The key rule is to pick one style per project and stick to it.',
    },
    {
      question: 'What happens to numbers and symbols when I convert text?',
      answer: 'Numbers are never touched — "file2024" keeps its digits in every mode. Standard modes (UPPERCASE, lowercase, Title Case, Sentence case) keep spaces and punctuation exactly as they are. Identifier modes (camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE) remove most punctuation and turn spaces into capital letters, underscores, or hyphens.',
    },
    {
      question: 'Does changing the case change the meaning of my text?',
      answer: 'No. Converting case only changes letter capitalization — your words stay the same. Just remember that identifier modes like camelCase or snake_case turn a whole phrase into a single word, so use those on one name or label at a time, not on full sentences.',
    },
    {
      question: 'Can I convert a whole list of names or labels at once?',
      answer: 'Yes. Paste your list into the box and click the case you want — line breaks are preserved, so each line is converted on its own. This is handy for renaming database columns, cleaning up spreadsheet headers, or standardizing a batch of product titles.',
    },
    {
      question: 'Which case should I use for blog post and video titles?',
      answer: 'Title Case is the usual choice for headlines — "How to Bake Sourdough Bread" reads cleaner than lowercase and friendlier than full UPPERCASE. Reserve all caps for short emphasis only; entire titles in UPPERCASE can look like shouting and may hurt click-through rates.',
    },
    {
      question: 'Is my text uploaded to a server when I use this tool?',
      answer: 'No. Every conversion runs in your browser on your own device — the text you paste is never uploaded, stored, or sent anywhere. You can safely use it on sensitive drafts, private notes, or internal code.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
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
          kebab-case, and Sentence case — with a live character, word, and line counter.
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

      {/* How-To Section */}
      <div className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            How to Convert Text Case in 3 Steps
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            No sign-up, no settings to learn — just paste, click, and copy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Paste or Type Your Text</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Type your own text into the box above, or paste a sentence, title, or list. The box starts with a
              sample sentence you can clear or convert right away to try things out.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Pick a Case Style</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Click any case button — UPPERCASE, Title Case, camelCase, snake_case, and more. The whole text
              converts instantly, and you can chain conversions by clicking another style on top of the result.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-slate-900/60 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Copy or Download</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Use the Copy button to grab the converted text for your document, code editor, or form — or hit
              Download .txt to save it as a plain text file.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Examples Section */}
      <div className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Quick Examples
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Here is how the phrase <code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">"hello world"</code> looks
            in each major case style:
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/60 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800">
            {[
              { label: 'UPPERCASE', value: toUpperCase('hello world') },
              { label: 'lowercase', value: toLowerCase('hello world') },
              { label: 'Title Case', value: toTitleCase('hello world') },
              { label: 'Sentence case', value: toSentenceCase('hello world') },
              { label: 'camelCase', value: toCamelCase('hello world') },
              { label: 'PascalCase', value: toPascalCase('hello world') },
              { label: 'snake_case', value: toSnakeCase('hello world') },
              { label: 'kebab-case', value: toKebabCase('hello world') },
            ].map((row, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/60 px-5 py-3.5 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {row.label}
                </span>
                <span className="font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 text-right break-all">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          A practical rule of thumb: <strong>Title Case</strong> is for people to read (headings, titles),
          while <strong>camelCase</strong>, <strong>snake_case</strong>, and <strong>kebab-case</strong> are
          for machines to read (variable names, URLs, file names). If you are naming things in code, match
          the style your language or team already uses.
        </p>
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

      <FaqSection
        title="Text Case Converter FAQs"
        subtitle="Practical answers about when to use each case style and how this tool handles your text."
        faqs={faqs}
      />
    </div>
  );
}