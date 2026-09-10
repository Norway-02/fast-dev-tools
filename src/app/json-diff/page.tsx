'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { compareJson, JsonDiffChange } from '@/lib/tools/json-diff';
import { recordRecentTool } from '@/components/tools/RecentTools';

const SAMPLE_A = JSON.stringify(
  {
    name: 'DevPocket',
    version: '1.0.0',
    status: 'active',
    features: ['json', 'encoding'],
    settings: { debug: false, timeout: 300 },
  },
  null,
  2
);

const SAMPLE_B = JSON.stringify(
  {
    name: 'DevPocket',
    version: '2.0.0',
    status: 'active',
    features: ['json', 'encoding', 'text-tools'],
    settings: { debug: true, timeout: 300 },
    newField: 'enabled',
  },
  null,
  2
);

export default function JsonDiffPage() {
  const tool = getToolBySlug('json-diff')!;
  const [jsonA, setJsonA] = useState(SAMPLE_A);
  const [jsonB, setJsonB] = useState(SAMPLE_B);

  React.useEffect(() => {
    recordRecentTool('json-diff');
  }, []);

  const diffResult = compareJson(jsonA, jsonB);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your baseline JSON string into JSON Object A.',
        'Paste your modified JSON string into JSON Object B.',
        'Inspect structural additions (green), deletions (red), and changes (yellow) by JSON path.',
      ]}
      useCases={[
        'Comparing API response payloads between staging and production.',
        'Detecting configuration drifts in JSON settings files.',
        'Validating JSON payload transformations in microservices.',
      ]}
    >
      <div className="space-y-6">
        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="JSON Object A (Baseline)"
            value={jsonA}
            onChange={setJsonA}
            onClear={() => setJsonA('')}
            onSample={() => setJsonA(SAMPLE_A)}
            onSubmit={() => {}}
            submitLabel="Compare"
          />

          <CodeEditor
            label="JSON Object B (Modified)"
            value={jsonB}
            onChange={setJsonB}
            onClear={() => setJsonB('')}
            onSample={() => setJsonB(SAMPLE_B)}
            onSubmit={() => {}}
            submitLabel="Compare"
          />
        </div>

        {/* Diff Output Results */}
        {!diffResult.isValid ? (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 font-mono text-xs">
            {diffResult.error}
          </div>
        ) : (
          <div className="p-5 bg-[#0C111B] border border-[#1E293B] rounded-xl space-y-4 shadow-lg">
            {/* Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#1E293B] text-xs font-mono">
              <span className="font-bold text-white">Structural Diff Summary</span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">+{diffResult.summary.added} Added</span>
                <span className="text-rose-400 font-bold">-{diffResult.summary.removed} Removed</span>
                <span className="text-amber-400 font-bold">~{diffResult.summary.changed} Changed</span>
                <span className="text-slate-400">{diffResult.summary.unchanged} Unchanged</span>
              </div>
            </div>

            {/* Changes List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto font-mono text-xs pr-2">
              {diffResult.changes.map((change, i) => (
                <DiffRow key={i} change={change} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

function DiffRow({ change }: { change: JsonDiffChange }) {
  if (change.kind === 'unchanged') return null;

  return (
    <div
      className={`p-3 rounded-lg border flex flex-col gap-1 ${
        change.kind === 'added'
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : change.kind === 'removed'
          ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
      }`}
    >
      <div className="flex items-center justify-between font-bold">
        <span>Path: {change.path}</span>
        <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
          {change.kind}
        </span>
      </div>

      {change.kind === 'changed' && (
        <div className="text-[11px] space-y-0.5 text-slate-300">
          <div><strong className="text-rose-400">Old:</strong> {JSON.stringify(change.oldValue)}</div>
          <div><strong className="text-emerald-400">New:</strong> {JSON.stringify(change.newValue)}</div>
        </div>
      )}
      {change.kind === 'added' && (
        <div className="text-[11px] text-slate-300">
          <strong className="text-emerald-400">Value:</strong> {JSON.stringify(change.newValue)}
        </div>
      )}
      {change.kind === 'removed' && (
        <div className="text-[11px] text-slate-300">
          <strong className="text-rose-400">Value:</strong> {JSON.stringify(change.oldValue)}
        </div>
      )}
    </div>
  );
}
