'use client';

import { useState, useRef } from 'react';
import {
  Download,
  Copy,
  Check,
  Trash2,
  Undo,
  Redo,
  Upload,
  Search,
  Type,
  ListFilter,
  Printer,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { SupportedEncoding, LineEnding, ENCODING_OPTIONS } from '@/lib/encodings';
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  sortLines,
  reverseLines,
  removeDuplicateLines,
  removeEmptyLines,
  trimLines,
} from '@/lib/text-utils';

export default function Toolbar({
  filename,
  setFilename,
  text,
  setText,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  encoding,
  setEncoding,
  lineEnding,
  setLineEnding,
  onOpenFindReplace,
  onDownload,
}: {
  filename: string;
  setFilename: (name: string) => void;
  text: string;
  setText: (newText: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  encoding: SupportedEncoding;
  setEncoding: (enc: SupportedEncoding) => void;
  lineEnding: LineEnding;
  setLineEnding: (le: LineEnding) => void;
  onOpenFindReplace: () => void;
  onDownload: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);
  const [linesMenuOpen, setLinesMenuOpen] = useState(false);
  const [encodingMenuOpen, setEncodingMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setText(content);
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body { font-family: monospace; white-space: pre-wrap; padding: 20px; font-size: 13px; line-height: 1.5; }
          </style>
        </head>
        <body>${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
      {/* Left side: Filename, Upload, Undo/Redo */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Filename input */}
        <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-1.5 focus-within:border-teal-500 transition-colors">
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            aria-label="File name"
            placeholder="document.txt"
            className="bg-transparent text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none w-32 sm:w-44"
          />
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".txt,.log,.md,.csv,.json,.text"
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-medium border border-slate-700 transition-colors"
          title="Open a local .txt or .log file"
        >
          <Upload className="w-3.5 h-3.5 text-teal-400" />
          <span className="hidden sm:inline">Open File</span>
        </button>

        {/* Undo / Redo */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 rounded-lg hover:bg-slate-800 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 rounded-lg hover:bg-slate-800 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Tools: Case, Lines, Find & Replace */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Case Transform Menu */}
        <div className="relative">
          <button
            onClick={() => setCaseMenuOpen(!caseMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-medium border border-slate-700 transition-colors"
            title="Change Text Case"
          >
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span>Case</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {caseMenuOpen && (
            <div
              className="absolute left-0 mt-1 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in duration-100"
              onMouseLeave={() => setCaseMenuOpen(false)}
            >
              <button
                onClick={() => { setText(toUpperCase(text)); setCaseMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                UPPERCASE
              </button>
              <button
                onClick={() => { setText(toLowerCase(text)); setCaseMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                lowercase
              </button>
              <button
                onClick={() => { setText(toTitleCase(text)); setCaseMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                Title Case
              </button>
              <button
                onClick={() => { setText(toSentenceCase(text)); setCaseMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                Sentence case
              </button>
              <button
                onClick={() => { setText(toCamelCase(text)); setCaseMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                camelCase
              </button>
              <button
                onClick={() => { setText(toPascalCase(text)); setCaseMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                PascalCase
              </button>
              <button
                onClick={() => { setText(toSnakeCase(text)); setCaseMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                snake_case
              </button>
              <button
                onClick={() => { setText(toKebabCase(text)); setCaseMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                kebab-case
              </button>
            </div>
          )}
        </div>

        {/* Lines Tool Menu */}
        <div className="relative">
          <button
            onClick={() => setLinesMenuOpen(!linesMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-medium border border-slate-700 transition-colors"
            title="Line Operations"
          >
            <ListFilter className="w-3.5 h-3.5 text-sky-400" />
            <span>Lines</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {linesMenuOpen && (
            <div
              className="absolute left-0 mt-1 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in duration-100"
              onMouseLeave={() => setLinesMenuOpen(false)}
            >
              <button
                onClick={() => { setText(sortLines(text, 'az')); setLinesMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                Sort A to Z
              </button>
              <button
                onClick={() => { setText(sortLines(text, 'za')); setLinesMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                Sort Z to A
              </button>
              <button
                onClick={() => { setText(reverseLines(text)); setLinesMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                Reverse All Lines
              </button>
              <button
                onClick={() => { setText(removeDuplicateLines(text)); setLinesMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                Remove Duplicate Lines
              </button>
              <button
                onClick={() => { setText(removeEmptyLines(text)); setLinesMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                Remove Empty Lines
              </button>
              <button
                onClick={() => { setText(trimLines(text)); setLinesMenuOpen(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-teal-400"
              >
                Trim Leading/Trailing Space
              </button>
            </div>
          )}
        </div>

        {/* Find & Replace */}
        <button
          onClick={onOpenFindReplace}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-medium border border-slate-700 transition-colors"
          title="Find and Replace"
        >
          <Search className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Find & Replace</span>
        </button>

        {/* Line Ending Selector */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-xs font-mono">
          <button
            onClick={() => setLineEnding('LF')}
            className={`px-2 py-1 rounded-lg transition-colors ${
              lineEnding === 'LF' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Unix / Linux / macOS line ending (\n)"
          >
            LF
          </button>
          <button
            onClick={() => setLineEnding('CRLF')}
            className={`px-2 py-1 rounded-lg transition-colors ${
              lineEnding === 'CRLF' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Windows standard line ending (\r\n)"
          >
            CRLF
          </button>
        </div>

        {/* Encoding Dropdown */}
        <div className="relative">
          <button
            onClick={() => setEncodingMenuOpen(!encodingMenuOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-slate-100 text-xs font-mono uppercase transition-colors"
            title="Change Character Encoding"
          >
            <span>{encoding}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {encodingMenuOpen && (
            <div
              className="absolute right-0 mt-1 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in duration-100"
              onMouseLeave={() => setEncodingMenuOpen(false)}
            >
              <div className="text-[10px] font-semibold text-slate-500 uppercase px-2 py-1">
                Select Encoding
              </div>
              {ENCODING_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setEncoding(opt.id);
                    setEncodingMenuOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                    encoding === opt.id
                      ? 'bg-teal-500/10 text-teal-400 font-semibold border border-teal-500/30'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-mono">{opt.label}</div>
                  <div className="text-[10px] text-slate-400">{opt.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Print, Clear, Copy, Download */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrint}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800 transition-colors"
          title="Print or PDF Export"
        >
          <Printer className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear the editor?')) {
              setText('');
            }
          }}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition-colors"
          title="Clear Document"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          title="Copy full text to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-teal-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>

        {/* Download Button */}
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          <span>Download .txt</span>
        </button>
      </div>
    </div>
  );
}