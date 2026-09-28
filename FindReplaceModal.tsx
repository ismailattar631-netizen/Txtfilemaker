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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-6 shadow-2xl space-y-5 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <Search className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Find & Replace Studio
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
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
                className="w-full bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Replace with
            </label>
            <div className="relative">
              <input
                type="text"
                value={replaceWith}
                onChange={(e) => setReplaceWith(e.target.value)}
                placeholder="Enter replacement text..."
                className="w-full bg-slate-50 border border-slate-300 dark:bg-slate-950 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono transition-colors"
              />
            </div>
          </div>

          {/* Options Switches */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => {
                  setCaseSensitive(e.target.checked);
                  setMatchCount(null);
                }}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              Case Sensitive
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={matchWholeWord}
                onChange={(e) => {
                  setMatchWholeWord(e.target.checked);
                  setMatchCount(null);
                }}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              Whole Word
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isRegex}
                onChange={(e) => {
                  setIsRegex(e.target.checked);
                  setMatchCount(null);
                }}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              Regular Expression (RegEx)
            </label>
          </div>

          {matchCount !== null && (
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-xs flex items-center justify-between text-slate-700 dark:text-slate-300">
              <span>Matching instances:</span>
              <strong className="font-mono text-teal-600 dark:text-teal-400 text-sm">{matchCount} found</strong>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800/80 pt-4">
          <button
            onClick={handlePreview}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
          >
            Count Matches
          </button>
          <button
            onClick={handleReplaceAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02]"
          >
            <Check className="w-3.5 h-3.5" />
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
}