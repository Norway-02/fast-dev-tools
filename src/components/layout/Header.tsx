'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, Search, ChevronDown } from 'lucide-react';
import { TOOLS_LIST } from '@/lib/constants/tools-list';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(TOOLS_LIST.map((t) => t.category)));

  const filteredTools = searchQuery.trim()
    ? TOOLS_LIST.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Positioning */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono font-bold text-base tracking-tight flex items-center gap-1.5 text-slate-100 group-hover:text-indigo-400 transition-colors">
              <span>FastDevTools</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Client-Side
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">No installation. No signup.</p>
          </div>
        </Link>

        {/* Search & Tool Categories Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            All 21 Tools
          </Link>

          <div className="relative group">
            <button
              onClick={() => setActiveCategory(activeCategory ? null : 'JSON')}
              className="flex items-center gap-1 hover:text-indigo-400 transition-colors py-2"
            >
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

        {/* Quick Search Input */}
        <div className="relative w-48 sm:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools (e.g. JSON, JWT, Base64)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
          </div>

          {/* Search Results Overlay */}
          {isSearchOpen && filteredTools.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 max-h-80 overflow-y-auto z-50">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="block p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="text-xs font-semibold text-slate-200">{tool.title}</div>
                  <div className="text-[11px] text-slate-400 truncate">{tool.shortDescription}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
