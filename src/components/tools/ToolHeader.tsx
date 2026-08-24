import React from 'react';
import { ToolMetadata } from '@/lib/constants/tools-list';

export function ToolHeader({ tool }: { tool: ToolMetadata }) {
  return (
    <header className="space-y-2 mb-4">
      <div className="flex items-center gap-2 font-mono">
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#111927] text-[#34D399] border border-[#1E293B]">
          ● {tool.category}
        </span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-mono">
        {tool.title}
      </h1>

      <p className="text-sm text-slate-400 leading-relaxed max-w-3xl font-sans">
        {tool.shortDescription}
      </p>
    </header>
  );
}
