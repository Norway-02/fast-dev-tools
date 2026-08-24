'use client';

import React from 'react';
import { Download } from 'lucide-react';

export function DownloadButton({
  content,
  filename,
  mimeType = 'text/plain',
  className = '',
}: {
  content: string;
  filename: string;
  mimeType?: string;
  className?: string;
}) {
  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!content}
      title="Download file"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      <Download className="w-3.5 h-3.5" />
      <span>Download</span>
    </button>
  );
}
