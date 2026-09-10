'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { removeDuplicateLines } from '@/lib/tools/text';
import { recordRecentTool } from '@/components/tools/RecentTools';

export default function RemoveDuplicateLinesPage() {
  const tool = getToolBySlug('remove-duplicate-lines')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(false);

  React.useEffect(() => {
    recordRecentTool('remove-duplicate-lines');
  }, []);

  const result = removeDuplicateLines(input, { caseSensitive, trimWhitespace });

  const originalLines = input ? input.split(/\r\n|\r|\n/).length : 0;
  const resultLines = result ? result.split(/\r\n|\r|\n/).length : 0;
  const removedCount = Math.max(0, originalLines - resultLines);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your multiline list or dataset into the input editor.',
        'Toggle case sensitivity and whitespace trimming options as needed.',
        'Copy or download the deduplicated list with original ordering preserved.',
      ]}
      useCases={[
        'Deduplicating log lists, email addresses, or URL manifests.',
        'Cleaning duplicate SQL database primary keys or configuration list entries.',
        'Sanitizing raw user inputs or CSV rows.',
      ]}
    >
      <div className="space-y-4">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded border-slate-700 accent-purple-500"
              />
              <span>Case Sensitive</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={trimWhitespace}
                onChange={(e) => setTrimWhitespace(e.target.checked)}
                className="rounded border-slate-700 accent-purple-500"
              />
              <span>Trim Whitespace</span>
            </label>
          </div>

          <div className="text-[#34D399] font-bold">
            Removed {removedCount} Duplicates ({originalLines} → {resultLines} lines)
          </div>
        </div>

        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Raw Multiline Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            onSubmit={() => {}}
            submitLabel="Deduplicate"
          />

          <OutputViewer
            label="Deduplicated Output"
            value={result}
            filename="deduplicated.txt"
          />
        </div>
      </div>
    </ToolLayout>
  );
}
