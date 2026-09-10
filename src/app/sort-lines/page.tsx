'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { sortLines, LineSortMode } from '@/lib/tools/text';
import { recordRecentTool } from '@/components/tools/RecentTools';

export default function SortLinesPage() {
  const tool = getToolBySlug('sort-lines')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [mode, setMode] = useState<LineSortMode>('alphabetical');
  const [caseSensitive, setCaseSensitive] = useState(false);

  React.useEffect(() => {
    recordRecentTool('sort-lines');
  }, []);

  const result = sortLines(input, mode, caseSensitive);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your list into the input editor.',
        'Choose your desired sorting order: Alphabetical (A-Z), Reverse (Z-A), Numerical, or Length.',
        'Copy or download the sorted text list.',
      ]}
      useCases={[
        'Sorting import lists or CSS selectors alphabetically.',
        'Ordering numerical log sequences or IDs magnitude-wise.',
        'Organizing list items by string length for UI readability.',
      ]}
    >
      <div className="space-y-4">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Sort Mode:</span>
            {(['alphabetical', 'reverse', 'numerical', 'length'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  mode === m
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-slate-700 accent-purple-500"
            />
            <span>Case Sensitive</span>
          </label>
        </div>

        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Raw Input List"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            onSubmit={() => {}}
            submitLabel="Sort"
          />

          <OutputViewer
            label={`Sorted List (${mode})`}
            value={result}
            filename="sorted.txt"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
