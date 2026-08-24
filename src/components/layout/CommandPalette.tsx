'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, X } from 'lucide-react';
import { TOOLS_LIST, ToolMetadata } from '@/lib/constants/tools-list';
import { addRecentTool } from '@/lib/utils/storage';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTools = query.trim()
    ? TOOLS_LIST.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          t.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      )
    : TOOLS_LIST.filter((t) => t.isPopular);

  useEffect(() => {
    if (isOpen) {
      const handle = setTimeout(() => {
        inputRef.current?.focus();
        setQuery('');
        setSelectedIndex(0);
      }, 0);
      return () => clearTimeout(handle);
    }
  }, [isOpen]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);
  };

  const navigateToTool = (tool: ToolMetadata) => {
    addRecentTool(tool.slug);
    onClose();
    router.push(`/${tool.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        navigateToTool(filteredTools[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Command Palette Input Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-950/90">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all 21 tools (e.g. JSON, JWT, Base64, UUID)..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            {query.trim() ? `Search Results (${filteredTools.length})` : 'Popular Developer Tools'}
          </div>

          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => (
              <div
                key={tool.slug}
                onClick={() => navigateToTool(tool)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                  idx === selectedIndex ? 'bg-indigo-600/20 border border-indigo-500/40 text-slate-100' : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-slate-100">{tool.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{tool.shortDescription}</p>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${idx === selectedIndex ? 'text-indigo-400 translate-x-1' : 'text-slate-600'}`} />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              No tools matching &quot;{query}&quot; found.
            </div>
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">ESC</kbd> Close</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 font-semibold">
            <span>100% Client-Side</span>
          </div>
        </div>
      </div>
    </div>
  );
}
