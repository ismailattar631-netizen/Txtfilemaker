'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Toolbar from './Toolbar';
import StatsBar from './StatsBar';
import FindReplaceModal from './FindReplaceModal';
import { computeTextStats } from '@/lib/text-utils';
import { SupportedEncoding, LineEnding, downloadTextFile } from '@/lib/encodings';
import { WrapText, ZoomIn, ZoomOut, Maximize2, Minimize2, FileCode2 } from 'lucide-react';

interface TxtEditorProps {
  initialText?: string;
  initialFilename?: string;
  className?: string;
}

export default function TxtEditor({
  initialText = '',
  initialFilename = 'document.txt',
  className = '',
}: TxtEditorProps) {
  const [text, setTextState] = useState<string>(initialText);
  const [filename, setFilename] = useState<string>(initialFilename);
  const [encoding, setEncoding] = useState<SupportedEncoding>('utf-8');
  const [lineEnding, setLineEnding] = useState<LineEnding>('LF');

  // UI state
  const [wordWrap, setWordWrap] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<number>(14);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [findReplaceOpen, setFindReplaceOpen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Undo / Redo history
  const [history, setHistory] = useState<string[]>([initialText]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize initialText changes if template changed externally
  useEffect(() => {
    if (initialText !== undefined && initialText !== text) {
      setTextState(initialText);
      setHistory([initialText]);
      setHistoryIndex(0);
    }
  }, [initialText]);

  useEffect(() => {
    if (initialFilename) {
      setFilename(initialFilename);
    }
  }, [initialFilename]);

  // Push new state into history
  const setText = (newText: string, recordHistory = true) => {
    setTextState(newText);
    if (recordHistory && newText !== history[historyIndex]) {
      const updatedHistory = history.slice(0, historyIndex + 1);
      if (updatedHistory.length > 40) updatedHistory.shift();
      updatedHistory.push(newText);
      setHistory(updatedHistory);
      setHistoryIndex(updatedHistory.length - 1);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = historyIndex - 1;
      setHistoryIndex(prev);
      setTextState(history[prev]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = historyIndex + 1;
      setHistoryIndex(next);
      setTextState(history[next]);
    }
  };

  // Synchronize line numbers scroll with textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadTextFile(filename, text, encoding, lineEnding);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setFindReplaceOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z') || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filename, text, encoding, lineEnding, historyIndex, history]);

  // Drag & drop file handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          setText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  // Compute metrics
  const stats = useMemo(() => computeTextStats(text), [text]);

  const lineCount = useMemo(() => {
    return text.split(/\r?\n/).length;
  }, [text]);

  const lineNumbers = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= Math.max(lineCount, 1); i++) {
      arr.push(i);
    }
    return arr;
  }, [lineCount]);

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 overflow-hidden shadow-xl transition-all duration-200 flex flex-col ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]' : className
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Drag & drop overlay indicator */}
      {isDragOver && (
        <div className="absolute inset-0 z-40 bg-teal-950/80 backdrop-blur-sm border-2 border-dashed border-teal-400 flex flex-col items-center justify-center text-teal-300">
          <FileCode2 className="w-12 h-12 mb-3 animate-bounce" />
          <p className="font-bold text-lg">Drop your .txt or code file here</p>
          <p className="text-sm text-teal-400/80">TxtCraft will immediately load and analyze it</p>
        </div>
      )}

      {/* Editor Toolbar */}
      <Toolbar
        filename={filename}
        setFilename={setFilename}
        text={text}
        setText={setText}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        encoding={encoding}
        setEncoding={setEncoding}
        lineEnding={lineEnding}
        setLineEnding={setLineEnding}
        onOpenFindReplace={() => setFindReplaceOpen(true)}
        onDownload={() => downloadTextFile(filename, text, encoding, lineEnding)}
      />

      {/* View Options Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-xs text-slate-500 dark:bg-slate-900/60 dark:border-slate-800/80 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWordWrap(!wordWrap)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
              wordWrap
                ? 'text-teal-600 bg-teal-500/10 dark:text-teal-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
            title="Toggle Word Wrap"
          >
            <WrapText className="w-3.5 h-3.5" />
            <span>Wrap: {wordWrap ? 'On' : 'Off'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Font size control */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setFontSize(Math.max(11, fontSize - 1))}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              title="Decrease Font Size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1 text-slate-700 dark:text-slate-300">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              title="Increase Font Size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="relative flex-1 flex overflow-hidden min-h-[380px] max-h-[600px] sm:max-h-[680px]">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="select-none bg-slate-50 text-slate-400 font-mono text-right pr-3 pl-3 pt-3 pb-3 border-r border-slate-200 dark:bg-slate-950 dark:text-slate-600 dark:border-slate-800/80 overflow-hidden shrink-0"
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.5rem', width: '3.5rem' }}
        >
          {lineNumbers.map((n) => (
            <div key={n} className="leading-6">
              {n}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onScroll={handleScroll}
          placeholder="Start typing your plain text here, drop an existing file, or load a template below..."
          spellCheck={false}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: '1.5rem',
            whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
            wordBreak: wordWrap ? 'break-word' : 'normal',
          }}
          className="flex-1 w-full bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-600 font-mono p-3 outline-none resize-none overflow-auto custom-scrollbar leading-6"
        />
      </div>

      {/* Real-time Stats Footer */}
      <StatsBar stats={stats} encoding={encoding} lineEnding={lineEnding} />

      {/* Find & Replace Modal */}
      <FindReplaceModal
        isOpen={findReplaceOpen}
        onClose={() => setFindReplaceOpen(false)}
        text={text}
        onApply={(newText) => setText(newText)}
      />
    </div>
  );
}