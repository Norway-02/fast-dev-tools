import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AmbientBackground } from '@/components/layout/AmbientBackground';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ToolHeader } from './ToolHeader';
import { PrivacyNotice } from './PrivacyNotice';
import { FAQ } from './FAQ';
import { RelatedTools } from './RelatedTools';
import { AdSlot } from './AdSlot';
import { ToolMetadata } from '@/lib/constants/tools-list';
import { GUIDES_LIST } from '@/lib/constants/guides-list';
import { BookOpen, CheckCircle2, Keyboard, AlertTriangle, ArrowRight } from 'lucide-react';

export interface ToolLayoutProps {
  tool: ToolMetadata;
  children: React.ReactNode;
  howItWorks?: string[];
  useCases?: string[];
}

export function ToolLayout({ tool, children, howItWorks, useCases }: ToolLayoutProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.h1Title || tool.title,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: tool.fullDescription,
  };

  // Find related guides for this tool
  const relatedGuides = GUIDES_LIST.filter(
    (guide) =>
      guide.relatedToolSlugs.includes(tool.slug) ||
      (tool.guideSlugs && tool.guideSlugs.includes(guide.slug))
  );

  const categorySlug =
    tool.categorySlug ||
    (tool.category === 'JSON'
      ? 'json-tools'
      : tool.category === 'Encoding'
      ? 'encoding-tools'
      : 'developer-utilities');

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative selection:bg-[#34D399] selection:text-[#04110A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AmbientBackground />

      <Header />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        <Breadcrumbs
          items={[
            { label: 'Developer Tools', href: '/dev-tools' },
            { label: tool.category, href: `/${categorySlug}` },
            { label: tool.title },
          ]}
        />

        <ToolHeader tool={tool} />

        <PrivacyNotice />

        <div className="my-4">{children}</div>

        <AdSlot placement="below-tool" />

        {/* Detailed Tool Overview & Key Operations */}
        <section className="p-6 bg-[#0C111B] border border-[#1E293B] rounded-2xl space-y-4 shadow-lg">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#34D399]" /> What {tool.h1Title || tool.title} Does
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">{tool.fullDescription}</p>

          {tool.features && tool.features.length > 0 && (
            <div className="pt-2">
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-2">
                Key Operations & Capabilities:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
                {tool.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Keyboard Shortcuts & Error Explanations Grid */}
        {(tool.shortcuts || tool.errorExplanations) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.shortcuts && tool.shortcuts.length > 0 && (
              <div className="p-5 bg-[#0C111B] border border-[#1E293B] rounded-xl space-y-3 shadow-lg">
                <div className="flex items-center gap-2 font-mono font-bold text-slate-200 text-sm">
                  <Keyboard className="w-4 h-4 text-[#38BDF8]" />
                  <h2>Keyboard Shortcuts</h2>
                </div>
                <div className="space-y-2 text-xs">
                  {tool.shortcuts.map((sc, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#101B2B] rounded-lg border border-slate-800">
                      <kbd className="px-2 py-1 bg-slate-800 text-slate-200 font-mono text-[11px] rounded border border-slate-700">
                        {sc.key}
                      </kbd>
                      <span className="text-slate-400 font-sans">{sc.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tool.errorExplanations && tool.errorExplanations.length > 0 && (
              <div className="p-5 bg-[#0C111B] border border-[#1E293B] rounded-xl space-y-3 shadow-lg">
                <div className="flex items-center gap-2 font-mono font-bold text-slate-200 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <h2>Common Syntax Error Diagnostics</h2>
                </div>
                <div className="space-y-3 text-xs">
                  {tool.errorExplanations.map((err, i) => (
                    <div key={i} className="p-3 bg-[#101B2B] rounded-lg border border-slate-800 space-y-1">
                      <div className="font-mono font-bold text-amber-400 text-[11px]">{err.error}</div>
                      <div className="text-slate-400"><strong className="text-slate-300">Cause:</strong> {err.cause}</div>
                      <div className="text-slate-400"><strong className="text-[#34D399]">Fix:</strong> {err.fix}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {(howItWorks || useCases) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {howItWorks && (
              <div className="p-5 bg-[#0C111B] border border-[#1E293B] rounded-xl space-y-3 shadow-lg">
                <div className="flex items-center gap-2 font-mono font-bold text-slate-200 text-sm">
                  <BookOpen className="w-4 h-4 text-[#34D399]" />
                  <h2>How It Works</h2>
                </div>
                <ul className="space-y-2 text-xs text-slate-400 font-sans">
                  {howItWorks.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono font-semibold text-[#34D399]">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {useCases && (
              <div className="p-5 bg-[#0C111B] border border-[#1E293B] rounded-xl space-y-3 shadow-lg">
                <div className="flex items-center gap-2 font-mono font-bold text-slate-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                  <h2>Common Use Cases</h2>
                </div>
                <ul className="space-y-2 text-xs text-slate-400 font-sans">
                  {useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#38BDF8]">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Related Technical Guides for Topic Clustering */}
        {relatedGuides.length > 0 && (
          <section className="p-6 bg-[#0C111B] border border-[#1E293B] rounded-2xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#34D399]" /> Related Developer Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="p-4 bg-[#101B2B] border border-slate-800 hover:border-[#34D399]/40 rounded-xl transition-all space-y-2 block"
                >
                  <h3 className="text-xs font-bold text-white hover:text-[#34D399] transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{guide.description}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#34D399] font-bold pt-1">
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FAQ faqs={tool.faqs} />

        <RelatedTools currentSlug={tool.slug} relatedSlugs={tool.relatedSlugs} nextToolSlugs={tool.nextToolSlugs} />
      </main>

      <Footer />
    </div>
  );
}
