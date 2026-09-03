import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plain Text Diff & Comparison Tool | TxtCraft',
  description:
    'Compare two plain text documents line-by-line to detect changes, additions, and deletions.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/diff-checker',
  },
  openGraph: {
    title: 'Plain Text Diff & Comparison Tool | TxtCraft',
    description:
      'Compare two plain text documents line-by-line to detect changes, additions, and deletions.',
    url: 'https://txtcraft.site/tools/diff-checker',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Plain Text Diff & Comparison Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plain Text Diff & Comparison Tool | TxtCraft',
    description:
      'Compare two text documents side-by-side to highlight additions and deletions.',
    images: ['/og-image.png'],
  },
};

export default function DiffCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
