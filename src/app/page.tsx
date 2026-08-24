import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TOOLS_LIST } from '@/lib/constants/tools-list';
import { Shield, Zap, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fast Developer Micro-Tools — No Installation. No Signup.',
  description: 'Fast, secure, 100% browser-based developer utility platform. JSON formatters, JWT decoders, Base64 converters, UUID generators, regex testers, and more.',
  keywords: ['developer tools', 'json formatter', 'jwt decoder', 'uuid generator', 'base64 encoder', 'unix timestamp', 'regex tester'],
};

export default function HomePage() {
  const categories = ['JSON', 'Encoding', 'Identifiers & Time', 'Security & Web', 'Developer Utilities'] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Technical Minimal Hero */}
        <section className="text-center space-y-4 py-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>21 Browser-Based Micro-Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 font-mono">
            Fast Developer Tools.
          </h1>

          <p className="text-lg text-slate-400 font-mono font-medium">
            No installation. No signup.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>100% In-Browser Execution</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Zero Server Transmission</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Instant Local Processing</span>
            </span>
          </div>
        </section>

        {/* Categories Tool Taxonomy Grid */}
        <div className="space-y-10">
          {categories.map((cat) => {
            const tools = TOOLS_LIST.filter((t) => t.category === cat);
            return (
              <section key={cat} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
                  <h2 className="text-lg font-mono font-bold text-slate-200 tracking-tight">{cat}</h2>
                  <span className="text-xs font-mono text-slate-500">({tools.length} tools)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/${t.slug}`}
                      className="p-5 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 rounded-xl group transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
                            {t.title}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {t.shortDescription}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span>Client-side</span>
                        <span className="text-emerald-400/80 font-semibold group-hover:text-emerald-300">Open Tool →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
