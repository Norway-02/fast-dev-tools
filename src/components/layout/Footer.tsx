import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#06080D] border-t border-[#1E293B] text-slate-400 text-xs py-10 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#1E293B]">
          <div className="space-y-1.5">
            <Link href="/" className="flex items-center gap-2 text-slate-100 font-mono font-bold text-sm">
              <span className="text-[#34D399] font-extrabold">&gt;_</span>
              <span>FastDevTools</span>
            </Link>
            <p className="text-slate-400 text-xs max-w-md font-sans">
              Fast developer micro-tools. No installation. No signup.
            </p>
          </div>

          <div className="p-3.5 bg-[#0C111B] border border-[#1E293B] rounded-xl space-y-1 max-w-md w-full sm:w-auto shadow-md">
            <div className="flex items-center gap-2 text-[#34D399] font-mono font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <span>Your data stays in your browser.</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Tool operations process locally via Web APIs and never upload your input to any server.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>© {new Date().getFullYear()} FastDevTools. Free & open developer utilities.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              All 21 Tools
            </Link>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3 h-3 text-[#38BDF8]" />
              <span>Zero Server Transmission</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
