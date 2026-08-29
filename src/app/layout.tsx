import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { GoogleAnalytics } from '@next/third-parties/google';
import Footer from '@/components/layout/Footer';
import { WebAppJsonLd, HowToJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://txtcraft.site'),
  title: {
    default: 'TXT File Maker - Create & Download Text Files Online | TxtCraft',
    template: '%s | TxtCraft',
  },
  description:
    'Free online TXT file maker & notepad. Create, edit, format, and download plain text (.txt) files in your browser. Supports UTF-8, ANSI, and CRLF/LF line endings.',
  keywords: [
    'txt file maker',
    'create text file online',
    'online notepad',
    'text to file',
    'download txt file',
    'plain text editor online',
    'browser notepad',
    'generate txt file',
    'text to file maker',
    'convert text to txt',
    'utf-8 text creator',
    'crlf to lf converter',
    'batch txt generator',
    'free online text editor',
    'save text as txt',
  ],
  authors: [{ name: 'TxtCraft Team' }],
  creator: 'TxtCraft',
  publisher: 'TxtCraft',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'TXT File Maker - Create & Download Text Files Online',
    description:
      'Write, edit, and download plain text (.txt) files instantly in your browser. 100% client-side privacy, multi-encoding support, and line-ending controls.',
    url: 'https://txtcraft.site',
    siteName: 'TxtCraft',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TXT File Maker - Create & Download Text Files Online',
    description: 'Fast, secure online notepad and text to file creator with instant .txt download.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem('txtcraft-theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = saved ? saved === 'dark' : (saved === null ? true : false);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-teal-500/30 selection:text-teal-900 dark:selection:text-teal-200 transition-colors duration-200">
        <WebAppJsonLd />
        <HowToJsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-44KQ7ELTG7" />
      </body>
    </html>
  );
}