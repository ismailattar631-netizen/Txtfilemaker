import { MetadataRoute } from 'next';
import { TEMPLATES } from '@/lib/templates-data';
import { ARTICLES } from '@/lib/articles-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://txtcraft.pro';

  const staticPages = [
    '',
    '/tools/batch-generator',
    '/tools/case-converter',
    '/tools/line-tools',
    '/tools/robots-txt-generator',
    '/tools/markdown-to-txt',
    '/tools/diff-checker',
    '/templates',
    '/guides',
    '/about',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const templatePages = TEMPLATES.map((template) => ({
    url: `${baseUrl}/templates/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const guidePages = ARTICLES.map((article) => ({
    url: `${baseUrl}/guides/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...templatePages, ...guidePages];
}