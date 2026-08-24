'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({ text, className = '' }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      title="Copy to clipboard (Ctrl/Cmd+Shift+C)"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
        copied
          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed'
      } ${className}`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
}
