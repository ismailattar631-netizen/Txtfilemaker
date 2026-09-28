'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { Layers, Download, Sparkles, FileText, Check, FileArchive } from 'lucide-react';
import Link from 'next/link';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import { TEMPLATES } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';
import {
  RelatedToolsSection,
  RelatedTemplatesSection,
  RelatedGuidesSection,
} from '@/components/seo/InternalLinks';
import { applyLineEndings, LineEnding } from '@/lib/encodings';

export default function BatchGeneratorPage() {
  const [filenamePattern, setFilenamePattern] = useState('record_{id}.txt');
  const [contentTemplate, setContentTemplate] = useState(`DOCUMENT ID: {id}
RECORD NAME: {name}
GENERATED AT: {timestamp}
STATUS: VERIFIED
------------------------------------------------------------------------
This is an automated batch-generated text document for testing and data pipelines.`);
  
  const [mode, setMode] = useState<'sequence' | 'csv'>('sequence');
  const [startNum, setStartNum] = useState(1);
  const [count, setCount] = useState(10);
  const [padZeroes, setPadZeroes] = useState(true);
  const [csvData, setCsvData] = useState(`id,name
101,Alpha Enterprise
102,Beta Logistics
103,Gamma Robotics
104,Delta Cloud
105,Epsilon AI`);

  const [lineEnding, setLineEnding] = useState<LineEnding>('LF');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<{ filename: string; content: string }[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      const files: { filename: string; content: string }[] = [];
      const timestamp = new Date().toISOString();

      if (mode === 'sequence') {
        const total = Math.min(Math.max(1, count), 500);
        const padLength = padZeroes ? String(startNum + total - 1).length : 1;

        for (let i = 0; i < total; i++) {
          const currentId = startNum + i;
          const formattedId = padZeroes
            ? String(currentId).padStart(Math.max(3, padLength), '0')
            : String(currentId);

          const fname = filenamePattern
            .replace(/\{id\}/g, formattedId)
            .replace(/\{timestamp\}/g, String(Date.now()));

          const content = contentTemplate
            .replace(/\{id\}/g, formattedId)
            .replace(/\{name\}/g, `Item-${formattedId}`)
            .replace(/\{timestamp\}/g, timestamp);

          files.push({
            filename: fname.endsWith('.txt') ? fname : `${fname}.txt`,
            content: applyLineEndings(content, lineEnding),
          });
        }
      } else {
        // CSV Mode
        const lines = csvData.trim().split(/\r?\n/);
        if (lines.length > 1) {
          const headers = lines[0].split(',').map((h) => h.trim());
          for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',').map((val) => val.trim());
            let fname = filenamePattern;
            let content = contentTemplate;

            headers.forEach((header, index) => {
              const val = row[index] || '';
              const regex = new RegExp(`\\{${header}\\}`, 'g');
              fname = fname.replace(regex, val);
              content = content.replace(regex, val);
            });

            fname = fname.replace(/\{timestamp\}/g, String(Date.now()));
            content = content.replace(/\{timestamp\}/g, timestamp);

            files.push({
              filename: fname.endsWith('.txt') ? fname : `${fname}.txt`,
              content: applyLineEndings(content, lineEnding),
            });
          }
        }
      }

      setGeneratedFiles(files);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadZip = async () => {
    if (generatedFiles.length === 0) return;
    setIsGenerating(true);

    try {
      const zip = new JSZip();
      generatedFiles.forEach((file) => {
        zip.file(file.filename, file.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `batch_txt_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadSingleFile = (file: { filename: string; content: string }) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const batchFaqs = [
    {
      question: 'What is a Batch TXT Generator?',
      answer: 'A batch text generator allows you to create dozens or hundreds of individual plain text files in one click based on a template with placeholders (like {id}, {name}, {timestamp}), bundled neatly into a .ZIP archive.',
    },
    {
      question: 'How many text files can I generate at once?',
      answer: 'You can generate up to 500 files directly in your web browser instantly. For larger server-scale pipelines, you can also connect directly to our /api/generate-batch endpoint.',
    },
    {
      question: 'Can I provide my own CSV data for variables?',
      answer: 'Yes! Switch the mode to "CSV / Custom Data". Define your columns in the header (e.g. id, customer, product) and reference them as {id}, {customer}, {product} in the filename and template.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      <FaqJsonLd faqs={batchFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Tools', url: 'https://txtcraft.site/tools/txt-file-maker' },
          { name: 'Batch TXT Generator', url: 'https://txtcraft.site/tools/batch-generator' },
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
        <span className="text-slate-900 dark:text-slate-200 font-medium">Batch TXT Generator</span>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          Bulk Text Production Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Batch Plain Text (.txt) File Generator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl">
          Instantly generate hundreds of custom text files from templates with dynamic variable tokens.
          Package and download all output files as a single compressed ZIP archive.
        </p>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Template & Filename */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              1. Filename Pattern & Line Endings
            </h2>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Filename Pattern (use <code className="text-teal-600 dark:text-teal-400 font-mono">{'{id}'}</code> or variable names)
              </label>
              <input
                type="text"
                value={filenamePattern}
                onChange={(e) => setFilenamePattern(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500 shadow-sm"
              />
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-slate-600 dark:text-slate-400">Target Line Terminators:</span>
              <div className="flex items-center bg-slate-100 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-lg p-0.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setLineEnding('LF')}
                  className={`px-3 py-1 rounded transition-colors ${
                    lineEnding === 'LF' ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 font-semibold' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  LF (Linux/macOS)
                </button>
                <button
                  type="button"
                  onClick={() => setLineEnding('CRLF')}
                  className={`px-3 py-1 rounded transition-colors ${
                    lineEnding === 'CRLF' ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 font-semibold' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  CRLF (Windows)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              2. Content Template
            </h2>

            <textarea
              value={contentTemplate}
              onChange={(e) => setContentTemplate(e.target.value)}
              rows={8}
              placeholder="Enter your document template..."
              className="w-full bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500 custom-scrollbar leading-relaxed shadow-sm"
            />
          </div>
        </div>

        {/* Right Column: Generation Mode & Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900/80 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              3. Data Generation Mode
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('sequence')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  mode === 'sequence'
                    ? 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/40'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800'
                }`}
              >
                Sequential Numbering
              </button>
              <button
                type="button"
                onClick={() => setMode('csv')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  mode === 'csv'
                    ? 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/40'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800'
                }`}
              >
                CSV / Custom Dataset
              </button>
            </div>

            {mode === 'sequence' ? (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Start Number</label>
                    <input
                      type="number"
                      value={startNum}
                      onChange={(e) => setStartNum(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-slate-100 font-mono shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">File Count (Max 500)</label>
                    <input
                      type="number"
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                      max={500}
                      min={1}
                      className="w-full bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-slate-100 font-mono shadow-sm"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={padZeroes}
                    onChange={(e) => setPadZeroes(e.target.checked)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-0 bg-slate-50 dark:bg-slate-950 dark:border-slate-700"
                  />
                  Pad numbers with leading zeroes (e.g. 001, 002)
                </label>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <label className="block text-xs text-slate-600 dark:text-slate-400">
                  Paste CSV Data (First row = variable headers)
                </label>
                <textarea
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  rows={6}
                  className="w-full bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500 custom-scrollbar shadow-sm"
                />
              </div>
            )}

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Generate Batch Files'}
            </button>
          </div>

          {/* Output Summary & ZIP Download */}
          {generatedFiles.length > 0 && (
            <div className="bg-white border border-teal-500/30 shadow-md dark:bg-slate-900/80 dark:border-teal-500/30 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {generatedFiles.length} Files Ready
                  </h3>
                  <span className="text-xs text-teal-600 dark:text-teal-400">
                    Compiled in memory ({lineEnding} line endings)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadZip}
                  disabled={isGenerating}
                  className="py-2 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-1.5 transition-all"
                >
                  <FileArchive className="w-4 h-4" />
                  Download ZIP
                </button>
              </div>

              {downloadSuccess && (
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs text-teal-700 dark:text-teal-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  ZIP archive downloaded successfully!
                </div>
              )}

              <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1.5 pr-1">
                {generatedFiles.slice(0, 15).map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-xs"
                  >
                    <span className="font-mono text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                      {file.filename}
                    </span>
                    <button
                      onClick={() => downloadSingleFile(file)}
                      className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 p-1"
                      title="Download this file"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {generatedFiles.length > 15 && (
                  <div className="text-center text-xs text-slate-500 py-1">
                    + {generatedFiles.length - 15} more files inside the ZIP
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Internal Linking: Related Tools */}
      <RelatedToolsSection
        title="More Essential Text Utilities"
        subtitle="Combine your batch generation with line sorting, string transformation, and plain text creation."
        excludeHref="/tools/batch-generator"
        maxItems={3}
      />

      {/* Internal Linking: Related Templates */}
      <RelatedTemplatesSection
        title="Compatible Plain Text Templates"
        subtitle="Use these templates as base blueprints for your batch generation pipelines."
        templates={TEMPLATES.slice(0, 3)}
      />

      {/* Internal Linking: Related Guides */}
      <RelatedGuidesSection
        title="Guides on Batch Text Automation"
        subtitle="Learn how to optimize high-volume plain text workflows and avoid common errors."
        articles={ARTICLES.slice(0, 3)}
      />

      <FaqSection faqs={batchFaqs} />
    </div>
  );
}