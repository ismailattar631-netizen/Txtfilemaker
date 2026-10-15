import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TEMPLATES, getTemplateBySlug } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';
import { FolderOpen, ArrowLeft, Tag } from 'lucide-react';
import TxtEditor from '@/components/editor/TxtEditor';
import FaqSection from '@/components/seo/FaqSection';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import {
  RelatedToolsSection,
  RelatedTemplatesSection,
  RelatedGuidesSection,
} from '@/components/seo/InternalLinks';

const TEMPLATE_GUIDANCE: Record<string, { purpose: string; customize: string; check: string }> = {
  'mit-license': {
    purpose: 'The MIT License permits broad reuse of software subject to keeping its copyright and permission notice. It is not the same as placing work in the public domain.',
    customize: 'Keep the standard license terms intact and insert the correct copyright year and rights holder in the notice.',
    check: 'Review third-party dependencies and assets separately. This template is informational and not legal advice.',
  },
  'changelog-standard': {
    purpose: 'A changelog helps users understand what changed between software releases. Group changes by version and describe their impact in plain language.',
    customize: 'Record release dates, meaningful additions, fixes, breaking changes and migration steps where needed.',
    check: 'Verify each version number and do not claim a bug is fixed until the fix has been tested.',
  },
  'meeting-notes': {
    purpose: 'Meeting notes capture decisions, owners and follow-up actions in a format that remains easy to search and share.',
    customize: 'Record the meeting date, attendees, agenda, decisions and clear action items with owners and deadlines.',
    check: 'Confirm decisions with participants before distributing notes, and remove sensitive information when sharing broadly.',
  },
  'ascii-art-borders': {
    purpose: 'Text borders help separate sections in terminal output, README files and logs without relying on rich formatting.',
    customize: 'Choose plain ASCII characters for maximum compatibility or Unicode box-drawing characters for a more polished appearance.',
    check: 'Unicode borders can render differently across fonts and terminals. Preview the final text in the destination environment.',
  },
  'csv-plain-table': {
    purpose: 'A monospace text table makes small data summaries easier to read in logs, terminals and plain-text reports.',
    customize: 'Update column widths and align values consistently. Prefer real CSV or TSV files when another program needs to parse the data.',
    check: 'Alignment may break with proportional fonts or wide Unicode characters. Verify totals and calculations independently.',
  },
  'readme-txt': {
    purpose: 'A README.txt introduces a project to people who receive the source code or downloaded files. Put the project name, purpose, prerequisites and basic setup steps near the top.',
    customize: 'Replace example commands with commands you have actually tested. Include the supported operating systems, a contact or issue-reporting path, and the location of any required configuration.',
    check: 'Before publishing, verify that installation commands work in a clean environment and that filenames, links and version numbers match the current release.',
  },
  'humans-txt': {
    purpose: 'A humans.txt file is a voluntary convention for crediting the people and technologies behind a website. It is informational, not a search-engine ranking signal.',
    customize: 'Include only names, roles, locations or contact details that contributors have agreed to publish. Keep credits current when the team changes.',
    check: 'Do not put private email addresses or sensitive infrastructure details in a publicly accessible humans.txt file.',
  },
  'gitignore-standard': {
    purpose: 'A .gitignore file tells Git which untracked files to ignore. It is useful for dependencies, build outputs and local secrets, but it does not remove files already committed to the repository.',
    customize: 'Keep patterns that match your actual technology stack. For example, a Node.js project may need node_modules/ and .next/, while a Python project may need __pycache__/ and .venv/.',
    check: 'Review rules before copying them: broad patterns can hide important source files. If a secret was already committed, removing it from tracking does not revoke the exposed credential.',
  },
  'apache-license': {
    purpose: 'The Apache License 2.0 is a permissive software license with conditions for notices, attribution and certain patent rights. The standard license text should not be casually rewritten.',
    customize: 'Use the official Apache License 2.0 text and follow its appendix instructions for applying the license to your project. Include the correct copyright owner and year where applicable.',
    check: 'Check whether dependencies or third-party assets have separate license obligations. This template is informational and is not legal advice.',
  },
  'robots-txt-standard': {
    purpose: 'A robots.txt file communicates crawler access rules at the root of a website. It does not protect confidential files and does not guarantee that a URL will be excluded from search results.',
    customize: 'Replace example domains and paths with your real site structure. Add an absolute Sitemap URL if you publish an XML sitemap.',
    check: 'Avoid a sitewide Disallow: / unless you deliberately want to restrict crawling. Test the deployed file and confirm that important pages remain accessible.',
  },
  'security-txt': {
    purpose: 'A security.txt file provides a clear channel for reporting security vulnerabilities. It is most useful when the contact address is actively monitored.',
    customize: 'Set a working security contact and a realistic expiration date. Follow the relevant security.txt format when publishing it under /.well-known/security.txt.',
    check: 'Do not promise response times or disclosure procedures your organization cannot meet. Verify that the contact method actually works.',
  },
  'todo-txt-format': {
    purpose: 'A plain-text task list is easy to edit and share across systems without proprietary software.',
    customize: 'Use a consistent task format and include deadlines or priorities only when they are meaningful for your workflow.',
    check: 'Avoid mixing confidential personal data into a task list that will be shared publicly.',
  },
};

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

      {/* Template-specific guidance for visitors and search engines */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/70 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">How to use this {template.defaultFilename} template</h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{TEMPLATE_GUIDANCE[template.slug]?.purpose ?? `Use this ${template.title.toLowerCase()} as a starting point. Review its sample content and adapt each section to your own project before downloading.`}</p>
        <h3 className="font-semibold text-slate-900 dark:text-white">What to customize</h3>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{TEMPLATE_GUIDANCE[template.slug]?.customize ?? `Update the example names, paths and values for your intended use. Save the result as ${template.defaultFilename} using ${template.recommendedEncoding} when compatible with your target system.`}</p>
        <h3 className="font-semibold text-slate-900 dark:text-white">Before you publish</h3>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{TEMPLATE_GUIDANCE[template.slug]?.check ?? 'Inspect the final file for placeholder content, sensitive information and formatting issues. Test it in the application or environment where you plan to use it.'}</p>
      </section>

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