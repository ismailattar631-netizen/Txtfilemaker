import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plain Text (.txt) Templates Library | TxtCraft',
  description:
    'Browse, preview, and download structured plain text templates for documentation, open-source licenses, robots.txt, changelogs, meeting notes, and ASCII data tables.',
  alternates: {
    canonical: 'https://txtcraft.site/templates',
  },
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
