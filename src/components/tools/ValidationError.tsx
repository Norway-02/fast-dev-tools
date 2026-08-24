import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ValidationError({
  error,
  line,
  column,
}: {
  error: string | null;
  line?: number | null;
  column?: number | null;
}) {
  if (!error) return null;

  return (
    <div className="flex items-start gap-3 p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl text-rose-300 text-xs font-mono">
      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <div className="font-semibold text-rose-200 flex flex-wrap items-center gap-2">
          <span>Parsing Error</span>
          {(line !== undefined && line !== null) && (
            <span className="text-[10px] bg-rose-900/60 px-2 py-0.5 rounded text-rose-200 border border-rose-800 font-medium">
              Approximate Error Location: Line {line}{column ? `, Col ${column}` : ''}
            </span>
          )}
        </div>
        <p className="text-rose-300/90 leading-relaxed break-all">{error}</p>
      </div>
    </div>
  );
}
