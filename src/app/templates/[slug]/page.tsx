import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TEMPLATES, getTemplateBySlug } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';
import { FolderOpen, ArrowLeft, Tag } from 'lucide-react';
import TxtEditor from '@/components/editor/TxtEditor';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import {
  RelatedToolsSection,
  RelatedTemplatesSection,
  RelatedGuidesSection,
} from '@/components/seo/InternalLinks';

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
    alternates: {
      canonical: `https://txtcraft.site/templates/${template.slug}`,
    },
    openGraph: {
      title: `${template.title} - TxtCraft`,
      description: template.description,
      type: 'article',
      url: `https://txtcraft.site/templates/${template.slug}`,
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

  // Find related templates in same category (or other popular ones)
  const relatedTemplates = TEMPLATES.filter((t) => t.slug !== template.slug)
    .sort((a, b) => (a.category === template.category ? -1 : 1))
    .slice(0, 3);

  // Relevant guides
  const relatedGuides = ARTICLES.slice(0, 3);

  const faqs = [
    {
      question: `What is the standard filename and encoding for this template?`,
      answer: `This template is typically saved as ${template.defaultFilename} using ${template.recommendedEncoding} character encoding.`,
    },
    {
      question: 'Can I customize this template before downloading?',
      answer:
        'Yes! You can edit the text directly in the interactive workspace above, change line endings between Windows CRLF and Unix LF, and download your customized version with 1 click.',
    },
    {
      question: 'Are there other tools available to manipulate this file?',
      answer:
        'Yes! You can format strings with our Case Converter, deduplicate items with Line Tools, or generate multiple copies using the Batch TXT Generator.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-colors">
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://txtcraft.site' },
          { name: 'Templates', url: 'https://txtcraft.site/templates' },
          { name: template.title, url: `https://txtcraft.site/templates/${template.slug}` },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/templates" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
          Templates
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-xs">{template.title}</span>
      </div>

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
        <span className="text-xs text-slate-500 font-semibold uppercase flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" /> Tags:
        </span>
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Internal Linking: Related Tools */}
      <RelatedToolsSection
        title="Recommended Tools for this Template"
        subtitle="Process, format, or batch-generate files based on this template."
        maxItems={3}
      />

      {/* Internal Linking: Related Templates */}
      <RelatedTemplatesSection
        title="More Popular Plain Text Templates"
        subtitle="Explore more ready-to-use developer and productivity documents."
        templates={relatedTemplates}
      />

      {/* Internal Linking: Related Technical Guides */}
      <RelatedGuidesSection
        title="Related Technical Documentation & Guides"
        subtitle="Learn how to optimize, encode, and standardize plain text workflows."
        articles={relatedGuides}
      />

      <FaqSection faqs={faqs} />
    </div>
  );
}