import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export function PrivacyNotice() {
  return (
    <div className="flex items-center gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400">
      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
      <div className="flex-1 flex flex-wrap items-center justify-between gap-2">
        <span className="text-slate-300">
          <strong className="text-emerald-400 font-semibold">100% Client-Side Processing:</strong> All transformations happen directly in your browser using standard Web APIs.
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          <Lock className="w-3 h-3 text-slate-400" />
          <span>Zero Data Sent</span>
        </span>
      </div>
    </div>
  );
}
