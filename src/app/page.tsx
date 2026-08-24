'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { DataFlowMotif } from '@/components/layout/DataFlowMotif';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { TOOLS_LIST, ToolMetadata, getToolBySlug } from '@/lib/constants/tools-list';
import { getRecentTools, getFavorites, toggleFavorite } from '@/lib/utils/storage';
import { Search, ArrowRight, Star, Clock, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setRecentSlugs(getRecentTools());
      setFavoriteSlugs(getFavorites());
    }, 0);
    return () => clearTimeout(handle);
  }, []);

  const handleToggleFavorite = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(slug);
    setFavoriteSlugs(getFavorites());
  };

  const categories = ['JSON', 'Encoding', 'Identifiers & Time', 'Security & Web', 'Developer Utilities'] as const;
  const popularTools = TOOLS_LIST.filter((t) => t.isPopular);
  const recentTools = recentSlugs.map((s) => getToolBySlug(s)).filter((t): t is ToolMetadata => t !== undefined);
  const favoriteTools = favoriteSlugs.map((s) => getToolBySlug(s)).filter((t): t is ToolMetadata => t !== undefined);

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative selection:bg-[#34D399] selection:text-[#04110A]">
      <AmbientBackground />

      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 relative z-10">
        {/* Homepage Hero Section */}
        <section className="text-center space-y-6 pt-4 pb-2 max-w-4xl mx-auto">
          {/* Data-Flow Signature Motif */}
          <div className="flex justify-center">
            <DataFlowMotif />
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-mono leading-none">
            <span className="animate-shimmer-text">Fast developer tools.</span>
            <br />
            <span className="text-slate-100">Built for speed.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-mono max-w-2xl mx-auto leading-relaxed">
            Format, validate, decode, convert and generate — directly in your browser.
          </p>

          {/* Search Bar - 64px Desktop / 54px Mobile */}
          <div className="pt-2 max-w-2xl mx-auto">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="w-full h-[54px] sm:h-[64px] px-5 bg-[#0C111B] hover:bg-[#111927] border border-[#1E293B] hover:border-[#34D399]/60 focus:border-[#34D399] rounded-2xl flex items-center justify-between text-slate-400 shadow-2xl transition-all duration-200 group"
            >
              <div className="flex items-center gap-3.5">
                <Search className="w-5 h-5 text-[#34D399] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm sm:text-base text-slate-300">
                  Search developer tools... <span className="text-slate-500 hidden sm:inline">(JSON, JWT, Base64, Regex)</span>
                </span>
              </div>
              <kbd className="px-3 py-1 bg-[#111927] text-slate-300 rounded-lg border border-[#1E293B] text-xs font-mono group-hover:border-[#34D399]/40">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span>Client-side</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              <span>No signup</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              <span>No installation</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span>Fast</span>
            </span>
          </div>
        </section>

        {/* Favorites Section */}
        {favoriteTools.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Favorites</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteTools.map((t) => (
                <ToolCard key={t.slug} tool={t} isFav={true} onToggleFav={handleToggleFavorite} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Tools Section */}
        {recentTools.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3">
              <Clock className="w-4 h-4 text-[#38BDF8]" />
              <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Recently Used</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTools.map((t) => (
                <ToolCard
                  key={t.slug}
                  tool={t}
                  isFav={favoriteSlugs.includes(t.slug)}
                  onToggleFav={handleToggleFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {/* Popular Tools Section (Section 13) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3">
            <Sparkles className="w-4 h-4 text-[#34D399]" />
            <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Popular Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTools.map((t) => (
              <ToolCard
                key={t.slug}
                tool={t}
                isFav={favoriteSlugs.includes(t.slug)}
                onToggleFav={handleToggleFavorite}
              />
            ))}
          </div>
        </section>

        {/* Categorized Tools Section (Section 16 & 17) */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const tools = TOOLS_LIST.filter((t) => t.category === cat);
            return (
              <section key={cat} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#1E293B] pb-3">
                  <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                  <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">{cat}</h2>
                  <span className="text-xs font-mono text-slate-500">({tools.length})</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((t) => (
                    <ToolCard
                      key={t.slug}
                      tool={t}
                      isFav={favoriteSlugs.includes(t.slug)}
                      onToggleFav={handleToggleFavorite}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />

      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
    </div>
  );
}

function ToolCard({
  tool,
  isFav,
  onToggleFav,
}: {
  tool: ToolMetadata;
  isFav: boolean;
  onToggleFav: (e: React.MouseEvent, slug: string) => void;
}) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="p-5 bg-[#0C111B] border border-[#1E293B] hover:border-[#334155] hover:bg-[#111927] rounded-xl group transition-all duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] shadow-lg flex flex-col justify-between"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono font-bold text-base text-slate-100 group-hover:text-[#34D399] transition-colors">
            {tool.title}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => onToggleFav(e, tool.slug)}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
            >
              <Star className={`w-4 h-4 transition-transform ${isFav ? 'text-amber-400 fill-amber-400 scale-110' : ''}`} />
            </button>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#34D399] group-hover:translate-x-1 transition-all duration-180" />
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1E293B]/60 flex items-center justify-between text-xs font-mono text-slate-500">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
          <span>Client-side · Fast</span>
        </span>
        <span className="text-[#34D399] font-semibold group-hover:underline">Open →</span>
      </div>
    </Link>
  );
}
