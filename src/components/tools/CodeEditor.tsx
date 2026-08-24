'use client';

import React, { useId } from 'react';
import { ClearButton } from './ClearButton';
import { FileText, Sparkles, AlertCircle } from 'lucide-react';

export interface CodeEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSample?: () => void;
  onInvalidSample?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  errorLine?: number | null;
  readOnly?: boolean;
  minHeight?: string;
  actions?: React.ReactNode;
}

export function CodeEditor({
  label,
  value,
  onChange,
  placeholder = 'Enter input text here...',
  onClear,
  onSample,
  onInvalidSample,
  onSubmit,
  submitLabel = 'Process',
  errorLine,
  readOnly = false,
  minHeight = 'h-72',
  actions,
}: CodeEditorProps) {
  const textareaId = useId();
  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value.length;
  const byteSize = new TextEncoder().encode(value).length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      {/* Editor Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-950/70 border-b border-slate-800">
        <label htmlFor={textareaId} className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200 cursor-pointer">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>{label}</span>
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {onSample && (
            <button
              onClick={onSample}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Load Example</span>
            </button>
          )}

          {onInvalidSample && (
            <button
              onClick={onInvalidSample}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/50 rounded-lg transition-colors"
            >
              <AlertCircle className="w-3 h-3 text-rose-400" />
              <span>Try Invalid Input</span>
            </button>
          )}

          {onClear && <ClearButton onClear={onClear} />}

          {onSubmit && (
            <button
              onClick={onSubmit}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-md shadow-indigo-600/20"
            >
              <span>{submitLabel}</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 text-[10px] bg-indigo-700 rounded text-indigo-200 font-normal">
                ⌘↵
              </kbd>
            </button>
          )}

          {actions}
        </div>
      </div>

      {/* Textarea Input Area */}
      <div className="relative flex-1">
        <textarea
          id={textareaId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          className={`w-full ${minHeight} p-4 bg-slate-950/90 text-slate-100 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-indigo-500/50 selection:bg-indigo-500/30 border-0 ${
            errorLine ? 'border-l-4 border-l-rose-500' : ''
          }`}
        />
      </div>

      {/* Editor Footer Stats Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/90 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span>{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
          <span>•</span>
          <span>{charCount} {charCount === 1 ? 'char' : 'chars'}</span>
          <span>•</span>
          <span>{byteSize > 1024 ? `${(byteSize / 1024).toFixed(1)} KB` : `${byteSize} B`}</span>
        </div>
        <div className="hidden sm:block text-[10px] text-slate-600">
          <span>Ctrl/Cmd+Enter run</span>
        </div>
      </div>
    </div>
  );
}
