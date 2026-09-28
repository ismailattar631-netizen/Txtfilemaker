import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articles-data';
import { TEMPLATES } from '@/lib/templates-data';
import { Clock, Calendar, ArrowLeft, User, BookOpen, Wrench, ArrowRight } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import {
  RelatedToolsSection,
  RelatedTemplatesSection,
  RelatedGuidesSection,
} from '@/components/seo/InternalLinks';

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: `${article.title} - TxtCraft Guides`,
    description: article.excerpt,
    keywords: article.tags,
    alternates: {
      canonical: `https://txtcraft.site/guides/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishDate,
      authors: [article.author.name],
      url: `https://txtcraft.site/guides/${article.slug}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${article.title} | TxtCraft Guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: ['/og-image.png'],
    },
  };
}

const GUIDE_SPECIFIC_TOOLS: Record<
  string,
  { title: string; href: string; description: string; badge: string }[]
> = {
  'complete-guide-to-txt-files': [
    {
      title: 'TXT File Maker',
      href: '/tools/txt-file-maker',
      description: 'Create, edit, and download plain text files with UTF-8, ANSI, and CRLF/LF controls.',
      badge: 'Editor',
    },
    {
      title: 'Text Diff Checker',
      href: '/tools/diff-checker',
      description: 'Compare text file revisions side-by-side to highlight added or removed lines.',
      badge: 'Comparison',
    },
  ],
  'crlf-vs-lf-line-endings': [
    {
      title: 'Line Tools & Sorter',
      href: '/tools/line-tools',
      description: 'Normalize line breaks, deduplicate rows, and trim trailing whitespace.',
      badge: 'Formatting',
    },
    {
      title: 'TXT File Maker',
      href: '/tools/txt-file-maker',
      description: 'Instant toolbar toggle between Windows CRLF (\\r\\n) and Linux LF (\\n).',
      badge: 'Editor',
    },
  ],
  'character-encodings-utf8-utf16-ascii': [
    {
      title: 'TXT File Maker',
      href: '/tools/txt-file-maker',
      description: 'Export files in UTF-8, UTF-8 with BOM, ANSI Windows-1252, or UTF-16 Unicode.',
      badge: 'Encodings',
    },
    {
      title: 'Text Case Converter',
      href: '/tools/case-converter',
      description: 'Convert strings between Title Case, UPPERCASE, camelCase, and snake_case.',
      badge: 'Manipulation',
    },
  ],
  'batch-txt-generation-workflows': [
    {
      title: 'Batch TXT Generator',
      href: '/tools/batch-generator',
      description: 'Generate hundreds of templated text files with dynamic variable tokens into a ZIP.',
      badge: 'Automation',
    },
    {
      title: 'Line Tools & Sorter',
      href: '/tools/line-tools',
      description: 'Prepare, clean, and deduplicate dataset lines prior to batch production.',
      badge: 'Data Cleaning',
    },
  ],
  'mastering-plain-text-formatting': [
    {
      title: 'Markdown to Plain Text',
      href: '/tools/markdown-to-txt',
      description: 'Strip Markdown formatting and HTML tags into pure, clean unformatted text.',
      badge: 'Text Stripper',
    },
    {
      title: 'Text Case Converter',
      href: '/tools/case-converter',
      description: 'Instantly transform variable names and copy into snake_case, camelCase, or Title Case.',
      badge: 'Case Converter',
    },
  ],
  'anatomy-of-robots-and-security-txt': [
    {
      title: 'Robots.txt Builder',
      href: '/tools/robots-txt-generator',
      description: 'Visually generate RFC-compliant robots.txt files with sitemap and crawl rules.',
      badge: 'SEO Webmaster',
    },
    {
      title: 'TXT File Maker',
      href: '/tools/txt-file-maker',
      description: 'Draft and customize security.txt disclosure and webmaster files directly in your browser.',
      badge: 'Editor',
    },
  ],
};

