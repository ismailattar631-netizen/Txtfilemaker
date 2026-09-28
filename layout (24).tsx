import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Robots.txt File Generator | TxtCraft',
  description:
    'Construct an optimized, RFC-compliant robots.txt file to control search engine indexing, protect administrative directories, and declare XML sitemaps.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/robots-txt-generator',
  },
  openGraph: {
    title: 'Robots.txt File Generator | TxtCraft',
    description:
      'Construct an optimized, RFC-compliant robots.txt file to control search engine indexing, protect administrative directories, and declare XML sitemaps.',
    url: 'https://txtcraft.site/tools/robots-txt-generator',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Robots.txt File Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robots.txt File Generator | TxtCraft',
    description:
      'Generate RFC-compliant robots.txt files with crawler directives and sitemap declarations.',
    images: ['/og-image.png'],
  },
};

export default function RobotsTxtGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
