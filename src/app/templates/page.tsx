'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TEMPLATES, TextTemplate } from '@/lib/templates-data';
import { FolderOpen, Search, Download, ExternalLink, FileText, Sparkles } from 'lucide-react';
import { downloadTextFile } from '@/lib/encodings';

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'developer', label: 'Developer & Code' },
    { id: 'webmaster', label: 'Webmaster & SEO' },
    { id: 'legal', label: 'Legal & Licenses' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'business', label: 'Business & Logs' },
  ];

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
          <FolderOpen className="w-3.5 h-3.5" />
          Curated Plain Text Repository
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Plain Text (.txt) Templates Library
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Browse, preview, and download structured plain text templates for documentation, open-source licenses,
          robots.txt, changelogs, meeting notes, and ASCII data tables.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.slug}
            className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-teal-500/5 space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-teal-400 border border-slate-800">
                  {template.defaultFilename}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  {template.category}
                </span>
              </div>

              <Link href={`/templates/${template.slug}`}>
                <h3 className="font-bold text-slate-100 group-hover:text-teal-400 transition-colors text-base line-clamp-1">
                  {template.title}
                </h3>
              </Link>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {template.description}
              </p>

              {/* Code preview snippet */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 font-mono text-[11px] text-slate-400 line-clamp-3 overflow-hidden select-none">
                {template.content}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <Link
                href={`/templates/${template.slug}`}
                className="text-xs font-semibold text-teal-400 hover:underline flex items-center gap-1"
              >
                View & Edit <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => downloadTextFile(template.defaultFilename, template.content)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Download this template directly"
              >
                <Download className="w-3 h-3 text-teal-400" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}