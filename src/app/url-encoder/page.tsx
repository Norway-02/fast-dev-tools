'use client';

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { OutputViewer } from '@/components/tools/OutputViewer';
import { ValidationError } from '@/components/tools/ValidationError';
import { getToolBySlug } from '@/lib/constants/tools-list';
import { encodeUrl, UrlEncodeMode } from '@/lib/tools/encoding';

export default function UrlEncoderPage() {
  const tool = getToolBySlug('url-encoder')!;
  const [input, setInput] = useState(tool.sampleInput);
  const [mode, setMode] = useState<UrlEncodeMode>('component');

  const res = encodeUrl(input, mode);

  return (
    <ToolLayout
      tool={tool}
      howItWorks={[
        'Paste your URL string or query parameter value.',
        'Choose Component mode (encodes all special characters) or Full URL mode.',
        'Copy the percent-encoded URL.',
      ]}
      useCases={[
        'Encoding query parameter values containing spaces, ampersands, or question marks.',
        'Constructing safe OAuth redirect URIs.',
      ]}
    >
      <div className="space-y-4">
        {/* Mode Selector */}
        <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-300">
          <span className="font-semibold text-slate-200">Encoding Scope Mode:</span>
          <button
            onClick={() => setMode('component')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              mode === 'component'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            URI Component (Query Parameter)
          </button>
          <button
            onClick={() => setMode('full')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              mode === 'full'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            Full URL (Preserve Protocol/Domain)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeEditor
            label="URL Input"
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            onSample={() => setInput(tool.sampleInput)}
          />

          <OutputViewer
            label="Percent-Encoded Output"
            value={res.result}
            filename="url-encoded.txt"
          />
        </div>

        {res.error && <ValidationError error={res.error} />}
      </div>
    </ToolLayout>
  );
}
