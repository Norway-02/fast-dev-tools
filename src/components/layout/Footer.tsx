import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Lock } from 'lucide-react';
import { TOOLS_LIST } from '@/lib/constants/tools-list';

export function Footer() {
  const jsonTools = TOOLS_LIST.filter((t) => t.category === 'JSON');
  const encodingTools = TOOLS_LIST.filter((t) => t.category === 'Encoding');
  const otherTools = TOOLS_LIST.filter((t) => t.category !== 'JSON' && t.category !== 'Encoding');

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/60">
          {/* Column 1: Brand & Privacy Guarantee */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 text-slate-100 font-mono font-bold text-sm">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>FastDevTools</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs">
              Fast developer micro-tools. No installation. No signup. Zero server data transmission.
            </p>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <Shield className="w-3.5 h-3.5" />
                <span>100% In-Browser Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Your JSON, JWTs, strings, and secrets are processed locally via Web APIs and standard JavaScript. Never sent to any server.
              </p>
            </div>
          </div>

          {/* Column 2: JSON Tools */}
          <div>
            <h3 className="font-mono font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              JSON Tools
            </h3>
            <ul className="space-y-2">
              {jsonTools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="hover:text-indigo-400 transition-colors">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Encoding Tools */}
          <div>
            <h3 className="font-mono font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Encoding & Security
            </h3>
            <ul className="space-y-2">
              {encodingTools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="hover:text-indigo-400 transition-colors">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: ID, Time & Developer Utilities */}
          <div>
            <h3 className="font-mono font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Developer Utilities
            </h3>
            <ul className="space-y-2">
              {otherTools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="hover:text-indigo-400 transition-colors">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom info & Affiliate Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} FastDevTools. Open & privacy-first developer utilities.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Zero-tracking input architecture</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
