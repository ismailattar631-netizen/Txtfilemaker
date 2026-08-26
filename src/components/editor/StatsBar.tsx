'use client';

import { TextStats } from '@/lib/text-utils';
import { SupportedEncoding, LineEnding } from '@/lib/encodings';
import { Clock, HardDrive, FileText, AlignLeft, Hash } from 'lucide-react';

export default function StatsBar({
  stats,
  encoding,
  lineEnding,
}: {
  stats: TextStats;
  encoding: SupportedEncoding;
  lineEnding: LineEnding;
}) {
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="w-full bg-slate-900/90 border-t border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-slate-400 select-none">
      {/* Metrics */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <div className="flex items-center gap-1.5" title="Total characters (including & excluding spaces)">
          <Hash className="w-3.5 h-3.5 text-teal-400" />
          <span>
            <strong className="text-slate-200 font-mono">{stats.characters.toLocaleString()}</strong> chars
            <span className="text-slate-500 text-[11px] ml-1">({stats.charactersNoSpaces.toLocaleString()} no spaces)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5" title="Total words">
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            <strong className="text-slate-200 font-mono">{stats.words.toLocaleString()}</strong> words
          </span>
        </div>

        <div className="flex items-center gap-1.5" title="Total lines & paragraphs">
          <AlignLeft className="w-3.5 h-3.5 text-sky-400" />
          <span>
            <strong className="text-slate-200 font-mono">{stats.lines.toLocaleString()}</strong> lines
            <span className="text-slate-500 text-[11px] ml-1">({stats.paragraphs} paras)</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5" title="Estimated reading and speaking time">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>
            ~<strong className="text-slate-200 font-mono">{stats.readingTimeMinutes}</strong> min read
          </span>
        </div>

        <div className="flex items-center gap-1.5" title="Calculated file byte size in selected encoding">
          <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
          <span>
            Size: <strong className="text-slate-200 font-mono">{formatBytes(stats.byteSizeUtf8)}</strong>
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 text-[11px] font-mono">
        <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700" title="Selected Line Ending standard">
          {lineEnding}
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 uppercase" title="Selected character encoding">
          {encoding}
        </span>
        <span className="hidden md:inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700" title="Readability grade level">
          {stats.readingGradeLevel}
        </span>
      </div>
    </div>
  );
}