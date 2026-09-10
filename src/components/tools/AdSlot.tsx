import React from 'react';
import Link from 'next/link';

export function AdSlot({ placement = 'below-tool' }: { placement?: 'below-tool' | 'sidebar' | 'content-between' }) {
  return (
    <aside aria-label="Developer Sponsor" data-placement={placement} className="w-full my-6 p-4 bg-slate-900/50 border border-slate-800/60 rounded-xl text-center">
      <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1.5">Developer Spotlight</div>
      <div className="text-xs text-slate-400 font-mono flex items-center justify-center gap-2 flex-wrap">
        <span>⚡ Explore 20+ fast, 100% browser-based developer micro-tools</span>
        <Link href="/dev-tools" className="text-indigo-400 underline hover:text-indigo-300 transition-colors font-semibold">
          Learn More →
        </Link>
      </div>
    </aside>
  );
}
