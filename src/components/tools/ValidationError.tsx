import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface ValidationErrorProps {
  error: string | null;
  line?: number | null;
  column?: number | null;
}

export function ValidationError({ error, line, column }: ValidationErrorProps) {
  return (
    <div className="p-3 bg-rose-950/30 border-l-4 border-l-rose-500 border border-rose-900/40 rounded-r-xl space-y-1 font-mono text-xs text-rose-200">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-rose-400 font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Invalid JSON Syntax</span>
        </div>

        {(line !== null && line !== undefined) && (
          <span className="px-2 py-0.5 rounded bg-rose-900/50 text-rose-200 text-[11px] border border-rose-800/60 font-semibold">
            Approximate Error Location: Line {line}, Col {column || 1}
          </span>
        )}
      </div>

      <p className="text-slate-300 text-xs leading-relaxed pl-6">
        {error}
      </p>
    </div>
  );
}
