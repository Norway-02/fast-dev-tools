import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getToolsByCategorySlug, getCategoryInfo } from '@/lib/constants/tools-list';
import { getGuidesByCategory } from '@/lib/constants/guides-list';
import { FileCode, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JSON Tools & Utilities — Format, Validate, Minify & Convert | DevPocket',
  description: 'Free, online JSON developer tools. Format, validate syntax, minify, view nested trees, and convert JSON to YAML or CSV directly in your browser.',
  alternates: {
    canonical: 'https://devpocket.dpdns.org/json-tools',
  },
};

export default function JsonToolsCategoryPage() {
  const category = getCategoryInfo('json-tools')!;
  const tools = getToolsByCategorySlug('json-tools');
  const guides = getGuidesByCategory('json-tools');

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative selection:bg-[#34D399] selection:text-[#04110A]">
      <AmbientBackground />
      <Header />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10">
        <Breadcrumbs items={[{ label: 'Developer Tools', href: '/dev-tools' }, { label: 'JSON Tools' }]} />

        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-[#34D399] font-mono">
            <FileCode className="w-3.5 h-3.5" /> Topic Cluster Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {category.title}
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">{category.description}</p>
        </div>

        {/* Tools Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">JSON Utilities ({tools.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="p-6 bg-[#0C111B] border border-[#1E293B] hover:border-[#34D399]/40 rounded-2xl transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-[#34D399] border border-emerald-500/20 font-bold">
                      {tool.title}
                    </span>
                    {tool.isPopular && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{tool.shortDescription}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/${tool.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#34D399] hover:underline"
                  >
                    Open {tool.title} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JSON Topic Cluster Interlinking Matrix */}
        <section className="p-6 bg-[#0C111B] border border-[#1E293B] rounded-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#34D399]" /> JSON Workflow Topic Cluster
            </h2>
            <p className="text-xs text-slate-400">
              Seamlessly transition between formatting, validating, minifying, and converting your JSON datasets.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
            <Link
              href="/json-formatter"
              className="p-3 bg-[#101B2B] border border-[#1E293B] hover:border-[#34D399] rounded-xl text-xs font-mono font-bold text-slate-200 hover:text-[#34D399] transition-all"
            >
              JSON Formatter
            </Link>
            <div className="hidden lg:flex items-center justify-center text-slate-600 font-mono">↔</div>
            <Link
              href="/json-validator"
              className="p-3 bg-[#101B2B] border border-[#1E293B] hover:border-[#34D399] rounded-xl text-xs font-mono font-bold text-slate-200 hover:text-[#34D399] transition-all"
            >
              JSON Validator
            </Link>
            <div className="hidden lg:flex items-center justify-center text-slate-600 font-mono">↔</div>
            <Link
              href="/json-minifier"
              className="p-3 bg-[#101B2B] border border-[#1E293B] hover:border-[#34D399] rounded-xl text-xs font-mono font-bold text-slate-200 hover:text-[#34D399] transition-all"
            >
              JSON Minifier
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center pt-2">
            <Link
              href="/json-to-yaml"
              className="p-3 bg-[#101B2B] border border-[#1E293B] hover:border-[#38BDF8] rounded-xl text-xs font-mono text-slate-300 hover:text-[#38BDF8] transition-all"
            >
              JSON → YAML
            </Link>
            <Link
              href="/yaml-to-json"
              className="p-3 bg-[#101B2B] border border-[#1E293B] hover:border-[#38BDF8] rounded-xl text-xs font-mono text-slate-300 hover:text-[#38BDF8] transition-all"
            >
              YAML → JSON
            </Link>
            <Link
              href="/json-to-csv"
              className="p-3 bg-[#101B2B] border border-[#1E293B] hover:border-[#38BDF8] rounded-xl text-xs font-mono text-slate-300 hover:text-[#38BDF8] transition-all"
            >
              JSON → CSV
            </Link>
            <Link
              href="/json-viewer"
              className="p-3 bg-[#101B2B] border border-[#1E293B] hover:border-[#38BDF8] rounded-xl text-xs font-mono text-slate-300 hover:text-[#38BDF8] transition-all"
            >
              JSON Tree Viewer
            </Link>
          </div>
        </section>

        {/* Related JSON Technical Guides */}
        {guides.length > 0 && (
          <section className="space-y-6 pt-4">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#34D399]" /> Related JSON Guides & Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="p-6 bg-[#0C111B] border border-[#1E293B] hover:border-[#34D399]/40 rounded-2xl transition-all space-y-3 block flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white hover:text-[#34D399] transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{guide.description}</p>
                  </div>
                  <div className="text-[11px] font-mono text-[#34D399] pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span>Read Guide</span>
                    <span>{guide.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
