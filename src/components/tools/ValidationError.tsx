import React from 'react';
import { AlertTriangle } from 'lucide-react';

export interface ValidationErrorProps {
  error: string | null;
  line?: number | null;
  column?: number | null;
}

export function ValidationError({ error, line, column }: ValidationErrorProps) {
  if (!error) return null;

  return (
    <div className="p-4 bg-rose-950/20 border-l-4 border-l-[#FB7185] border border-rose-900/30 rounded-r-xl space-y-1 font-mono text-xs text-rose-200 shadow-md animate-in fade-in slide-in-from-top-1 duration-180">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[#FB7185] font-bold">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>⚠ Invalid Input Format</span>
        </div>

        {(line !== null && line !== undefined) && (
          <span className="px-2.5 py-0.5 rounded bg-rose-950/60 text-rose-300 text-[11px] border border-rose-900/50 font-semibold">
            Approximate Location: Line {line} · Column {column || 1}
          </span>
        )}
      </div>

      <p className="text-slate-300 text-xs leading-relaxed pl-6">
        {error}
      </p>
    </div>
  );
}
