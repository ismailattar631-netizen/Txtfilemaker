import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Line Tools & Sorter',
  description:
    'Sort lines alphabetically, remove duplicate lines, trim extra spaces, and add line numbers — free and instant.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/line-tools',
  },
  openGraph: {
    title: 'Line Tools & Sorter',
    description:
      'Sort lines alphabetically, remove duplicate lines, trim extra spaces, and add line numbers — free and instant.',
    url: 'https://txtcraft.site/tools/line-tools',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Line Tools & Sorter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Line Tools & Sorter',
    description:
      'Sort lines, remove duplicates, trim spaces, and number lists — all in your browser.',
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
