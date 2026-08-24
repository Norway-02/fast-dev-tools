import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export function PrivacyNotice() {
  return (
    <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-900/60 border border-slate-800/80 rounded-lg text-xs font-mono text-slate-400">
      <span className="flex items-center gap-2 text-slate-300">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Your data stays in this browser. Processing occurs locally via Web APIs.</span>
      </span>
      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
        <Lock className="w-3 h-3 text-slate-400" />
        <span>Zero Server Transmission</span>
      </span>
    </div>
  );
}
