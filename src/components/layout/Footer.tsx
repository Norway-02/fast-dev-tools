import React from 'react';
import Link from 'next/link';
import { Shield, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="space-y-1.5">
            <Link href="/" className="flex items-center gap-2 text-slate-100 font-mono font-bold text-sm">
              <span className="text-indigo-400 font-extrabold">[&gt;_]</span>
              <span>FastDevTools</span>
            </Link>
            <p className="text-slate-400 text-xs max-w-md">
              Fast developer micro-tools. No installation. No signup.
            </p>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1 max-w-md">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>Your data stays in your browser.</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Tool operations process locally via standard Web APIs and never upload your input to any server.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>© {new Date().getFullYear()} FastDevTools. Free & open developer utilities.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              All 21 Tools
            </Link>
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
