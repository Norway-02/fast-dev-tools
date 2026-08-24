import React from 'react';

export function AdSlot({ placement = 'below-tool' }: { placement?: 'below-tool' | 'sidebar' | 'content-between' }) {
  // Configurable developer sponsor placeholder
  return (
    <aside aria-label="Developer Sponsor" data-placement={placement} className="w-full my-6 p-4 bg-slate-900/50 border border-slate-800/60 rounded-xl text-center">
      <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1.5">Sponsor</div>
      <div className="text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
        <span>⚡ Deploy fast on top developer infrastructure</span>
        <span className="text-indigo-400 underline cursor-pointer hover:text-indigo-300">Learn More →</span>
      </div>
    </aside>
  );
}
