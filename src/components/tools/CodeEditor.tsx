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
    <div className="flex flex-col bg-[#0C111B] border border-[#1E293B] rounded-[18px] overflow-hidden shadow-2xl">
      {/* Editor Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 bg-[#06080D]/80 border-b border-[#1E293B]">
        <label htmlFor={textareaId} className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200 cursor-pointer">
          <FileText className="w-4 h-4 text-[#34D399]" />
          <span>{label}</span>
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {onSample && (
            <button
              onClick={onSample}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-medium bg-[#111927] hover:bg-[#1E293B] text-slate-300 hover:text-white border border-[#1E293B] rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Example</span>
            </button>
          )}

          {onInvalidSample && (
            <button
              onClick={onInvalidSample}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-medium bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border border-rose-900/40 rounded-lg transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Try Invalid Input</span>
            </button>
          )}

          {onClear && <ClearButton onClear={onClear} />}

          {onSubmit && (
            <button
              onClick={onSubmit}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-bold bg-[#34D399] hover:bg-[#6EE7B7] active:scale-[0.98] text-[#04110A] rounded-lg transition-all duration-120 shadow-lg shadow-[#34D399]/20"
            >
              <span>{submitLabel}</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-[#04110A]/20 rounded text-[#04110A] font-semibold">
                ⌘↵
              </kbd>
            </button>
          )}

          {actions}
        </div>
      </div>

      {/* Editor Textarea Input Area */}
      <div className="relative flex-1">
        <textarea
          id={textareaId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          className={`w-full ${minHeight} p-5 bg-[#070B12] text-slate-100 font-mono text-[14px] leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-[#34D399]/50 selection:bg-[#34D399]/20 border-0 ${
            errorLine ? 'border-l-4 border-l-[#FB7185]' : ''
          }`}
        />
      </div>

      {/* Editor Footer Stats Bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-[#06080D]/90 border-t border-[#1E293B] text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-3">
          <span>{lineCount} {lineCount === 1 ? 'line' : 'lines'}</span>
          <span>•</span>
          <span>{charCount} {charCount === 1 ? 'char' : 'chars'}</span>
          <span>•</span>
          <span>{byteSize > 1024 ? `${(byteSize / 1024).toFixed(1)} KB` : `${byteSize} B`}</span>
        </div>
        <div className="hidden sm:block text-[10px] text-slate-500">
          <span>Ctrl/Cmd+Enter run</span>
        </div>
      </div>
    </div>
  );
}
