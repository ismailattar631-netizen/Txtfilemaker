import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Line Tools & Sorter Studio | TxtCraft',
  description:
    'Sort lines alphabetically, eliminate duplicate records, trim whitespace, add prefixes, and number lists with zero latency.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/line-tools',
  },
  openGraph: {
    title: 'Line Tools & Sorter Studio | TxtCraft',
    description:
      'Sort lines alphabetically, eliminate duplicate records, trim whitespace, add prefixes, and number lists with zero latency.',
    url: 'https://txtcraft.site/tools/line-tools',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Line Tools & Sorter Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Line Tools & Sorter Studio | TxtCraft',
    description:
      'Sort lines, deduplicate lists, and clean up line endings directly in your browser.',
    images: ['/og-image.png'],
  },
};

export default function LineToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
