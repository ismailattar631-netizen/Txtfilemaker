import Link from 'next/link';
import {
  FileText,
  Layers,
  Type,
  ListTree,
  Bot,
  FileCode,
  GitCompare,
  BookOpen,
  FolderOpen,
  ArrowRight,
} from 'lucide-react';

export interface RelatedLink {
  href: string;
  title: string;
  description: string;
  category?: string;
  icon?: any;
}

export const ALL_TOOLS: RelatedLink[] = [
  {
    href: '/tools/txt-file-maker',
    title: 'TXT File Maker',
    description: 'Online notepad & text file creator with UTF-8, ANSI & CRLF/LF line endings.',
    category: 'Core Editor',
    icon: FileText,
  },
  {
    href: '/tools/batch-generator',
    title: 'Batch TXT Generator',
    description: 'Generate hundreds of customized text files with variables and ZIP export.',
    category: 'Automation',
    icon: Layers,
  },
  {
    href: '/tools/case-converter',
    title: 'Text Case Converter',
    description: 'Transform strings into UPPERCASE, lowercase, Title Case, camelCase & snake_case.',
    category: 'Formatter',
    icon: Type,
  },
  {
    href: '/tools/line-tools',
    title: 'Line Sorter & Deduplicator',
    description: 'Sort lines A-Z, remove duplicate lines, trim whitespace, and add line numbers.',
    category: 'Manipulation',
    icon: ListTree,
  },
  {
    href: '/tools/robots-txt-generator',
    title: 'Robots.txt Builder',
    description: 'Generate RFC-compliant robots.txt directives, Disallow rules, and XML sitemaps.',
    category: 'Webmaster / SEO',
    icon: Bot,
  },
  {
    href: '/tools/markdown-to-txt',
    title: 'Markdown to Plain Text',
    description: 'Strip Markdown formatting, HTML tags, and links into clean plain text.',
    category: 'Converter',
    icon: FileCode,
  },
  {
    href: '/tools/diff-checker',
    title: 'Text Diff Checker',
    description: 'Compare two text files line-by-line to inspect additions, removals, and changes.',
    category: 'Comparison',
    icon: GitCompare,
  },
];

export function RelatedToolsSection({
  title = 'Related Text Processing Tools',
  subtitle = 'Discover more specialized client-side utilities to format, clean, and generate text.',
  excludeHref,
  maxItems = 3,
}: {
  title?: string;
  subtitle?: string;
  excludeHref?: string;
  maxItems?: number;
}) {
  const tools = ALL_TOOLS.filter((t) => t.href !== excludeHref).slice(0, maxItems);

  return (
    <section className="space-y-4 pt-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon || FileText;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  {tool.category && (
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                      {tool.category}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-sm">
                  {tool.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
              </div>
              <div className="pt-3 flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 gap-1 group-hover:translate-x-1 transition-transform">
                Open Tool <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function RelatedTemplatesSection({
  title = 'Featured Plain Text Templates',
  subtitle = 'Jumpstart your documents with production-ready plain text templates.',
  templates,
}: {
  title?: string;
  subtitle?: string;
  templates: { slug: string; title: string; defaultFilename: string; category: string }[];
}) {
  if (!templates || templates.length === 0) return null;

  return (
    <section className="space-y-4 pt-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((tpl) => (
          <Link
            key={tpl.slug}
            href={`/templates/${tpl.slug}`}
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                  {tpl.defaultFilename}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                  {tpl.category}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors text-sm line-clamp-1">
                {tpl.title}
              </h4>
            </div>
            <div className="pt-3 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 gap-1 group-hover:translate-x-1 transition-transform">
              View Template <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RelatedGuidesSection({
  title = 'Recommended Technical Guides',
  subtitle = 'Master plain text architecture, encodings, line terminators, and best practices.',
  articles,
}: {
  title?: string;
  subtitle?: string;
  articles: { slug: string; title: string; category: string; readTime: string }[];
}) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="space-y-4 pt-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((art) => (
          <Link
            key={art.slug}
            href={`/guides/${art.slug}`}
            className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-md dark:bg-slate-900/60 dark:border-slate-800 dark:hover:border-sky-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-wider">
                  {art.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{art.readTime}</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors text-sm line-clamp-2 leading-snug">
                {art.title}
              </h4>
            </div>
            <div className="pt-3 flex items-center text-xs font-semibold text-sky-600 dark:text-sky-400 gap-1 group-hover:translate-x-1 transition-transform">
              Read Guide <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
