'use client';

import React, { useId } from 'react';
import { CopyButton } from './CopyButton';
import { DownloadButton } from './DownloadButton';
import { Terminal } from 'lucide-react';

export interface OutputViewerProps {
  label?: string;
  value: string;
  filename?: string;
  mimeType?: string;
  minHeight?: string;
  emptyText?: string;
  actions?: React.ReactNode;
}

export function OutputViewer({
  label = 'Output Result',
  value,
  filename = 'output.txt',
  mimeType = 'text/plain',
  minHeight = 'h-72',
  emptyText = 'Output will appear here automatically...',
  actions,
}: OutputViewerProps) {
  const textareaId = useId();
  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value.length;
  const byteSize = new TextEncoder().encode(value).length;

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      {/* Output Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-950/70 border-b border-slate-800">
        <label htmlFor={textareaId} className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200 cursor-pointer">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-2">
          <CopyButton text={value} />
          <DownloadButton content={value} filename={filename} mimeType={mimeType} />
          {actions}
        </div>
      </div>

      {/* Output View Content Area */}
      <div className="relative flex-1">
        {value ? (
          <textarea
            id={textareaId}
            value={value}
            readOnly
            spellCheck={false}
            className={`w-full ${minHeight} p-4 bg-slate-950/90 text-emerald-300 font-mono text-xs leading-relaxed resize-y focus:outline-none selection:bg-emerald-500/30 border-0`}
          />
        ) : (
          <div className={`w-full ${minHeight} p-8 bg-slate-950/90 flex flex-col items-center justify-center text-slate-600 font-mono text-xs`}>
            <p>{emptyText}</p>
          </div>
        )}
      </div>

      {/* Output Footer Stats */}
      {value && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950/90 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
            <span>•</span>
            <span>{charCount} {charCount === 1 ? 'char' : 'chars'}</span>
            <span>•</span>
            <span>{byteSize > 1024 ? `${(byteSize / 1024).toFixed(1)} KB` : `${byteSize} B`}</span>
          </div>
        </div>
      )}
    </div>
  );
}
