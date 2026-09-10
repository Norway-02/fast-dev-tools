'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { computeTextDiff, TextDiffLine } from '@/lib/tools/text';
import { recordRecentTool } from '@/components/tools/RecentTools';

const SAMPLE_A = 'DevPocket 1.0\nFast developer tools\nNo signup required\nProcessed locally';
const SAMPLE_B = 'DevPocket 2.0\nFast, privacy-first developer tools\nNo signup required\nProcessed 100% locally in browser\nNew feature added';

export default function TextDiffPage() {
  const tool = getToolBySlug('text-diff')!;
  const [textA, setTextA] = useState(SAMPLE_A);
  const [textB, setTextB] = useState(SAMPLE_B);

  React.useEffect(() => {
    recordRecentTool('text-diff');
  }, []);

  let diffLines: TextDiffLine[] = [];
  let errorMsg: string | null = null;

  try {
    diffLines = computeTextDiff(textA, textB);
  } catch (err: unknown) {
    errorMsg = err instanceof Error ? err.message : String(err);
  }

  const addedCount = diffLines.filter((l) => l.kind === 'added').length;
  const removedCount = diffLines.filter((l) => l.kind === 'removed').length;

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste Text A (Baseline) into the left editor.',
        'Paste Text B (Modified) into the right editor.',
        'Inspect line additions (green) and line deletions (red) in real-time.',
      ]}
      useCases={[
        'Comparing code snippets or configuration files line-by-line.',
        'Auditing text document edits and version revisions.',
        'Checking differences between env files or log outputs.',
      ]}
    >
      <div className="space-y-4">
        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="Text Block A (Baseline)"
            value={textA}
            onChange={setTextA}
            onClear={() => setTextA('')}
            onSample={() => setTextA(SAMPLE_A)}
            onSubmit={() => {}}
            submitLabel="Compare"
          />

          <CodeEditor
            label="Text Block B (Modified)"
            value={textB}
            onChange={setTextB}
            onClear={() => setTextB('')}
            onSample={() => setTextB(SAMPLE_B)}
            onSubmit={() => {}}
            submitLabel="Compare"
          />
        </div>

        {/* Diff Output */}
        {errorMsg ? (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs rounded-xl">
            {errorMsg}
          </div>
        ) : (
          <div className="p-5 bg-[#0C111B] border border-[#1E293B] rounded-xl space-y-3 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
              <span className="font-bold text-white">Line Diff Result</span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">+{addedCount} Added</span>
                <span className="text-rose-400 font-bold">-{removedCount} Removed</span>
              </div>
            </div>

            <div className="space-y-1 font-mono text-xs max-h-[400px] overflow-y-auto pr-2">
              {diffLines.map((line, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded flex items-start gap-2 ${
                    line.kind === 'added'
                      ? 'bg-emerald-500/10 text-emerald-300 border-l-2 border-emerald-500'
                      : line.kind === 'removed'
                      ? 'bg-rose-500/10 text-rose-300 border-l-2 border-rose-500'
                      : 'text-slate-400'
                  }`}
                >
                  <span className="font-bold w-4 text-center select-none">
                    {line.kind === 'added' ? '+' : line.kind === 'removed' ? '-' : ' '}
                  </span>
                  <span>{line.value || <span className="opacity-40">&lt;empty line&gt;</span>}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
