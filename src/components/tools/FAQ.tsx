import React from 'react';
import { HelpCircle } from 'lucide-react';
import { ToolFaq } from '@/lib/constants/tools-list';

export function FAQ({ faqs }: { faqs: ToolFaq[] }) {
  if (!faqs || faqs.length === 0) return null;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section className="space-y-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center gap-2 text-sm font-mono font-bold text-slate-200">
        <HelpCircle className="w-4 h-4 text-indigo-400" />
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="grid gap-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <h3 className="text-xs font-semibold text-slate-200">{faq.question}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
