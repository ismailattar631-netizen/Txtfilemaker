import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Line Tools & Sorter Studio | TxtCraft',
  description:
    'Sort lines alphabetically, eliminate duplicate records, trim whitespace, add prefixes, and number lists with zero latency.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/line-tools',
  },
};

export default function LineToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
