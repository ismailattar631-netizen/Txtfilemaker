'use client';

import { useState, useRef, useEffect } from 'react';
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
  FileText,
  MoreHorizontal,
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
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<'none' | 'case' | 'lines'>('none');
  const [encodingMenuOpen, setEncodingMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const encodingMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
        setActiveSubmenu('none');
      }
      if (encodingMenuRef.current && !encodingMenuRef.current.contains(event.target as Node)) {
        setEncodingMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div className="bg-slate-100 border-b border-slate-300/80 dark:bg-slate-900 dark:border-slate-800 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 transition-colors">
      {/* Left section: Visible & prominent filename input, file upload, and history */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Filename input with enhanced visibility and icon prefix */}
        <div className="flex items-center bg-white border border-slate-300 dark:bg-slate-950 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus-within:!border-teal-500 dark:focus-within:!border-teal-400 rounded-xl px-2.5 py-1.5 transition-all shadow-sm">
          <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 mr-1.5 flex-shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1 select-none hidden xs:inline">
            File:
          </span>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            aria-label="File name for download"
            title="Click to rename your file before downloading"
            placeholder="document.txt"
            className="bg-transparent text-xs sm:text-sm font-mono font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none w-32 sm:w-44 md:w-52"
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

        {/* Open File Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/90 dark:text-slate-200 dark:hover:text-white dark:border-slate-700 text-xs font-medium transition-colors shadow-sm"
          title="Open local .txt file"
        >
          <Upload className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span className="hidden sm:inline">Open</span>
        </button>

        {/* Undo / Redo */}
        <div className="flex items-center bg-white border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl p-0.5 shadow-sm">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Redo (Ctrl+Y)"
            aria-label="Redo"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right section: Primary visible actions + Collapsible 'More' menu + Download */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Primary Action 1: Copy */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/90 dark:text-slate-200 dark:hover:text-white dark:border-slate-700 text-xs font-medium transition-colors shadow-sm"
          title="Copy full text to clipboard"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          )}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        {/* Primary Action 2: Line Ending Toggle (LF / CRLF) */}
        <div className="flex items-center bg-white border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl p-0.5 text-xs font-mono shadow-sm">
          <button
            onClick={() => setLineEnding('LF')}
            className={`px-2 py-1 rounded-lg transition-colors ${
              lineEnding === 'LF'
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            title="Unix/Linux/macOS standard line ending (\n)"
          >
            LF
          </button>
          <button
            onClick={() => setLineEnding('CRLF')}
            className={`px-2 py-1 rounded-lg transition-colors ${
              lineEnding === 'CRLF'
                ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            title="Windows standard line ending (\r\n)"
          >
            CRLF
          </button>
        </div>

        {/* Primary Action 3: Character Encoding Selector */}
        <div className="relative" ref={encodingMenuRef}>
          <button
            onClick={() => setEncodingMenuOpen(!encodingMenuOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/90 dark:text-slate-200 dark:hover:text-white dark:border-slate-700 text-xs font-mono uppercase transition-colors shadow-sm"
            title="Select character encoding"
            aria-expanded={encodingMenuOpen}
          >
            <span>{encoding}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {encodingMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in duration-100">
              <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 py-1">
                Select Encoding
              </div>
              {ENCODING_OPTIONS.map((enc) => (
                <button
                  key={enc.id}
                  onClick={() => {
                    setEncoding(enc.id);
                    setEncodingMenuOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                    encoding === enc.id
                      ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300 font-semibold border border-teal-500/30'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-mono">{enc.label}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-400">{enc.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Secondary Actions Collapsed: 'More' (⋯) Dropdown */}
        <div className="relative" ref={moreMenuRef}>
          <button
            onClick={() => {
              setMoreMenuOpen(!moreMenuOpen);
              setActiveSubmenu('none');
              setEncodingMenuOpen(false);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/90 dark:text-slate-200 dark:hover:text-white dark:border-slate-700 text-xs font-medium transition-colors shadow-sm"
            title="More actions: Find & Replace, Case, Lines, Print, Clear"
            aria-expanded={moreMenuOpen}
          >
            <MoreHorizontal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="hidden sm:inline">More</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {moreMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in duration-100 text-xs">
              {/* Find & Replace Action */}
              <button
                onClick={() => {
                  setMoreMenuOpen(false);
                  onOpenFindReplace();
                }}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  Find & Replace
                </span>
                <kbd className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                  Ctrl+F
                </kbd>
              </button>

              {/* Case Transformations Submenu Header */}
              <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 my-1">
                <button
                  onClick={() => setActiveSubmenu(activeSubmenu === 'case' ? 'none' : 'case')}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800 transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Type className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    Change Case
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform ${
                      activeSubmenu === 'case' ? 'rotate-180 text-teal-500' : ''
                    }`}
                  />
                </button>

                {activeSubmenu === 'case' && (
                  <div className="pl-4 pr-1 py-1 space-y-0.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg mt-1">
                    <button
                      onClick={() => {
                        setText(toUpperCase(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      UPPERCASE
                    </button>
                    <button
                      onClick={() => {
                        setText(toLowerCase(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      lowercase
                    </button>
                    <button
                      onClick={() => {
                        setText(toTitleCase(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      Title Case
                    </button>
                    <button
                      onClick={() => {
                        setText(toSentenceCase(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      Sentence case
                    </button>
                    <button
                      onClick={() => {
                        setText(toCamelCase(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      camelCase
                    </button>
                    <button
                      onClick={() => {
                        setText(toPascalCase(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      PascalCase
                    </button>
                    <button
                      onClick={() => {
                        setText(toSnakeCase(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      snake_case
                    </button>
                    <button
                      onClick={() => {
                        setText(toKebabCase(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      kebab-case
                    </button>
                  </div>
                )}
              </div>

              {/* Line Operations Submenu Header */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 my-1">
                <button
                  onClick={() => setActiveSubmenu(activeSubmenu === 'lines' ? 'none' : 'lines')}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800 transition-colors font-medium"
                >
                  <span className="flex items-center gap-2">
                    <ListFilter className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    Line Tools
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform ${
                      activeSubmenu === 'lines' ? 'rotate-180 text-teal-500' : ''
                    }`}
                  />
                </button>

                {activeSubmenu === 'lines' && (
                  <div className="pl-4 pr-1 py-1 space-y-0.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg mt-1">
                    <button
                      onClick={() => {
                        setText(sortLines(text, 'az'));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      Sort A &rarr; Z
                    </button>
                    <button
                      onClick={() => {
                        setText(sortLines(text, 'za'));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      Sort Z &rarr; A
                    </button>
                    <button
                      onClick={() => {
                        setText(reverseLines(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      Reverse Lines Order
                    </button>
                    <button
                      onClick={() => {
                        setText(removeDuplicateLines(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      Remove Duplicate Lines
                    </button>
                    <button
                      onClick={() => {
                        setText(removeEmptyLines(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      Remove Empty Lines
                    </button>
                    <button
                      onClick={() => {
                        setText(trimLines(text));
                        setMoreMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                    >
                      Trim Whitespace
                    </button>
                  </div>
                )}
              </div>

              {/* Print Action */}
              <button
                onClick={() => {
                  setMoreMenuOpen(false);
                  handlePrint();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Print Document</span>
              </button>

              {/* Clear Document Action */}
              <div className="pt-1 border-t border-slate-100 dark:border-slate-800/80 mt-1">
                <button
                  onClick={() => {
                    setMoreMenuOpen(false);
                    if (confirm('Are you sure you want to clear the editor?')) {
                      setText('');
                    }
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Editor</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action 4: Download Button (Teal Accent) */}
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          title="Download text file (Ctrl+S)"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}