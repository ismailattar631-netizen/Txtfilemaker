import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { WebAppJsonLd } from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://txtcraft.site'),
  title: {
    default: 'TxtCraft - Free Online Text Tools Studio & Browser Notepad',
    template: '%s | TxtCraft',
  },
  description:
    'Free online TXT file maker, notepad, and plain text tools suite. Create, format, convert, and download .txt files with UTF-8, ANSI, and CRLF/LF support.',

  authors: [{ name: 'TxtCraft Team' }],
  creator: 'TxtCraft',
  publisher: 'TxtCraft',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://txtcraft.site',
  },
  openGraph: {
    title: 'TxtCraft - Free Online Text Tools Studio & Browser Notepad',
    description:
      'Free online TXT file maker, notepad, and plain text tools suite. Create, format, convert, and download .txt files with UTF-8, ANSI, and CRLF/LF support.',
    url: 'https://txtcraft.site',
    siteName: 'TxtCraft',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TxtCraft - Free Online TXT File Maker & Notepad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TxtCraft - Free Online Text Tools Studio & Browser Notepad',
    description:
      'Free online TXT file maker, notepad, and plain text tools suite. Create, format, convert, and download .txt files with instant browser downloads.',
    images: ['/og-image.png'],
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
  other: {
    'google-adsense-account': 'ca-pub-4832541917740546',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          id="gtag-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-44KQ7ELTG7"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-44KQ7ELTG7');`}
        </Script>
        <Script
          id="adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4832541917740546"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}