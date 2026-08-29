import Link from 'next/link';
import { FileText, ShieldCheck, Terminal, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-900">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <FileText className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-slate-100 tracking-tight">
                TxtCraft <span className="text-teal-600 dark:text-teal-400 font-mono text-sm">PRO</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              The high-performance, browser-native plain text file maker and manipulation studio.
              Generate, convert, format, and batch-produce .txt files with multi-encoding and line-ending support.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-500" />
              100% Client-Side Privacy Available • Zero Data Tracking
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Text Utilities
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Interactive TXT Studio
                </Link>
              </li>
              <li>
                <Link href="/tools/txt-file-maker" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium">
                  TXT File Maker
                </Link>
              </li>
              <li>
                <Link href="/tools/batch-generator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Batch TXT Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/case-converter" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Text Case Converter
                </Link>
              </li>
              <li>
                <Link href="/tools/line-tools" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Line Sorter & Deduplicator
                </Link>
              </li>
              <li>
                <Link href="/tools/robots-txt-generator" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Robots.txt Builder
                </Link>
              </li>
              <li>
                <Link href="/tools/diff-checker" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Text Diff Comparator
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Templates */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Text Templates
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates/readme-txt" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  README.txt Standard
                </Link>
              </li>
              <li>
                <Link href="/templates/robots-txt-standard" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Webmaster robots.txt
                </Link>
              </li>
              <li>
                <Link href="/templates/security-txt" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  RFC 9116 security.txt
                </Link>
              </li>
              <li>
                <Link href="/templates/mit-license" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  MIT License.txt
                </Link>
              </li>
              <li>
                <Link href="/templates/changelog-standard" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  CHANGELOG.txt
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 text-xs">
                  View All Templates &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Trust */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Resources & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Technical Guides Hub
                </Link>
              </li>
              <li>
                <Link href="/guides/crlf-vs-lf-line-endings" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  CRLF vs LF Explained
                </Link>
              </li>
              <li>
                <Link href="/guides/character-encodings-utf8-utf16-ascii" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Encodings & Mojibake
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  About TxtCraft
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-600 dark:text-teal-500" />
            <span>&copy; {new Date().getFullYear()} TxtCraft Pro. High-performance plain text tools.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built for speed & precision <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}