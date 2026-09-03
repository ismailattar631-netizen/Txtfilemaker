import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articles-data';
import { TEMPLATES } from '@/lib/templates-data';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { RelatedToolsSection, RelatedTemplatesSection } from '@/components/seo/InternalLinks';

export const metadata: Metadata = {
  title: 'Plain Text Guides & Documentation Hub | TxtCraft',
  description:
    'In-depth engineering guides on character encodings (UTF-8, UTF-16, ANSI), CRLF vs LF line endings, batch automation, and web standards.',
  alternates: {
    canonical: 'https://txtcraft.site/guides',
  },
  openGraph: {
    title: 'Plain Text Guides & Documentation Hub | TxtCraft',
    description:
      'In-depth engineering guides on character encodings (UTF-8, UTF-16, ANSI), CRLF vs LF line endings, batch automation, and web standards.',
    url: 'https://txtcraft.site/guides',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Technical Plain Text Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plain Text Guides & Documentation Hub | TxtCraft',
    description:
      'In-depth engineering guides on character encodings, line endings, and web standards.',
    images: ['/og-image.png'],
  },
};

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Guides', url: 'https://txtcraft.site/guides' },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium">Technical Guides</span>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          Technical Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Plain Text Architecture & Best Practices
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
          Authoritative technical articles exploring character encodings, POSIX standards,
          batch data generation, and modern text processing pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/guides/${article.slug}`}
            className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-500 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/40 p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-teal-500/5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-slate-800 font-semibold">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{article.author.name}</span>
              </div>
              <span className="font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Internal Linking: Related Tools */}
      <RelatedToolsSection
        title="Interactive Text Processing Tools"
        subtitle="Put these concepts into practice using our specialized browser tools."
        maxItems={3}
      />

      {/* Internal Linking: Related Templates */}
      <RelatedTemplatesSection
        title="Ready-to-Use Plain Text Templates"
        subtitle="Standardized templates referenced in our architectural guides."
        templates={TEMPLATES.slice(0, 3)}
      />
    </div>
  );
}