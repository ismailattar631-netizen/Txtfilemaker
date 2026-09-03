import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown & HTML to Plain Text (.txt) Converter | TxtCraft',
  description:
    'Instantly convert Markdown syntax, HTML tags, and formatted copy into crisp, clean plain text.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/markdown-to-txt',
  },
};

export default function MarkdownToTxtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
