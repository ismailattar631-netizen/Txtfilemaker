'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Layers,
  Type,
  ListTree,
  Bot,
  FileCode,
  GitCompare,
  BookOpen,
  FolderOpen,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toolLinks = [
    { href: '/tools/txt-file-maker', label: 'TXT File Maker', desc: 'Create, edit & download .txt files online', icon: FileText },
    { href: '/tools/batch-generator', label: 'Batch TXT Generator', desc: 'Bulk generate multiple text files & zip', icon: Layers },
    { href: '/tools/case-converter', label: 'Case Converter', desc: 'UPPER, lower, Title, camelCase, snake_case', icon: Type },
    { href: '/tools/line-tools', label: 'Line Tools & Sorter', desc: 'Sort A-Z, deduplicate, prefix/suffix, number', icon: ListTree },
    { href: '/tools/robots-txt-generator', label: 'Robots.txt Builder', desc: 'Generate robots.txt & security.txt', icon: Bot },
    { href: '/tools/markdown-to-txt', label: 'Markdown to TXT', desc: 'Strip markdown & HTML to clean text', icon: FileCode },
    { href: '/tools/diff-checker', label: 'Text Diff Checker', desc: 'Compare two text files line-by-line', icon: GitCompare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 dark:border-slate-800/80 dark:bg-slate-950/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center gap-1.5">
                TxtCraft <span className="text-xs px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-mono">PRO</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block -mt-1">Online Text Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === '/'
                  ? 'text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-900/60'
              }`}
            >
              Text Studio
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname.startsWith('/tools')
                    ? 'text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-900/60'
                }`}
              >
                Tools
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-0 mt-1 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 dark:bg-slate-900 dark:border-slate-800">
                  <div className="grid gap-1">
                    {toolLinks.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setToolsDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-slate-100 text-teal-600 dark:bg-slate-800 dark:text-teal-400 group-hover:bg-teal-500/10 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {tool.label}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{tool.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/templates"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/templates')
                  ? 'text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-900/60'
              }`}
            >
              <FolderOpen className="w-4 h-4 opacity-70" />
              Templates
            </Link>

            <Link
              href="/guides"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname.startsWith('/guides')
                  ? 'text-teal-600 bg-teal-50 dark:text-teal-400 dark:bg-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-900/60'
              }`}
            >
              <BookOpen className="w-4 h-4 opacity-70" />
              Guides & Docs
            </Link>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/tools/batch-generator"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-semibold text-xs shadow-md shadow-teal-500/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Batch Creator
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 dark:text-slate-400 dark:hover:text-slate-100 dark:bg-slate-900 dark:border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 p-4 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Text Studio (Editor)
          </Link>
          <div className="border-t border-slate-100 dark:border-slate-900 pt-2">
            <div className="px-3 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Specialized Tools
            </div>
            {toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-teal-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-slate-900"
              >
                <tool.icon className="w-4 h-4 text-teal-500" />
                {tool.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-100 dark:border-slate-900 pt-2 space-y-1">
            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <FolderOpen className="w-4 h-4 text-teal-500" />
              Templates Library
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <BookOpen className="w-4 h-4 text-teal-500" />
              Technical Guides
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}