'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import { TOOLS_LIST } from '@/lib/constants/tools-list';
import { CommandPalette } from './CommandPalette';

export function Header() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = Array.from(new Set(TOOLS_LIST.map((t) => t.category)));

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#06080D]/90 backdrop-blur-[18px] border-b border-[#1E293B] shadow-xl'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo with Blinking Cursor */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#0C111B] border border-[#1E293B] group-hover:border-[#34D399]/50 flex items-center justify-center text-[#34D399] font-mono font-bold text-xs transition-all shadow-sm">
              <span>&gt;</span>
              <span className="animate-cursor-blink text-sky-400">_</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-base tracking-tight text-slate-100 group-hover:text-[#34D399] transition-colors">
                FastDevTools
              </span>
              <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#34D399] border border-emerald-500/20 hidden sm:inline-block">
                100% client-side
              </span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation (>= 768px) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300 font-mono">
            <Link href="/" className="flex items-center gap-1.5 hover:text-[#34D399] transition-colors py-2">
              <span>Tools</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#111927] text-[#34D399] border border-[#1E293B]">
                21
              </span>
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#34D399] transition-colors py-2">
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#34D399] transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-[#0C111B] border border-[#1E293B] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {categories.map((cat) => (
                  <div key={cat} className="mb-2 last:mb-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 font-semibold">
                      {cat}
                    </div>
                    {TOOLS_LIST.filter((t) => t.category === cat).map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        className="block px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#111927] rounded-lg transition-colors"
                      >
                        {tool.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action Bar: Search + Mobile Drawer Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-2.5 px-3 py-2 sm:py-1.5 bg-[#0C111B] hover:bg-[#111927] border border-[#1E293B] hover:border-[#334155] rounded-xl text-slate-400 text-xs font-mono transition-all shadow-sm group min-h-[44px] sm:min-h-0"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#34D399] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-[#111927] text-slate-300 rounded text-[10px] border border-[#1E293B]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Hamburger Drawer Trigger (< 768px) */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-11 h-11 bg-[#0C111B] border border-[#1E293B] rounded-xl text-slate-300 hover:text-white hover:border-[#34D399]/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#FB7185]" /> : <Menu className="w-5 h-5 text-[#34D399]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay (< 768px) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#06080D]/85 backdrop-blur-md md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#0C111B] border-l border-[#1E293B] p-6 shadow-2xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 font-mono font-bold text-base text-slate-100">
                  <span className="text-[#34D399]">&gt;_</span> FastDevTools
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#111927]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Quick Search Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCommandPaletteOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 bg-[#111927] border border-[#1E293B] rounded-xl text-xs font-mono text-slate-300"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#34D399]" />
                  <span>Search tools...</span>
                </span>
                <kbd className="px-1.5 py-0.5 bg-[#06080D] rounded text-[10px] text-slate-400 border border-[#1E293B]">⌘K</kbd>
              </button>

              {/* Categorized Menu Links */}
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat} className="space-y-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-2">
                      {cat}
                    </div>
                    {TOOLS_LIST.filter((t) => t.category === cat).map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${tool.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-[#111927] transition-colors"
                      >
                        <span>{tool.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#1E293B] text-[11px] font-mono text-slate-500">
              <p>100% Client-Side Processing</p>
              <p className="text-emerald-400 font-semibold mt-1">Zero Data Transmitted</p>
            </div>
          </div>
        </div>
      )}

      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
    </>
  );
}
