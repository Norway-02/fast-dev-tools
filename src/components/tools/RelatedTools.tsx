import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import { getToolBySlug, ToolMetadata } from '@/lib/constants/tools-list';

export function RelatedTools({ currentSlug, relatedSlugs, nextToolSlugs }: { currentSlug: string; relatedSlugs: string[]; nextToolSlugs?: string[] }) {
  const slugsToUse = nextToolSlugs || relatedSlugs;
  const tools = slugsToUse
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolMetadata => t !== undefined && t.slug !== currentSlug)
    .slice(0, 4);

  if (tools.length === 0) return null;

  return (
    <section className="space-y-3 pt-4 border-t border-slate-800/80">
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
        <Wrench className="w-3.5 h-3.5 text-indigo-400" />
        <h2>Popular Next Tools</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className="p-3 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl group transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                {t.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1">{t.shortDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
