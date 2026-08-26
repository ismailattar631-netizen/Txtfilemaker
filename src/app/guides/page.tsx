import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articles-data';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plain Text Guides & Documentation Hub',
  description: 'In-depth engineering guides on character encodings (UTF-8, UTF-16, ANSI), CRLF vs LF line endings, batch automation, and web standards.',
};

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          Technical Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Plain Text Architecture & Best Practices
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Authoritative technical articles exploring character encodings, POSIX standards,
          batch data generation, and modern text processing pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/guides/${article.slug}`}
            className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-teal-500/5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-teal-400 border border-slate-800 font-semibold">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-100 group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-teal-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{article.author.name}</span>
              </div>
              <span className="font-semibold text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}