export default function GuideArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  // Find other related articles
  const otherArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  // Relevant templates
  const featuredTemplates = TEMPLATES.slice(0, 3);

  // Specific curated tools for this article
  const curatedTools = GUIDE_SPECIFIC_TOOLS[article.slug] || [
    {
      title: 'TXT File Maker',
      href: '/tools/txt-file-maker',
      description: 'Create, edit, and download plain text files online.',
      badge: 'Editor',
    },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        url={`https://txtcraft.site/guides/${article.slug}`}
        datePublished={article.publishDate}
        authorName={article.author.name}
      />
      <FaqJsonLd faqs={article.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Guides', url: 'https://txtcraft.site/guides' },
          { name: article.title, url: `https://txtcraft.site/guides/${article.slug}` },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          Guides
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-xs">{article.title}</span>
      </div>

      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Knowledge Base
      </Link>

      {/* Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          {article.category}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {article.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">{article.author.name}</div>
              <div className="text-[11px] text-slate-500">{article.author.role}</div>
            </div>
          </div>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            {article.publishDate}
          </span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            {article.readTime}
          </span>
        </div>
      </header>

      {/* Article Body Content */}
      <div className="prose max-w-none prose-teal text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
        <div
          dangerouslySetInnerHTML={{
            __html: article.content
              .replace(/### (.*?)\n/g, '<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3 tracking-tight">$1</h3>')
              .replace(/#### (.*?)\n/g, '<h4 class="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">$1</h4>')
              .replace(/```(bash|text|javascript)?\n([\s\S]*?)```/g, '<pre class="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl font-mono text-xs text-teal-700 dark:text-teal-300 overflow-x-auto my-4 custom-scrollbar"><code>$2</code></pre>')
              .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-teal-700 dark:bg-slate-900 dark:text-teal-400 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-200 dark:border-slate-800">$1</code>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-teal-600 dark:text-teal-400 font-semibold underline underline-offset-2 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">$1</a>')
              .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-900 dark:text-slate-100 font-semibold">$1</strong>')
              .replace(/\n\n/g, '<p class="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">')
              .replace(/---/g, '<hr class="border-slate-200 dark:border-slate-800 my-8"/>'),
          }}
        />
      </div>

      {/* Specific Curated Related Tools Section for this Article */}
      {curatedTools.length > 0 && (
        <div className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-500/5 via-slate-50 to-emerald-500/5 p-6 sm:p-8 dark:border-teal-500/20 dark:from-teal-950/30 dark:via-slate-900/60 dark:to-emerald-950/30 space-y-5 shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              <Wrench className="w-3.5 h-3.5" />
              Related Tools for this Guide
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
              Put these concepts into practice
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Use our dedicated, browser-based utilities to format, clean, and generate your files instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {curatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md dark:bg-slate-900/80 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {tool.title}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-1">
                  Open {tool.title} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main CTA Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-50 via-slate-50 to-emerald-50 border border-teal-200 dark:from-teal-950/40 dark:via-slate-900 dark:to-emerald-950/40 dark:border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Ready to Create Plain Text Files?</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Open our online notepad and TXT File Maker to write, format, and download .txt files.
          </p>
        </div>
        <Link
          href="/tools/txt-file-maker"
          className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/20 whitespace-nowrap transition-transform hover:scale-105"
        >
          Open TXT File Maker &rarr;
        </Link>
      </div>

      {/* Internal Linking: Related Tools */}
      <RelatedToolsSection
        title="More Webmaster & Plain Text Tools"
        subtitle="Apply these best practices using our dedicated client-side utilities."
        maxItems={3}
      />

      {/* Internal Linking: Related Templates */}
      <RelatedTemplatesSection
        title="Related Plain Text Templates"
        subtitle="Download standardized templates implementing these guidelines."
        templates={featuredTemplates}
      />

      {/* Internal Linking: Related Guides */}
      <RelatedGuidesSection
        title="More Technical Guides & Tutorials"
        subtitle="Deepen your understanding of file systems, data encoding, and DevOps automation."
        articles={otherArticles}
      />

      {/* Article Specific FAQ Section */}
      <FaqSection faqs={article.faqs} />
    </article>
  );
}