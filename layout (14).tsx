import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Batch Plain Text (.txt) File Generator | TxtCraft',
  description:
    'Instantly generate hundreds of custom text files from templates with dynamic variable tokens and download as a ZIP archive.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/batch-generator',
  },
  openGraph: {
    title: 'Batch Plain Text (.txt) File Generator | TxtCraft',
    description:
      'Instantly generate hundreds of custom text files from templates with dynamic variable tokens and download as a ZIP archive.',
    url: 'https://txtcraft.site/tools/batch-generator',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Batch Plain Text File Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batch Plain Text (.txt) File Generator | TxtCraft',
    description:
      'Generate hundreds of text files at once from templates and download as a ZIP.',
    images: ['/og-image.png'],
  },
};

export default function BatchGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
