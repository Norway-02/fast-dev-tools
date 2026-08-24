'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { TOOLS_LIST, ToolMetadata, getToolBySlug } from '@/lib/constants/tools-list';
import { getRecentTools, getFavorites, toggleFavorite } from '@/lib/utils/storage';
import { Search, Shield, Zap, Lock, ArrowRight, Star, Clock, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Primary Hero Section */}
        <section className="text-center space-y-4 py-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>21 Browser-Based Developer Utilities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 font-mono">
            Fast Developer Tools.
          </h1>

          <p className="text-base sm:text-lg text-slate-400 font-mono font-medium">
            Format, decode, convert, validate and generate — directly in your browser.
          </p>

          {/* Prominent Homepage Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between p-3.5 bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl text-slate-400 shadow-xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm text-slate-300">
                  Search developer tools... <span className="text-slate-500 hidden sm:inline">(JSON, JWT, Base64, Regex, UUID)</span>
                </span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 group-hover:border-slate-700">
                <span>⌘ K</span>
              </div>
            </button>
          </div>

          {/* Fast Privacy Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400 pt-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Shield className="w-4 h-4" />
              <span>100% Client-Side</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Zero Server Transmission</span>
            </span>
          </div>
        </section>

        {/* Favorites Section (If populated) */}
        {favoriteTools.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Favorites</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {favoriteTools.map((t) => (
                <ToolCard key={t.slug} tool={t} isFav={true} onToggleFav={handleToggleFavorite} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Tools Section (If populated) */}
        {recentTools.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Recent Tools</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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

        {/* Popular Tools Fast Navigation Row */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Popular Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

        {/* Categorized Tools Grid */}
        <div className="space-y-8">
          {categories.map((cat) => {
            const tools = TOOLS_LIST.filter((t) => t.category === cat);
            return (
              <section key={cat} className="space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
                  <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">{cat}</h2>
                  <span className="text-xs font-mono text-slate-500">({tools.length})</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

      {/* Global Command Palette */}
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
      className="p-4 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 rounded-xl group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5 flex flex-col justify-between"
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
            {tool.title}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => onToggleFav(e, tool.slug)}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              className="p-1 text-slate-500 hover:text-amber-400 transition-colors"
            >
              <Star className={`w-3.5 h-3.5 ${isFav ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Client-side · Fast</span>
        <span className="text-indigo-400 font-semibold group-hover:underline">Open tool →</span>
      </div>
    </Link>
  );
}
