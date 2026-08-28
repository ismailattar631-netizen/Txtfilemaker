import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from '@/components/layout/Footer';
import { WebAppJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://txtcraft.pro'),
  title: {
    default: 'TxtCraft Pro - Professional Plain Text (.txt) File Maker & Studio',
    template: '%s | TxtCraft Pro',
  },
  description:
    'Free online plain text file maker, editor, batch generator, and converter. Support for UTF-8, UTF-16, ANSI encodings, CRLF/LF line endings, line deduplication, case conversions, and rich templates.',
  keywords: [
    'txt file maker',
    'online text editor',
    'batch txt generator',
    'create text file online',
    'crlf to lf converter',
    'utf-8 text creator',
    'robots txt generator',
    'plain text templates',
    'remove duplicate lines online',
  ],
  authors: [{ name: 'TxtCraft Pro Team' }],
  creator: 'TxtCraft Pro',
  publisher: 'TxtCraft Pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'TxtCraft Pro - Professional Plain Text File Maker & Studio',
    description:
      'Create, edit, format, and batch-generate plain text (.txt) files in your browser with multi-encoding and line-ending controls.',
    url: 'https://txtcraft.pro',
    siteName: 'TxtCraft Pro',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TxtCraft Pro - Plain Text Studio',
    description: 'Fast, secure online text file maker with batch generation and encoding tools.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-teal-500/30 selection:text-teal-200">
        <WebAppJsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
<GoogleAnalytics gaId="G-44KQ7ELTG7" />
      </body>
    </html>
  );
}