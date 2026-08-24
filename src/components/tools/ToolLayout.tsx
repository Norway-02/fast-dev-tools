import React from 'react';
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
import { BookOpen, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#06080D] text-slate-100 flex flex-col font-sans relative selection:bg-[#34D399] selection:text-[#04110A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AmbientBackground />

      <Header />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        <Breadcrumbs items={[{ label: tool.category }, { label: tool.title }]} />

        <ToolHeader tool={tool} />

        <PrivacyNotice />

        <div className="my-4">{children}</div>

        <AdSlot placement="below-tool" />

        {(howItWorks || useCases) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1E293B]">
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

        <FAQ faqs={tool.faqs} />

        <RelatedTools currentSlug={tool.slug} relatedSlugs={tool.relatedSlugs} nextToolSlugs={tool.nextToolSlugs} />
      </main>

      <Footer />
    </div>
  );
}
