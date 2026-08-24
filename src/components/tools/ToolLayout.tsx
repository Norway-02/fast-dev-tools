import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ToolHeader } from './ToolHeader';
import { PrivacyNotice } from './PrivacyNotice';
import { FAQ } from './FAQ';
import { RelatedTools } from './RelatedTools';
import { AdSlot } from './AdSlot';
import { ToolMetadata } from '@/lib/constants/tools-list';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export interface ToolLayoutProps {
  tool: ToolMetadata;
  children: React.ReactNode;
  howItWorks?: string[];
  useCases?: string[];
}

export function ToolLayout({ tool, children, howItWorks, useCases }: ToolLayoutProps) {
  // SoftwareApplication JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: tool.fullDescription,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: tool.category }, { label: tool.title }]} />

        {/* Tool Header Info */}
        <ToolHeader tool={tool} />

        {/* Privacy Notice Banner */}
        <PrivacyNotice />

        {/* Core Tool Interface Container */}
        <div className="my-6">{children}</div>

        {/* Ad Slot Below Tool */}
        <AdSlot placement="below-tool" />

        {/* How It Works & Use Cases */}
        {(howItWorks || useCases) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
            {howItWorks && (
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 font-mono font-bold text-slate-200 text-sm">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <h2>How It Works</h2>
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  {howItWorks.map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono font-semibold text-indigo-400">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {useCases && (
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 font-mono font-bold text-slate-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h2>Common Use Cases</h2>
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  {useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* FAQ Section */}
        <FAQ faqs={tool.faqs} />

        {/* Related Tools Internal Links */}
        <RelatedTools currentSlug={tool.slug} relatedSlugs={tool.relatedSlugs} />
      </main>

      <Footer />
    </div>
  );
}
