import React from 'react';
import { ToolMetadata } from '@/lib/constants/tools-list';
import { ShieldCheck } from 'lucide-react';

export function ToolHeader({ tool }: { tool: ToolMetadata }) {
  return (
    <header className="space-y-2 mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {tool.category}
        </span>
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Client-Side</span>
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100 font-mono">
        {tool.title}
      </h1>

      <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
        {tool.shortDescription}
      </p>
    </header>
  );
}
