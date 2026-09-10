'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { evaluateJsonPath } from '@/lib/tools/json-path';
import { recordRecentTool } from '@/components/tools/RecentTools';

export default function JsonPathTesterPage() {
  const tool = getToolBySlug('json-path-tester')!;
  const [jsonInput, setJsonInput] = useState(tool.sampleInput);
  const [expression, setExpression] = useState('$.store.book[*].title');

  React.useEffect(() => {
    recordRecentTool('json-path-tester');
  }, []);

  const evalResult = evaluateJsonPath(jsonInput, expression);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your JSON payload into the input editor.',
        'Enter a JSONPath expression starting with "$" (e.g. $.store.book[*].title).',
        'Inspect matched values, paths, and total match count in real-time.',
      ]}
      useCases={[
        'Testing JSONPath expressions for API gateway transformations.',
        'Filtering nested array objects in complex REST payloads.',
        'Verifying JSONPath expressions for Kubernetes & Helm values.',
      ]}
    >
      <div className="space-y-4">
        {/* JSONPath Expression Input & Scope Notice */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <label className="block text-slate-200 font-bold">JSONPath Expression:</label>
            <span className="text-[11px] text-[#34D399] bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-md font-sans">
              Safe Fast Standard Subset (Non-Eval)
            </span>
          </div>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="$.store.book[*].title"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-[#34D399]"
          />
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 font-sans leading-relaxed">
            <strong className="text-slate-300">Supported Syntax:</strong> Root (<code className="text-emerald-400">$</code>), dot property access (<code className="text-emerald-400">.prop</code>), bracket property access (<code className="text-emerald-400">[&apos;prop&apos;]</code>), array index access (<code className="text-emerald-400">[0]</code>), and wildcards (<code className="text-emerald-400">.*</code>, <code className="text-emerald-400">[*]</code>). Complex filter scripts (<code className="text-amber-400">[?(@...)]</code>) are disabled for browser security.
          </div>
        </div>

        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="JSON Input"
            value={jsonInput}
            onChange={setJsonInput}
            onClear={() => setJsonInput('')}
            onSample={() => setJsonInput(tool.sampleInput)}
            onSubmit={() => {}}
            submitLabel="Evaluate"
          />

          <div className="p-4 bg-[#0C111B] border border-[#1E293B] rounded-xl space-y-3 font-mono text-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-white">Evaluation Matches</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[#34D399] border border-emerald-500/20">
                {evalResult.matchCount} Matches Found
              </span>
            </div>

            {!evalResult.isValid ? (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
                {evalResult.error}
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2">
                {evalResult.matches.map((m, idx) => (
                  <div key={idx} className="p-3 bg-[#101B2B] rounded-lg border border-slate-800 space-y-1">
                    <div className="text-[11px] text-[#34D399] font-bold">Path: {m.path}</div>
                    <div className="text-slate-200">{JSON.stringify(m.value)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
