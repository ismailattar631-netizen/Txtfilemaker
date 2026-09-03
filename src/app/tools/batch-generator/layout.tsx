import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Batch Plain Text (.txt) File Generator | TxtCraft',
  description:
    'Instantly generate hundreds of custom text files from templates with dynamic variable tokens and download as a ZIP archive.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/batch-generator',
  },
};

export default function BatchGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
