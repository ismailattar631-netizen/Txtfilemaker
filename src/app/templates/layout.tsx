import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plain Text (.txt) Templates Library | TxtCraft',
  description:
    'Browse, preview, and download structured plain text templates for documentation, open-source licenses, robots.txt, changelogs, meeting notes, and ASCII data tables.',
  alternates: {
    canonical: 'https://txtcraft.site/templates',
  },
  openGraph: {
    title: 'Plain Text (.txt) Templates Library | TxtCraft',
    description:
      'Browse, preview, and download structured plain text templates for documentation, open-source licenses, robots.txt, changelogs, meeting notes, and ASCII data tables.',
    url: 'https://txtcraft.site/templates',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Plain Text Templates Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plain Text (.txt) Templates Library | TxtCraft',
    description:
      'Free plain text templates for developers, webmasters, and writers.',
    images: ['/og-image.png'],
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
