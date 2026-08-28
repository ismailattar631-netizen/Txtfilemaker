import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES, getArticleBySlug } from '@/lib/articles-data';
import { ArticleJsonLd } from '@/components/seo/JsonLd';
import FaqSection from '@/components/seo/FaqSection';
import { BookOpen, Clock, Calendar, ArrowLeft, User, Sparkles, FileText } from 'lucide-react';

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} - TxtCraft Guides`,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author.name],
    },
  };
}

export default function GuideArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        url={`https://txtcraft.site/guides/${article.slug}`}
        datePublished={article.publishDate}
        authorName={article.author.name}
      />

      {/* Breadcrumb */}
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Guides
      </Link>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-800/80 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
          {article.category}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 tracking-tight leading-tight">
          {article.title}
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">{article.author.name}</div>
              <div className="text-[11px] text-slate-500">{article.author.role}</div>
            </div>
          </div>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {article.publishDate}
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {article.readTime}
          </span>
        </div>
      </header>

      {/* Article Body Content */}
      <div className="prose prose-invert max-w-none prose-teal text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
        <div
          dangerouslySetInnerHTML={{
            __html: article.content
              .replace(/### (.*?)\n/g, '<h3 class="text-xl sm:text-2xl font-bold text-slate-100 mt-8 mb-3 tracking-tight">$1</h3>')
              .replace(/#### (.*?)\n/g, '<h4 class="text-lg font-bold text-slate-200 mt-6 mb-2">$1</h4>')
              .replace(/```(bash|text|javascript)?\n([\s\S]*?)```/g, '<pre class="bg-slate-950 border border-slate-800 p-4 rounded-2xl font-mono text-xs text-teal-300 overflow-x-auto my-4 custom-scrollbar"><code>$2</code></pre>')
              .replace(/`([^`]+)`/g, '<code class="bg-slate-900 text-teal-400 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-800">$1</code>')
              .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-100 font-semibold">$1</strong>')
              .replace(/\n\n/g, '<p class="text-slate-400 mb-4 leading-relaxed">')
              .replace(/---/g, '<hr class="border-slate-800 my-8"/>'),
          }}
        />
      </div>

      {/* CTA Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-emerald-950/40 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-slate-100 text-lg">Ready to Create Plain Text Files?</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Open the interactive TxtCraft studio to create, format, and export .txt documents.
          </p>
        </div>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 whitespace-nowrap transition-transform hover:scale-105"
        >
          Open Text Studio &rarr;
        </Link>
      </div>

      {/* Article Specific FAQ Section */}
      <FaqSection faqs={article.faqs} />
    </article>
  );
}