'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export function ShareButton({ toolTitle }: { toolTitle: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${toolTitle} - FastDevTools`,
          text: `Check out this 100% browser-based ${toolTitle} tool. No installation, no signup.`,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignored fallback
    }
  };

  return (
    <button
      onClick={handleShare}
      title="Share tool URL"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-all"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-indigo-400" />}
      <span>{copied ? 'Link Copied!' : 'Share Tool'}</span>
    </button>
  );
}
