import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Robots.txt File Generator | TxtCraft',
  description:
    'Construct an optimized, RFC-compliant robots.txt file to control search engine indexing, protect administrative directories, and declare XML sitemaps.',
  alternates: {
    canonical: 'https://txtcraft.site/tools/robots-txt-generator',
  },
};

export default function RobotsTxtGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
