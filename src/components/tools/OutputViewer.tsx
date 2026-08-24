'use client';

import React from 'react';
import { CopyButton } from './CopyButton';
import { DownloadButton } from './DownloadButton';
import { Terminal } from 'lucide-react';

export interface OutputViewerProps {
  label: string;
  value: string;
  filename?: string;
  mimeType?: string;
  minHeight?: string;
  statusMessage?: string;
}

export function OutputViewer({
  label,
  value,
  filename = 'output.txt',
  mimeType = 'text/plain',
  minHeight = 'h-72',
  statusMessage,
}: OutputViewerProps) {
  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value.length;
  const byteSize = new TextEncoder().encode(value).length;

  return (
    <div className="flex flex-col bg-[#0C111B] border border-[#1E293B] rounded-[18px] overflow-hidden shadow-2xl">
      {/* Output Header Bar */}
      <div className="flex items-center justify-between gap-2 px-5 py-3 bg-[#06080D]/80 border-b border-[#1E293B]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
          <Terminal className="w-4 h-4 text-[#38BDF8]" />
          <span>{label}</span>
        </div>

        <div className="flex items-center gap-2">
          <CopyButton text={value} />
          <DownloadButton filename={filename} content={value} mimeType={mimeType} />
        </div>
      </div>

      {/* Output Display Area */}
      <div className="relative flex-1">
        <textarea
          value={value}
          readOnly
          spellCheck={false}
          className={`w-full ${minHeight} p-5 bg-[#070B12] text-[#34D399] font-mono text-[14px] leading-relaxed resize-y focus:outline-none selection:bg-[#34D399]/20 border-0`}
        />
      </div>

      {/* Output Status & Metrics Bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-[#06080D]/90 border-t border-[#1E293B] text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span>{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
          <span>•</span>
          <span>{charCount} {charCount === 1 ? 'char' : 'chars'}</span>
          <span>•</span>
          <span>{byteSize > 1024 ? `${(byteSize / 1024).toFixed(1)} KB` : `${byteSize} B`}</span>
        </div>

        {statusMessage ? (
          <div className="text-[#34D399] font-semibold flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-180">
            <span>✓ {statusMessage}</span>
          </div>
        ) : (
          <div className="text-slate-500">
            <span>Read-only output</span>
          </div>
        )}
      </div>
    </div>
  );
}
