import React from 'react';

export function PrivacyNotice() {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2 bg-[#0C111B]/90 border border-[#1E293B] rounded-xl text-xs font-mono text-slate-300 shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse-dot shrink-0" />
        <span>
          <strong className="text-slate-100 font-semibold">Processed locally.</strong> Your input stays in this browser.
        </span>
      </div>
      <span className="hidden sm:inline-block text-[10px] text-slate-500 font-mono">
        Zero Data Sent
      </span>
    </div>
  );
}
