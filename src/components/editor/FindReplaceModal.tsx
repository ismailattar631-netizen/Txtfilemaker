'use client';

import { useState } from 'react';
import { Search, Replace, X, Check, ArrowRight } from 'lucide-react';
import { executeFindReplace } from '@/lib/text-utils';

export default function FindReplaceModal({
  isOpen,
  onClose,
  text,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onApply: (newText: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [replaceWith, setReplaceWith] = useState('');
  const [isRegex, setIsRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [matchWholeWord, setMatchWholeWord] = useState(false);
  const [matchCount, setMatchCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handlePreview = () => {
    if (!search) {
      setMatchCount(0);
      return;
    }
    const { matchesCount } = executeFindReplace(text, search, replaceWith, {
      regex: isRegex,
      caseSensitive,
      matchWholeWord,
    });
    setMatchCount(matchesCount);
  };

  const handleReplaceAll = () => {
    const { result, matchesCount } = executeFindReplace(text, search, replaceWith, {
      regex: isRegex,
      caseSensitive,
      matchWholeWord,
    });
    setMatchCount(matchesCount);
    onApply(result);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-lg">
            <Search className="w-5 h-5 text-teal-400" />
            Find & Replace Studio
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Find text / pattern
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setMatchCount(null);
                }}
                placeholder="Enter string or regex to find..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Replace with
            </label>
            <div className="relative">
              <input
                type="text"
                value={replaceWith}
                onChange={(e) => setReplaceWith(e.target.value)}
                placeholder="Enter replacement text..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded border-slate-700 text-teal-500 focus:ring-0 bg-slate-900"
              />
              Match Case (Aa)
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={matchWholeWord}
                onChange={(e) => setMatchWholeWord(e.target.checked)}
                disabled={isRegex}
                className="rounded border-slate-700 text-teal-500 focus:ring-0 bg-slate-900 disabled:opacity-40"
              />
              Whole Word (\\b)
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={isRegex}
                onChange={(e) => setIsRegex(e.target.checked)}
                className="rounded border-slate-700 text-teal-500 focus:ring-0 bg-slate-900"
              />
              Regex Mode (.*)
            </label>
          </div>

          {matchCount !== null && (
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs text-teal-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" />
              Found <strong className="font-mono text-teal-200">{matchCount}</strong> match{matchCount === 1 ? '' : 'es'} in document.
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={handlePreview}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-slate-100 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Count Matches
          </button>
          <button
            type="button"
            onClick={handleReplaceAll}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5"
          >
            <Replace className="w-4 h-4" />
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
}