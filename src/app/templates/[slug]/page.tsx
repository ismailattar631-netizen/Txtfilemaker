import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TEMPLATES, getTemplateBySlug } from '@/lib/templates-data';
import { FolderOpen, ArrowLeft } from 'lucide-react';
import TxtEditor from '@/components/editor/TxtEditor';
import FaqSection from '@/components/seo/FaqSection';

export async function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const template = getTemplateBySlug(params.slug);
  if (!template) return { title: 'Template Not Found' };

  return {
    title: `${template.title} - Free Plain Text Template Download`,
    description: template.description,
    keywords: [...template.tags, 'plain text template', 'txt maker', template.defaultFilename],
    openGraph: {
      title: `${template.title} - TxtCraft`,
      description: template.description,
      type: 'article',
    },
  };
}

export default function TemplateDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const template = getTemplateBySlug(params.slug);
  if (!template) notFound();

  const faqs = [
    {
      question: `What is the standard filename for this template?`,
      answer: `This template is typically saved as ${template.defaultFilename} using ${template.recommendedEncoding} character encoding.`,
    },
    {
      question: 'Can I customize this template before downloading?',
      answer: 'Yes! You can edit the text directly in the interactive workspace above, change line endings between Windows CRLF and Unix LF, and download your customized version with 1 click.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 transition-colors">
      {/* Breadcrumb */}
      <Link
        href="/templates"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Templates Library
      </Link>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-semibold">
          <FolderOpen className="w-3.5 h-3.5" />
          Template / {template.category.toUpperCase()}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          {template.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl">
          {template.description}
        </p>
      </div>

      {/* Editor with Template loaded */}
      <div className="pt-2">
        <TxtEditor
          initialText={template.content}
          initialFilename={template.defaultFilename}
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs text-slate-500 font-semibold uppercase">Tags:</span>
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
          >
            #{tag}
          </span>
        ))}
      </div>

      <FaqSection faqs={faqs} />
    </div>
  );
}