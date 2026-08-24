import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import { getToolBySlug } from '@/lib/constants/tools-list';

export function RelatedTools({ currentSlug, relatedSlugs }: { currentSlug: string; relatedSlugs: string[] }) {
  const tools = relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined && t.slug !== currentSlug)
    .slice(0, 4);

  if (tools.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-mono font-bold text-slate-200">
        <Wrench className="w-4 h-4 text-indigo-400" />
        <h2>Related Developer Tools</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl group transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                {t.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">{t.shortDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
