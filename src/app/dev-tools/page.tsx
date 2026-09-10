import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { TOOLS_LIST } from '@/lib/constants/tools-list';
import { GUIDES_LIST } from '@/lib/constants/guides-list';
import { FileCode, Binary, Wrench, ArrowRight, Shield, Zap, Lock, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Developer Tools & Utilities — DevPocket',
  description: 'Explore 21+ fast, secure, 100% client-side developer micro-tools. JSON formatting, encoding, UUID generation, JWT decoding, regex testing, and unix timestamps.',
  alternates: {
    canonical: 'https://devpocket.dpdns.org/dev-tools',
  },
};

export default function DevToolsIndexPage() {
  const jsonTools = TOOLS_LIST.filter((t) => t.category === 'JSON');
  const encodingTools = TOOLS_LIST.filter((t) => t.category === 'Encoding');
  const utilityTools = TOOLS_LIST.filter(
    (t) =>
      t.category === 'Developer Utilities' ||
      t.category === 'Identifiers & Time' ||
      t.category === 'Security & Web'
  );

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative selection:bg-[#34D399] selection:text-[#04110A]">
      <AmbientBackground />
      <Header />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10">
        <Breadcrumbs items={[{ label: 'Developer Tools' }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101B2B] border border-[#1E293B] text-xs text-[#34D399] font-mono">
            <Zap className="w-3.5 h-3.5" /> 21 Client-Side Micro-Tools
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Developer Micro-Tools Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Fast, zero-latency micro-utilities for modern developers. Formatted, validated, encoded, and parsed entirely in your browser with zero data logging.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#34D399]" /> 100% In-Browser Execution
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#38BDF8]" /> Zero Server Uploads
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Instant Performance
            </span>
          </div>
        </div>

        {/* Topic Category Clusters */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* JSON Cluster Card */}
          <div className="p-6 bg-[#0C111B] border border-[#1E293B] hover:border-[#34D399]/40 rounded-2xl transition-all duration-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#34D399]">
                <FileCode className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">JSON Tools Hub</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Format, validate, minify, inspect, and convert JSON structures to YAML or CSV.
              </p>
            </div>
            <Link
              href="/json-tools"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#34D399] hover:underline pt-2"
            >
              Explore {jsonTools.length} JSON Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Encoding Cluster Card */}
          <div className="p-6 bg-[#0C111B] border border-[#1E293B] hover:border-[#38BDF8]/40 rounded-2xl transition-all duration-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[#38BDF8]">
                <Binary className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Encoding & Decoding</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Base64, URL percent-encoding, and HTML entity converters with UTF-8 support.
              </p>
            </div>
            <Link
              href="/encoding-tools"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] hover:underline pt-2"
            >
              Explore {encodingTools.length} Encoding Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Utilities Cluster Card */}
          <div className="p-6 bg-[#0C111B] border border-[#1E293B] hover:border-[#A855F7]/40 rounded-2xl transition-all duration-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Wrench className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Developer Utilities</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                UUID generation, Unix timestamp parsing, JWT decoding, regex testing, and cron builders.
              </p>
            </div>
            <Link
              href="/developer-utilities"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-400 hover:underline pt-2"
            >
              Explore {utilityTools.length} Utilities <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* All Tools Grid */}
        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">All Tools Directory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_LIST.map((tool) => (
              <Link
                key={tool.id}
                href={`/${tool.slug}`}
                className="p-5 bg-[#0C111B] border border-[#1E293B] hover:border-slate-700 rounded-xl transition-all group space-y-2 block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-white group-hover:text-[#34D399] transition-colors">
                    {tool.title}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {tool.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{tool.shortDescription}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Technical Guides */}
        <section className="space-y-6 pt-8 border-t border-[#1E293B]">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#34D399]" /> Featured Developer Guides
              </h2>
              <p className="text-xs text-slate-400">In-depth technical articles, tutorials, and specifications.</p>
            </div>
            <Link
              href="/guides"
              className="text-xs font-mono text-[#34D399] hover:underline flex items-center gap-1"
            >
              View All Guides <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUIDES_LIST.slice(0, 4).map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="p-5 bg-[#0C111B] border border-[#1E293B] hover:border-slate-700 rounded-xl transition-all space-y-3 block flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-[#34D399] border border-emerald-500/20">
                    {guide.category}
                  </span>
                  <h3 className="text-sm font-bold text-white hover:text-[#34D399] transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{guide.description}</p>
                </div>
                <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800/60">
                  {guide.readTime}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
