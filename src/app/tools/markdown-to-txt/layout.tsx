import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown & HTML to Plain Text (.txt) Converter | TxtCraft',
  description:
    'Instantly convert Markdown syntax, HTML tags, and formatted copy into crisp, clean plain text.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/markdown-to-txt',
  },
  openGraph: {
    title: 'Markdown & HTML to Plain Text (.txt) Converter | TxtCraft',
    description:
      'Instantly convert Markdown syntax, HTML tags, and formatted copy into crisp, clean plain text.',
    url: 'https://txtcraft.site/tools/markdown-to-txt',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Markdown to Plain Text Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown & HTML to Plain Text (.txt) Converter | TxtCraft',
    description:
      'Strip Markdown and HTML formatting down to pure, clean plain text instantly.',
    images: ['/og-image.png'],
  },
};

export default function MarkdownToTxtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
