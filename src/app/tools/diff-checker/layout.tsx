import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plain Text Diff & Comparison Tool | TxtCraft',
  description:
    'Compare two plain text documents line-by-line to detect changes, additions, and deletions.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/diff-checker',
  },
};

export default function DiffCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
