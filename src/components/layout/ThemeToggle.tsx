'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('txtcraft-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('txtcraft-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle Theme"
        className="p-2 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800/60 border border-slate-700/60"
      >
        <Moon className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="p-2 rounded-lg text-slate-400 hover:text-slate-100 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-colors shadow-sm"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
    </button>
  );
}