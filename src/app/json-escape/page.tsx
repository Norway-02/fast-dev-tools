'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { escapeJsonString, unescapeJsonString } from '@/lib/tools/json-escape';
import { recordRecentTool } from '@/components/tools/RecentTools';

export default function JsonEscapePage() {
  const tool = getToolBySlug('json-escape')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape');

  React.useEffect(() => {
    recordRecentTool('json-escape');
  }, []);

  const result = mode === 'escape' ? escapeJsonString(input) : unescapeJsonString(input);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your raw text or escaped JSON string.',
        'Choose whether to Escape special characters or Unescape backslashes.',
        'Copy or download the transformed string output instantly.',
      ]}
      useCases={[
        'Escaping JSON strings before embedding inside string parameters.',
        'Unescaping raw JSON payloads extracted from backend error logs.',
        'Sanitizing double quotes and backslashes for bash or curl scripts.',
      ]}
    >
      <div className="space-y-4">
        {/* Mode Selector Toolbar */}
        <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <span className="font-semibold text-slate-200">Operation Mode:</span>
          {(['escape', 'unescape'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-lg transition-colors capitalize ${
                mode === m
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {m} JSON
            </button>
          ))}
        </div>

        {/* Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label={mode === 'escape' ? 'Raw Input Text' : 'Escaped Input String'}
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
            onSubmit={() => {}}
            submitLabel="Process"
          />

          <OutputViewer
            label={mode === 'escape' ? 'Escaped JSON Output' : 'Unescaped Plain Text'}
            value={result.result}
            filename={mode === 'escape' ? 'escaped.json' : 'unescaped.txt'}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
