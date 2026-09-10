import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { GUIDES_LIST, getGuideBySlug } from '@/lib/constants/guides-list';
import { TOOLS_LIST } from '@/lib/constants/tools-list';
import { BookOpen, Clock, Calendar, ArrowRight, ArrowLeft, Wrench } from 'lucide-react';

export function generateStaticParams() {
  return GUIDES_LIST.map((guide) => ({
    slug: guide.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    return {
      title: 'Guide Not Found — DevPocket',
    };
  }

  return {
    title: `${guide.title} — DevPocket`,
    description: guide.description,
    alternates: {
      canonical: `https://devpocket.dpdns.org/guides/${guide.slug}`,
    },
  };
}

export default function GuideArticlePage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    notFound();
  }

  // Related tools from slug list
  const relatedTools = TOOLS_LIST.filter((tool) =>
    guide.relatedToolSlugs.includes(tool.slug)
  );

  // Related guides
  const relatedGuides = GUIDES_LIST.filter(
    (g) => g.slug !== guide.slug && guide.relatedGuideSlugs.includes(g.slug)
  );

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative selection:bg-[#34D399] selection:text-[#04110A]">
      <AmbientBackground />
      <Header />

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        <Breadcrumbs
          items={[
            { label: 'Developer Guides', href: '/guides' },
            { label: guide.title },
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4 border-b border-[#1E293B] pb-6">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#34D399] border border-emerald-500/20 uppercase font-bold">
              {guide.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" /> {guide.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" /> {guide.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            {guide.subtitle}
          </p>
        </header>

        {/* Content Body */}
        <article className="prose prose-invert max-w-none prose-pre:bg-[#0C111B] prose-pre:border prose-pre:border-[#1E293B] prose-pre:rounded-xl text-slate-300 leading-relaxed space-y-6">
          {guide.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={i} className="text-2xl font-bold text-white pt-4 pb-1 border-b border-slate-800">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={i} className="text-lg font-bold text-slate-100 pt-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('```')) {
              const lines = paragraph.split('\n');
              const lang = lines[0].replace('```', '');
              const code = lines.slice(1, -1).join('\n');
              return (
                <div key={i} className="p-4 bg-[#0C111B] border border-[#1E293B] rounded-xl font-mono text-xs text-slate-200 overflow-x-auto my-4 shadow-lg">
                  {lang && <div className="text-[10px] text-slate-500 uppercase pb-2 border-b border-slate-800 font-bold">{lang}</div>}
                  <pre className="pt-2"><code>{code}</code></pre>
                </div>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={i} className="p-4 bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 rounded-r-xl my-4 text-xs font-sans">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={i} className="text-sm text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Linked Interactive Tools (Topic Cluster Step D4) */}
        {relatedTools.length > 0 && (
          <section className="p-6 bg-[#0C111B] border border-[#1E293B] rounded-2xl space-y-4 my-8 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#34D399]" /> Try Related Interactive Tools
            </h2>
            <p className="text-xs text-slate-400">
              Put this guide into practice with our 100% client-side developer micro-tools:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/${tool.slug}`}
                  className="p-3 bg-[#101B2B] border border-slate-800 hover:border-[#34D399] rounded-xl text-xs font-mono font-bold text-white hover:text-[#34D399] transition-all flex items-center justify-between"
                >
                  <span>{tool.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#34D399]" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Guides Footer Navigation */}
        {relatedGuides.length > 0 && (
          <section className="pt-8 border-t border-[#1E293B] space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#38BDF8]" /> Related Engineering Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="p-4 bg-[#0C111B] border border-[#1E293B] hover:border-[#38BDF8]/40 rounded-xl transition-all space-y-2 block"
                >
                  <h3 className="text-sm font-bold text-white hover:text-[#38BDF8] transition-colors leading-snug">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{g.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#34D399] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Guides
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
