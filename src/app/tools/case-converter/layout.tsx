import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Text Case Converter | TxtCraft',
  description:
    'Instantly convert any text between Title Case, UPPERCASE, lowercase, camelCase, snake_case, kebab-case, and Sentence case.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/case-converter',
  },
  openGraph: {
    title: 'Online Text Case Converter | TxtCraft',
    description:
      'Instantly convert any text between Title Case, UPPERCASE, lowercase, camelCase, snake_case, kebab-case, and Sentence case.',
    url: 'https://txtcraft.site/tools/case-converter',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Online Text Case Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Text Case Converter | TxtCraft',
    description:
      'Instantly convert text between UPPERCASE, lowercase, camelCase, snake_case, and Title Case.',
    images: ['/og-image.png'],
  },
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
