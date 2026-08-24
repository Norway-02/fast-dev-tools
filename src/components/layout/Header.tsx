'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';
import { TOOLS_LIST } from '@/lib/constants/tools-list';
import { CommandPalette } from './CommandPalette';

export function Header() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = Array.from(new Set(TOOLS_LIST.map((t) => t.category)));

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Positioning */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-all">
              [&gt;_]
            </div>
            <div>
              <div className="font-mono font-bold text-base tracking-tight flex items-center gap-2 text-slate-100 group-hover:text-indigo-400 transition-colors">
                <span>FastDevTools</span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-block">
                  100% client-side
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">No installation. No signup.</p>
            </div>
          </Link>

          {/* Optimized Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
              <span>Tools</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                21
              </span>
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors py-2">
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50">
                {categories.map((cat) => (
                  <div key={cat} className="mb-2 last:mb-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 py-1">
                      {cat}
                    </div>
                    {TOOLS_LIST.filter((t) => t.category === cat).map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className="block px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Quick Search Button triggering Command Palette */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 text-xs font-mono transition-all"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Search tools...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">⌘ K</kbd>
          </button>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
    </>
  );
}
