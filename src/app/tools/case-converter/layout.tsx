import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Text Case Converter | TxtCraft',
  description:
    'Instantly convert any text between Title Case, UPPERCASE, lowercase, camelCase, snake_case, kebab-case, and Sentence case.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/case-converter',
  },
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
