import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { GUIDES_LIST } from '@/lib/constants/guides-list';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Developer Guides & Technical Specs — DevPocket',
  description: 'In-depth developer guides and technical tutorials on JSON formatting, JSON5 specifications, malformed JSON validation, JWT decoding, Unix timestamps, cron schedules, Base64 encoding, and regex optimization.',
  alternates: {
    canonical: 'https://devpocket.dpdns.org/guides',
  },
};

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative selection:bg-[#34D399] selection:text-[#04110A]">
      <AmbientBackground />
      <Header />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10">
        <Breadcrumbs items={[{ label: 'Developer Guides' }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-[#34D399] font-mono">
            <BookOpen className="w-3.5 h-3.5" /> Technical Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Developer Guides & Engineering Articles
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Practical, evidence-backed guides written for software engineers. Learn specifications, CLI tools, algorithmic details, and security best practices.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES_LIST.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="p-6 bg-[#0C111B] border border-[#1E293B] hover:border-[#34D399]/40 rounded-2xl transition-all space-y-4 flex flex-col justify-between group block"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#101B2B] text-[#34D399] border border-emerald-500/20">
                    {guide.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {guide.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-[#34D399] transition-colors leading-snug">
                  {guide.title}
                </h2>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-[#34D399] font-bold">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
