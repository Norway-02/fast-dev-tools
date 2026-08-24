'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

export function ClearButton({ onClear, className = '' }: { onClear: () => void; className?: string }) {
  return (
    <button
      onClick={onClear}
      title="Clear input"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium bg-slate-800/80 text-slate-300 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700 hover:border-rose-900/50 rounded-lg transition-all ${className}`}
    >
      <Trash2 className="w-3.5 h-3.5" />
      <span>Clear</span>
    </button>
  );
}
